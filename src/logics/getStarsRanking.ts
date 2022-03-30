export function getStarsRankingUrl() {
  const users = [
    'Fenta',
    'hzpt-inet-club',
  ]
  const repos = [
    'hzpt-inet-club/inet.org',
    'hzpt-inet-club/english-note',
  ]

  const query = [
    ...users.map(i => `user:${i}`),
    ...repos.map(i => `repo:${i}`),
  ].join(' ')

  const url = `https://github.com/search?l=&o=desc&s=stars&type=Repositories&q=${encodeURIComponent(query)}`
  return url
}
