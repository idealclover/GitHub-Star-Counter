export async function handleRequest(request: Request): Promise<Response> {
  const headers = {
    'Access-Control-Allow-Origin': '*',
  }
  if (request.method !== 'GET') {
    return new Response('Expected GET', { status: 405, headers })
  }
  const url = new URL(request.url)
  const { pathname } = url
  if (checkPath(pathname)) {
    let username: string
    if (pathname.endsWith('/')) {
      username = pathname.substring(6, pathname.length - 1)
    } else {
      username = pathname.substring(6)
    }
    const resp = await github(`/users/${username}`)
    const data = await resp.json()
    const pageCount = Math.ceil(data.public_repos / 100)
    const pages = []
    for (let i = 0; i < pageCount; i++) {
      pages.push(i)
    }
    const result: GitHub_Star_Fork = {
      stars: 0,
      forks: 0,
    }
    await Promise.all(
      pages.map(async p => {
        const data = await getRepos(username, p)
        result.stars += data.stars
        result.forks += data.forks
      }),
    )
    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
  } else {
    return new Response('/user/:username/', {
      status: 400,
      statusText: 'Should Provide Github Username',
      headers,
    })
  }
}

function checkPath(pathname: string): boolean {
  if (!pathname.startsWith('/user/')) {
    return false
  }
  const rest = pathname.substring(6, pathname.length - 1)
  return rest.length > 0 && !rest.includes('/')
}

async function github(path: string): Promise<Response> {
  const GITHUB_API = 'https://api.github.com'
  return fetch(`${GITHUB_API}${path}`, {
    headers: {
      'User-Agent': 'GitHub-Start-Counter',
    },
    // @ts-ignore
    cf: { cacheTTl: 900 },
  })
}

async function getRepos(user: string, page: number): Promise<GitHub_Star_Fork> {
  const path = `/users/${user}/repos?per_page=100&page=${page}`
  const resp = await github(path)
  const repos: GitHubRepo[] = await resp.json()
  return repos.reduce(
    (acc, cur) => {
      acc.stars += cur.stargazers_count
      acc.forks += cur.forks
      return acc
    },
    { stars: 0, forks: 0 },
  )
}
