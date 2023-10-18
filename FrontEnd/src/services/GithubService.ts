import axios from 'axios'

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
