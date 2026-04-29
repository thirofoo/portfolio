import { HeuristicContest } from '@/Interfaces/HeuristicContest'
import fs from 'fs'
import path from 'path'

const GITHUB_API_BASE = 'https://api.github.com/repos/thirofoo/heuristic-archive'
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/thirofoo/heuristic-archive/main'
const CACHE_DIR = path.join(process.cwd(), '.cache')
const CACHE_PATH = path.join(CACHE_DIR, 'heuristic-contests-v2.json')
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour
const META_FETCH_BATCH_SIZE = 12

const headers: Record<string, string> = {
  Accept: 'application/vnd.github.v3+json',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
}

function readCache(): HeuristicContest[] | null {
  try {
    const stat = fs.statSync(CACHE_PATH)
    if (Date.now() - stat.mtimeMs < CACHE_TTL_MS) {
      const data = fs.readFileSync(CACHE_PATH, 'utf-8')
      return JSON.parse(data) as HeuristicContest[]
    }
  } catch {
    // cache miss
  }
  return null
}

function writeCache(contests: HeuristicContest[]) {
  fs.mkdirSync(CACHE_DIR, { recursive: true })
  fs.writeFileSync(CACHE_PATH, JSON.stringify(contests, null, 2))
}

async function fetchContestDirNames(): Promise<string[]> {
  const treeRes = await fetch(`${GITHUB_API_BASE}/git/trees/main?recursive=1`, { headers })

  if (treeRes.ok) {
    const data: {
      tree: { path: string; type: string }[]
      truncated?: boolean
    } = await treeRes.json()

    if (data.truncated) {
      console.warn('[heuristic] Git tree response was truncated; falling back to contents API')
    } else {
      return data.tree
        .filter((item) => item.type === 'blob' && /^AHC\d+\/meta\.json$/.test(item.path))
        .map((item) => item.path.split('/')[0])
        .sort()
    }
  } else {
    console.warn(`[heuristic] Git tree API error: ${treeRes.status}; falling back to contents API`)
  }

  const contentsRes = await fetch(`${GITHUB_API_BASE}/contents`, { headers })
  if (!contentsRes.ok) throw new Error(`GitHub API error: ${contentsRes.status}`)

  const items: { name: string; type: string }[] = await contentsRes.json()
  return items
    .filter((item) => item.type === 'dir' && /^AHC\d+$/.test(item.name))
    .map((item) => item.name)
    .sort()
}

async function fetchContestMeta(dirName: string): Promise<HeuristicContest | null> {
  try {
    const metaRes = await fetch(`${GITHUB_RAW_BASE}/${dirName}/meta.json`)
    if (!metaRes.ok) return null
    return (await metaRes.json()) as HeuristicContest
  } catch {
    return null
  }
}

async function fetchContestMetas(dirNames: string[]) {
  const results: { dirName: string; contest: HeuristicContest | null }[] = []

  for (let i = 0; i < dirNames.length; i += META_FETCH_BATCH_SIZE) {
    const batch = dirNames.slice(i, i + META_FETCH_BATCH_SIZE)
    const batchResults = await Promise.all(
      batch.map(async (dirName) => ({
        dirName,
        contest: await fetchContestMeta(dirName),
      })),
    )
    results.push(...batchResults)
  }

  return results
}

async function fetchFromGitHub(): Promise<HeuristicContest[]> {
  const dirNames = await fetchContestDirNames()

  const firstResults = await fetchContestMetas(dirNames)
  const missingDirNames = firstResults
    .filter((result) => result.contest === null)
    .map((result) => result.dirName)

  const retryResults = missingDirNames.length > 0 ? await fetchContestMetas(missingDirNames) : []
  const retryMap = new Map(retryResults.map((result) => [result.dirName, result.contest]))

  const contests = firstResults.map(
    (result) => result.contest ?? retryMap.get(result.dirName) ?? null,
  )

  if (missingDirNames.length > 0) {
    const stillMissing = contests.filter((contest) => contest === null).length
    console.warn(
      `[heuristic] Retried ${missingDirNames.length} missing meta files, still missing ${stillMissing}`,
    )
  }

  return contests
    .filter((c): c is HeuristicContest => c !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export async function getAllContests(): Promise<HeuristicContest[]> {
  const cached = readCache()
  if (cached) {
    console.log(`[heuristic] Using cached data (${cached.length} contests)`)
    return cached
  }

  console.log('[heuristic] Fetching from GitHub API...')
  const contests = await fetchFromGitHub()
  writeCache(contests)
  console.log(`[heuristic] Cached ${contests.length} contests`)
  return contests
}
