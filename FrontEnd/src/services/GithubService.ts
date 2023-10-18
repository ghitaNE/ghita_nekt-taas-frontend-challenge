import axios from 'axios'
import { Octokit } from 'octokit'
import router from '@/router'
import { useSelectedRepoStore } from '@/stores'
import { groupCommitsByDate } from '@/utils/helpers'

export async function authenticateWithGitHubService(code: string): Promise<string> {
  try {
    const response = await axios.post(`${import.meta.env.VITE_ACCESS_TOKEN_BASE_URL}`, {
      code
    })
    return response.data.access_token
  } catch (error) {
    throw new Error('Error exchanging code for access token')
  }
}
export async function fetchUserDataService(token: string): Promise<any> {
  try {
    const octokit = new Octokit({ auth: token })
    const response = await octokit.request(`GET ${import.meta.env.VITE_USER_INFO_PATH}`, {
      headers: { 'X-GitHub-Api-Version': '2022-11-28' }
    })
    return response.data
  } catch (error) {
    if (error.status === 401) {
      router.push('/')
    }
    console.error('Error fetching user information:', error)
    throw error
  }
}
export async function fetchRepositoriesService(token: string) {
  try {
    const octokit = new Octokit({ auth: token })
    const response = await octokit.request(`GET ${import.meta.env.VITE_USER_REPOS_PATH}`, {
      headers: { 'X-GitHub-Api-Version': '2022-11-28' }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching repositories:', error)
  }
}
export async function fetchBranchesForRepositoryService(repository: any, token: string | null) {
  const owner = repository.owner.login
  const repoName = repository.name

  const octokit = new Octokit({
    auth: token
  })
  try {
    const response = await octokit.request(`GET ${import.meta.env.VITE_REPOS_BRANCHES_PATH}`, {
      owner,
      repo: repoName,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching branches:', error)
  }
}
export async function fetchBranchCommitsService(selectedBranch: any, token: string | null) {
  const selectedRepoStore = useSelectedRepoStore()
  const octokit = new Octokit({
    auth: token
  })
  try {
    const owner = selectedRepoStore.selectedRepo.owner.login
    const repoName = selectedRepoStore.selectedRepo.name
    const commitSha = selectedBranch.value

    const response = await octokit.request(`GET ${import.meta.env.VITE_BRANCHES_COMMITS_PATH}`, {
      owner,
      repo: repoName,
      commit_sha: commitSha,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        Authorization: `token ${token}`
      }
    })
    const data = groupCommitsByDate(response.data)
    return data
  } catch (error) {
    console.error('Error fetching commits:', error)
  }
}
