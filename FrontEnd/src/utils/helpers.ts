export function groupCommitsByDate(commits: any) {
  const groupedCommits: any = {}

  commits.forEach((commit: any) => {
    const commitDate = commit.commit.author.date.split('T')[0]

    if (groupedCommits[commitDate]) {
      groupedCommits[commitDate].data.push(commit)
    } else {
      groupedCommits[commitDate] = {
        date: commitDate,
        data: [commit]
      }
    }
  })
  return Object.values(groupedCommits)
}
