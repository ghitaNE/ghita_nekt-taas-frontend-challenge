import { defineStore } from 'pinia'

export const useAccessTokenStore = defineStore('accessToken', {
  state: () => ({
    token: null as string | null
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    },
    clearToken() {
      this.token = null
    }
  }
})
export const useSelectedRepoStore = defineStore('selectedRepo', {
  state: () => ({
    selectedRepo: null as any | null
  }),
  actions: {
    setSelectedRepo(owner: any) {
      this.selectedRepo = owner
    },
    clearSelectedRepo() {
      this.selectedRepo = null
    }
  }
})
