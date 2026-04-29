import { HeuristicContest } from '@/Interfaces/HeuristicContest'
import { Meta } from '@/components/atoms/Meta'
import { ContestCard } from '@/components/molecules/ContestCard'
import { getAllContests } from '@/lib/api/heuristic'
import { RatingColorMode, getRatingColor } from '@/lib/rating'
import styles from '@/pages/work/heuristic-contest/heuristic.module.css'
import { GetStaticProps } from 'next'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  contests: HeuristicContest[]
}

type SortKey = 'date' | 'rank' | 'performance'
type ViewMode = 'grid' | 'stats'
type RankedContest = HeuristicContest & { rank: number }

const LINE_COLOR = '#7d8592'
const isRankedContest = (contest: HeuristicContest): contest is RankedContest =>
  contest.rank != null

const HeuristicContestPage = ({ contests }: Props) => {
  const [search, setSearch] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortAsc, setSortAsc] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showUnrankedContests, setShowUnrankedContests] = useState(false)
  const participatedCount = useMemo(() => contests.filter(isRankedContest).length, [contests])

  const allFilters = useMemo(() => {
    const filterSet = new Set<string>()
    contests.forEach((c) => {
      c.tags.forEach((t) => filterSet.add(t))
      if (c.language) filterSet.add(c.language)
    })
    return Array.from(filterSet).sort()
  }, [contests])

  const filtered = useMemo(() => {
    let result = contests

    if (!showUnrankedContests) {
      result = result.filter(isRankedContest)
    }

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q),
      )
    }

    if (selectedFilters.length > 0) {
      result = result.filter((c) => {
        const attrs = [...c.tags, c.language].filter(Boolean) as string[]
        return selectedFilters.some((f) => attrs.includes(f))
      })
    }

    result = [...result].sort((a, b) => {
      let cmp = 0
      if (sortKey === 'date') {
        cmp = a.date.localeCompare(b.date)
      } else if (sortKey === 'rank') {
        const aNull = a.rank == null
        const bNull = b.rank == null
        if (aNull && bNull) cmp = 0
        else if (aNull) cmp = 1
        else if (bNull) cmp = -1
        else cmp = (a.rank as number) - (b.rank as number)
      } else if (sortKey === 'performance') {
        const aNull = a.performance == null
        const bNull = b.performance == null
        if (aNull && bNull) cmp = 0
        else if (aNull) cmp = 1
        else if (bNull) cmp = -1
        else cmp = (a.performance as number) - (b.performance as number)
      }
      return sortAsc ? cmp : -cmp
    })

    return result
  }, [contests, search, selectedFilters, sortKey, sortAsc, showUnrankedContests])

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter],
    )
  }

  return (
    <>
      <Meta
        title='Heuristic Contest Archive | thirofoo'
        description='AtCoder Heuristic Contest (AHC) の参加実績一覧'
        ogImage='https://raw.githubusercontent.com/thirofoo/heuristic-archive/main/AHC040/thumbnail.webp'
      />

      <div className={styles.wideContainer}>
        <div className={styles.narrowInner}>
          <h1 className={styles.pageTitle}>Heuristic Contest Archive</h1>
          <p className={styles.subtitle}>{participatedCount} contests participated</p>

          <div className={styles.toggleRow}>
            <button
              className={viewMode === 'grid' ? styles.toggleBtnActive : styles.toggleBtn}
              onClick={() => setViewMode('grid')}
            >
              Contest List
            </button>
            <button
              className={viewMode === 'stats' ? styles.toggleBtnActive : styles.toggleBtn}
              onClick={() => setViewMode('stats')}
            >
              Statistics
            </button>
          </div>
        </div>

        {viewMode === 'stats' ? (
          <div className={styles.narrowInner}>
            <StatsView contests={contests} />
          </div>
        ) : (
          <>
            <div className={styles.narrowInner}>
              <div className={styles.filterSection}>
                <div className={styles.searchRow}>
                  <input
                    className={styles.searchInput}
                    type='text'
                    placeholder='Search by contest name or ID...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className={styles.sortGroup}>
                    <label className={styles.listToggleLabel}>
                      <input
                        type='checkbox'
                        className={styles.chartToggleInput}
                        checked={showUnrankedContests}
                        onChange={(e) => setShowUnrankedContests(e.target.checked)}
                      />
                      <span>Show Unranked</span>
                    </label>
                    <select
                      className={styles.sortSelect}
                      value={sortKey}
                      onChange={(e) => setSortKey(e.target.value as SortKey)}
                    >
                      <option value='date'>Date</option>
                      <option value='rank'>Rank</option>
                      <option value='performance'>Performance</option>
                    </select>
                    <button
                      className={styles.sortDirBtn}
                      onClick={() => setSortAsc((prev) => !prev)}
                      title={sortAsc ? 'Ascending' : 'Descending'}
                    >
                      {sortAsc ? '↑' : '↓'}
                    </button>
                  </div>
                </div>
                {allFilters.length > 0 && (
                  <div className={styles.filterGroup} style={{ marginTop: '0.75rem' }}>
                    {allFilters.map((filter) => (
                      <button
                        key={filter}
                        className={
                          selectedFilters.includes(filter)
                            ? styles.filterChipActive
                            : styles.filterChip
                        }
                        onClick={() => toggleFilter(filter)}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <p className={styles.resultCount}>{filtered.length} contests</p>
            </div>

            {filtered.length === 0 ? (
              <div className={styles.nothing}>No contests found.</div>
            ) : (
              <div className={styles.contestGrid}>
                {filtered.map((contest) => (
                  <ContestCard key={contest.id} contest={contest} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

/* ========== Statistics View ========== */

function StatsView({ contests }: { contests: HeuristicContest[] }) {
  const { resolvedTheme } = useTheme()
  const ratingColorMode: RatingColorMode = resolvedTheme === 'dark' ? 'dark' : 'light'
  const [showNoSubmissionRanks, setShowNoSubmissionRanks] = useState(false)
  const withPerf = contests.filter((c) => c.performance != null && c.performance > 0)
  const withRank = contests.filter(isRankedContest).filter((c) => c.rank >= 1)
  const bestRank = withRank.length > 0 ? Math.min(...withRank.map((c) => c.rank)) : null
  const bestPerf =
    withPerf.length > 0 ? Math.max(...withPerf.map((c) => c.performance as number)) : null
  const avgPerf =
    withPerf.length > 0
      ? Math.round(
          withPerf.reduce((sum, c) => sum + (c.performance as number), 0) / withPerf.length,
        )
      : null

  const langCounts: Record<string, number> = {}
  contests.forEach((c) => {
    const lang = c.language ?? 'Unknown'
    langCounts[lang] = (langCounts[lang] || 0) + 1
  })
  const langEntries = Object.entries(langCounts).sort((a, b) => b[1] - a[1])
  const maxLangCount = Math.max(...langEntries.map(([, v]) => v))

  const langColors: Record<string, string> = {
    'C++': '#f34b7d',
    Rust: '#dea584',
    Python: '#3572A5',
    Unknown: '#808080',
  }

  const sortedByDate = [...contests].sort((a, b) => a.date.localeCompare(b.date))
  const rankHistoryContests = showNoSubmissionRanks
    ? sortedByDate
    : sortedByDate.filter((c) => c.performance != null)

  return (
    <div className={styles.statsSection}>
      <div className={styles.statsSummary}>
        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Participated Contests</span>
          <span className={styles.summaryValue}>{withRank.length}</span>
        </div>
        {bestRank != null && (
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Best Rank</span>
            <span className={styles.summaryValue}>{bestRank}</span>
          </div>
        )}
        {bestPerf != null && (
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Best Performance</span>
            <span
              className={styles.summaryValue}
              style={{ color: getRatingColor(bestPerf, ratingColorMode) }}
            >
              {bestPerf}
            </span>
          </div>
        )}
        {avgPerf != null && (
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Avg Performance</span>
            <span
              className={styles.summaryValue}
              style={{ color: getRatingColor(avgPerf, ratingColorMode) }}
            >
              {avgPerf}
            </span>
          </div>
        )}
      </div>

      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>Performance History</h3>
        <div className={styles.chart}>
          <PerformanceChart
            contests={sortedByDate.filter((c) => c.performance != null && c.performance > 0)}
            ratingColorMode={ratingColorMode}
          />
        </div>
      </div>

      <div className={styles.chartContainer}>
        <div className={styles.chartTitleRow}>
          <h3 className={styles.chartTitle}>Rank History</h3>
          <label className={styles.chartToggleLabel}>
            <input
              type='checkbox'
              className={styles.chartToggleInput}
              checked={showNoSubmissionRanks}
              onChange={(e) => setShowNoSubmissionRanks(e.target.checked)}
            />
            <span>Show No Submission</span>
          </label>
        </div>
        <div className={styles.chart}>
          <RankChart contests={rankHistoryContests} ratingColorMode={ratingColorMode} />
        </div>
      </div>

      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>Language Distribution</h3>
        <div className={styles.langBars}>
          {langEntries.map(([lang, count]) => (
            <div key={lang} className={styles.langRow}>
              <span className={styles.langLabel}>{lang}</span>
              <div
                className={styles.langBar}
                style={{
                  width: `${(count / maxLangCount) * 100}%`,
                  minWidth: '20px',
                  backgroundColor: langColors[lang] || '#6b7280',
                  opacity: 0.55,
                }}
              />
              <span className={styles.langCount}>{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ========== Chart Tooltip Hook ========== */

type TooltipData = {
  contest: HeuristicContest
  index: number
} | null

function useChartTooltip(defaultTooltip: TooltipData) {
  const [tooltip, setTooltip] = useState<TooltipData>(defaultTooltip)

  useEffect(() => {
    setTooltip(defaultTooltip)
  }, [defaultTooltip])

  const handleMouseEnter = useCallback(
    (_e: React.MouseEvent<SVGElement>, contest: HeuristicContest, index: number) => {
      setTooltip({
        contest,
        index,
      })
    },
    [],
  )

  const handleMouseMove = useCallback(() => {}, [])

  const handleMouseLeave = useCallback(() => {}, [])

  return { tooltip, handleMouseEnter, handleMouseMove, handleMouseLeave }
}

function ChartTooltipBox({
  tooltip,
  ratingColorMode,
}: {
  tooltip: TooltipData
  ratingColorMode: RatingColorMode
}) {
  if (!tooltip) return <div className={styles.chartHoverDetails} aria-hidden='true' />
  const c = tooltip.contest
  return (
    <div className={styles.chartHoverDetails}>
      <div className={styles.hoverContestHead}>
        <span className={styles.hoverContestId}>{c.id}</span>
        <span className={styles.hoverContestTitle}>{c.title}</span>
      </div>
      <div className={styles.hoverContestMeta}>
        <span>Rank: {c.rank}</span>
        {c.extendedStanding && <span>Ext: {c.extendedStanding.extendedRank}</span>}
        {c.performance != null && (
          <span style={{ color: getRatingColor(c.performance, ratingColorMode) }}>
            Perf: {c.performance}
          </span>
        )}
        <span>
          {c.durationText} / {c.tags.join(', ')}
          {c.language && ` / ${c.language}`}
        </span>
      </div>
    </div>
  )
}

/* ========== SVG Charts ========== */

function PerformanceChart({
  contests,
  ratingColorMode,
}: {
  contests: HeuristicContest[]
  ratingColorMode: RatingColorMode
}) {
  const defaultTooltip = useMemo<TooltipData>(() => {
    if (contests.length === 0) return null
    const defaultIndex = contests.reduce(
      (bestIndex, contest, index) =>
        (contest.performance as number) > (contests[bestIndex].performance as number)
          ? index
          : bestIndex,
      0,
    )
    return { contest: contests[defaultIndex], index: defaultIndex }
  }, [contests])
  const { tooltip, handleMouseEnter, handleMouseMove, handleMouseLeave } =
    useChartTooltip(defaultTooltip)

  if (contests.length === 0) return <p>No performance data available.</p>

  const W = 800
  const H = 300
  const PAD = { top: 20, right: 20, bottom: 40, left: 50 }
  const chartW = W - PAD.left - PAD.right
  const chartH = H - PAD.top - PAD.bottom

  const perfs = contests.map((c) => c.performance as number)
  const minP = Math.floor(Math.min(...perfs) / 200) * 200
  const maxP = Math.ceil(Math.max(...perfs) / 200) * 200
  const rangeP = maxP - minP || 1

  const ratingBands = [
    { threshold: 400, color: getRatingColor(0, ratingColorMode) },
    { threshold: 800, color: getRatingColor(400, ratingColorMode) },
    { threshold: 1200, color: getRatingColor(800, ratingColorMode) },
    { threshold: 1600, color: getRatingColor(1200, ratingColorMode) },
    { threshold: 2000, color: getRatingColor(1600, ratingColorMode) },
    { threshold: 2400, color: getRatingColor(2000, ratingColorMode) },
    { threshold: 2800, color: getRatingColor(2400, ratingColorMode) },
    { threshold: Infinity, color: getRatingColor(2800, ratingColorMode) },
  ]

  const points = contests.map((c, i) => {
    const perf = c.performance as number
    const x = PAD.left + (i / Math.max(contests.length - 1, 1)) * chartW
    const y = PAD.top + chartH - ((perf - minP) / rangeP) * chartH
    return { x, y, perf, id: c.id, contest: c }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')

  return (
    <div style={{ position: 'relative' }}>
      <ChartTooltipBox tooltip={tooltip} ratingColorMode={ratingColorMode} />
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>
        {ratingBands.map((band, i) => {
          const prevThreshold = i === 0 ? 0 : ratingBands[i - 1].threshold
          const bandBottom = Math.max(prevThreshold, minP)
          const bandTop = Math.min(band.threshold, maxP)
          if (bandBottom >= maxP || bandTop <= minP) return null
          const y1 = PAD.top + chartH - ((bandTop - minP) / rangeP) * chartH
          const y2 = PAD.top + chartH - ((bandBottom - minP) / rangeP) * chartH
          return (
            <rect
              key={i}
              x={PAD.left}
              y={y1}
              width={chartW}
              height={y2 - y1}
              fill={band.color}
              opacity={0.08}
            />
          )
        })}
        {Array.from({ length: Math.floor(rangeP / 200) + 1 }, (_, i) => minP + i * 200).map(
          (val) => {
            const y = PAD.top + chartH - ((val - minP) / rangeP) * chartH
            return (
              <g key={val}>
                <line
                  x1={PAD.left}
                  y1={y}
                  x2={PAD.left + chartW}
                  y2={y}
                  stroke={LINE_COLOR}
                  strokeOpacity={0.15}
                />
                <text
                  x={PAD.left - 8}
                  y={y + 4}
                  textAnchor='end'
                  fontSize={11}
                  fill={LINE_COLOR}
                  fillOpacity={0.8}
                >
                  {val}
                </text>
              </g>
            )
          },
        )}
        <path d={linePath} fill='none' stroke={LINE_COLOR} strokeWidth={2} strokeOpacity={0.7} />
        {points.map((p, i) => {
          const isActive = tooltip?.index === i
          const colW = chartW / Math.max(contests.length - 1, 1)
          return (
            <g key={p.id}>
              <rect
                x={p.x - colW / 2}
                y={PAD.top}
                width={colW}
                height={chartH}
                fill='transparent'
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => handleMouseEnter(e, p.contest, i)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
              {isActive && (
                <line
                  x1={p.x}
                  y1={PAD.top}
                  x2={p.x}
                  y2={PAD.top + chartH}
                  stroke={LINE_COLOR}
                  strokeOpacity={0.2}
                  strokeDasharray='4 3'
                />
              )}
              {isActive && <circle cx={p.x} cy={p.y} r={8} fill='white' fillOpacity={0.25} />}
              <circle
                cx={p.x}
                cy={p.y}
                r={3.5}
                fill={getRatingColor(p.perf, ratingColorMode)}
                stroke={LINE_COLOR}
                strokeWidth={1}
                strokeOpacity={0.3}
              />
            </g>
          )
        })}
        {contests
          .filter((_, i) => i % Math.max(1, Math.floor(contests.length / 8)) === 0)
          .map((c, i) => {
            const idx = contests.indexOf(c)
            const x = PAD.left + (idx / Math.max(contests.length - 1, 1)) * chartW
            return (
              <text
                key={i}
                x={x}
                y={H - 5}
                textAnchor='middle'
                fontSize={10}
                fill={LINE_COLOR}
                fillOpacity={0.8}
              >
                {c.id}
              </text>
            )
          })}
      </svg>
    </div>
  )
}

function RankChart({
  contests,
  ratingColorMode,
}: {
  contests: HeuristicContest[]
  ratingColorMode: RatingColorMode
}) {
  const valid = useMemo(
    () => contests.filter(isRankedContest).filter((c) => c.rank >= 1),
    [contests],
  )
  const defaultTooltip = useMemo<TooltipData>(() => {
    if (valid.length === 0) return null
    const defaultIndex = valid.reduce(
      (bestIndex, contest, index) => (contest.rank < valid[bestIndex].rank ? index : bestIndex),
      0,
    )
    return { contest: valid[defaultIndex], index: defaultIndex }
  }, [valid])
  const { tooltip, handleMouseEnter, handleMouseMove, handleMouseLeave } =
    useChartTooltip(defaultTooltip)

  if (valid.length === 0) return <p>No data available.</p>

  const W = 800
  const H = 300
  const PAD = { top: 20, right: 20, bottom: 40, left: 50 }
  const chartW = W - PAD.left - PAD.right
  const chartH = H - PAD.top - PAD.bottom

  const ranks = valid.map((c) => c.rank)
  const maxRank = Math.max(...ranks)
  const sqrtMax = Math.sqrt(maxRank)

  const rankToY = (rank: number) => PAD.top + (Math.sqrt(Math.max(rank, 1)) / sqrtMax) * chartH

  const points = valid.map((c, i) => {
    const x = PAD.left + (i / Math.max(valid.length - 1, 1)) * chartW
    const y = rankToY(c.rank)
    return { x, y, rank: c.rank, id: c.id, contest: c }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')

  const gridCandidates = [1, 10, 50, 100, 200, 500, 1000]
  const gridValues = gridCandidates.filter((v) => v <= maxRank)

  return (
    <div style={{ position: 'relative' }}>
      <ChartTooltipBox tooltip={tooltip} ratingColorMode={ratingColorMode} />
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>
        {gridValues.map((val) => {
          const y = rankToY(val)
          if (y < PAD.top || y > PAD.top + chartH) return null
          return (
            <g key={val}>
              <line
                x1={PAD.left}
                y1={y}
                x2={PAD.left + chartW}
                y2={y}
                stroke={LINE_COLOR}
                strokeOpacity={0.15}
              />
              <text
                x={PAD.left - 8}
                y={y + 4}
                textAnchor='end'
                fontSize={11}
                fill={LINE_COLOR}
                fillOpacity={0.8}
              >
                {val}
              </text>
            </g>
          )
        })}
        <path d={linePath} fill='none' stroke={LINE_COLOR} strokeWidth={2} strokeOpacity={0.5} />
        {points.map((p, i) => {
          const isActive = tooltip?.index === i
          const colW = chartW / Math.max(valid.length - 1, 1)
          return (
            <g key={p.id}>
              <rect
                x={p.x - colW / 2}
                y={PAD.top}
                width={colW}
                height={chartH}
                fill='transparent'
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => handleMouseEnter(e, p.contest, i)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
              {isActive && (
                <line
                  x1={p.x}
                  y1={PAD.top}
                  x2={p.x}
                  y2={PAD.top + chartH}
                  stroke={LINE_COLOR}
                  strokeOpacity={0.2}
                  strokeDasharray='4 3'
                />
              )}
              {isActive && <circle cx={p.x} cy={p.y} r={8} fill='white' fillOpacity={0.25} />}
              <circle
                cx={p.x}
                cy={p.y}
                r={3.5}
                fill={getRatingColor(p.contest.performance, ratingColorMode)}
                stroke={LINE_COLOR}
                strokeWidth={1}
                strokeOpacity={0.3}
              />
            </g>
          )
        })}
        {valid
          .filter((_, i) => i % Math.max(1, Math.floor(valid.length / 8)) === 0)
          .map((c, i) => {
            const idx = valid.indexOf(c)
            const x = PAD.left + (idx / Math.max(valid.length - 1, 1)) * chartW
            return (
              <text
                key={i}
                x={x}
                y={H - 5}
                textAnchor='middle'
                fontSize={10}
                fill={LINE_COLOR}
                fillOpacity={0.8}
              >
                {c.id}
              </text>
            )
          })}
      </svg>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const contests = await getAllContests()
  return {
    props: {
      contests,
    },
  }
}

export default HeuristicContestPage
