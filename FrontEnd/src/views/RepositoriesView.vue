<template>
  <Navbar :owner="owner" />
  <Banner />
  <div class="m-4">
    <h1 class="text-4xl font-medium font-sans dark:text-white m-2">{{ REPOSITORIES }}</h1>
  </div>
  <div class="flex">
    <div class="w-2/5">
      <div class="my-6 mx-6 shadow-xl">
        <input
          v-model="searchQuery"
          placeholder="Search..."
          class="w-full px-4 py-1 h-10 border rounded-md bg-transparent dark:border-white"
        />
      </div>
      <div class="divide-y divide-slate-700 shadow-2xl my-6 rounded-md mx-6">
        <RepositoryCard v-for="repo in filteredRepositories" :key="repo.id" :repository="repo" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAccessTokenStore } from '@/stores'
import {
  authenticateWithGitHubService,
  fetchUserDataService,
  fetchRepositoriesService
} from '@/services/GithubService'
import Banner from '../components/Banner.vue'
import Navbar from '../components/Navbar.vue'
import { REPOSITORIES } from '@/utils/constants'
import RepositoryCard from '../components/RepositoryCard.vue'

const accessTokenStore = useAccessTokenStore()

const loading = ref(true)
const owner: any = ref([])
const searchQuery = ref('')
const repositories: any = ref([])

onMounted(async () => {
  loading.value = true
  const code = new URLSearchParams(window.location.search).get('code')
  if (code) {
    try {
      const accessToken = await authenticateWithGitHubService(code)
      accessTokenStore.setToken(accessToken)
      owner.value = await fetchUserDataService(accessToken)
      repositories.value = await fetchRepositoriesService(accessToken)
    } catch (error) {
      console.error('Error authenticating with GitHub:', error)
      loading.value = false
    }
  }
})
const filteredRepositories = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return repositories.value.filter((repo: any): any => {
    return repo.name.toLowerCase().includes(query)
  })
})
</script>
