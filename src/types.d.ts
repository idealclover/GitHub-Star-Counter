import { KVNamespace } from '@cloudflare/workers-types'

declare global {
  const CACHETTL: string
  interface GitHub_Star_Fork {
    forks: number
    stars: number
  }

  interface GitHubRepo {
    forks: number
    stargazers_count: number
  }
}
