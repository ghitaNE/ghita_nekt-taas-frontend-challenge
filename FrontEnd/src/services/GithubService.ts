import axios from 'axios'
import { Octokit } from 'octokit'
import router from '@/router'

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
