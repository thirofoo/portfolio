export interface HeuristicContest {
  id: string
  title: string
  date: string
  startDate: string
  endDate: string
  durationMinutes: number
  durationText: string
  rank: number | null
  extendedStanding?: {
    extendedRank: number
    officialEquivalentRank: number
    url: string
  } | null
  score: number | null
  performance: number | null
  language: string | null
  submissionUrl: string | null
  tags: string[]
  visualizer: string | null
  thumbnail: string
  problemUrl: string
  description: string
  editorials: {
    title: string
    url: string
    rank: number | null
  }[]
}

const REPO_RAW_BASE = 'https://raw.githubusercontent.com/thirofoo/heuristic-archive/main'

export const getThumbnailUrl = (contest: HeuristicContest): string =>
  contest.thumbnail ? `${REPO_RAW_BASE}/${contest.id}/${contest.thumbnail}` : ''

export const getVisualizerUrl = (contest: HeuristicContest): string | null =>
  contest.visualizer ? `${REPO_RAW_BASE}/${contest.id}/${contest.visualizer}` : null
