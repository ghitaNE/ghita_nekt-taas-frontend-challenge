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
        <RepositoryCard
          v-for="repo in filteredRepositories"
          :key="repo.id"
          :repository="repo"
          @cardClick="fetchBranchesForRepository"
        />
      </div>
    </div>
    <div class="w-3/5">
      <h2 class="text-2xl font-medium font-sans dark:text-white mt-6">
        {{ selectedRepoStore?.selectedRepo?.name }}
      </h2>
      <select
        v-model="selectedBranch"
        id="branches"
        class="my-6 px-10 h-10 border rounded-md bg-transparent dark:border-whites border-solid"
      >
        <option value="">{{ SELECT_A_BRANCH }}</option>
        <option v-for="branch in branches" :key="branch.name" :value="branch.commit.sha">
          {{ branch.name }}
        </option>
      </select>
      <div class="shadow-2xl my-6 mx-6 rounded-md">
        <CommmitsHistory v-for="commit in commits" :key="commit.id" :commit="commit" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useAccessTokenStore, useSelectedRepoStore } from '@/stores'
import { REPOSITORIES, SELECT_A_BRANCH } from '@/utils/constants'
import {
  authenticateWithGitHubService,
  fetchUserDataService,
  fetchRepositoriesService,
  fetchBranchesForRepositoryService,
  fetchBranchCommitsService
} from '@/services/GithubService'
import Navbar from '../components/Navbar.vue'
import Banner from '../components/Banner.vue'
import RepositoryCard from '../components/RepositoryCard.vue'
import CommmitsHistory from '@/components/CommmitsHistory.vue'

const accessTokenStore = useAccessTokenStore()
const selectedRepoStore = useSelectedRepoStore()

const repositories: any = ref([])
const owner: any = ref([])
const selectedBranch = ref('')
const branches: any = ref([])
const commits: any = ref([])
const searchQuery = ref('')
const loading = ref(true)

watch(selectedBranch, async (newBranch) => {
  if (newBranch) {
    commits.value = []
    commits.value = await fetchBranchCommitsService(selectedBranch, accessTokenStore.token)
  }
})
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
const fetchBranchesForRepository = async (repository: any) => {
  branches.value = []
  commits.value = []
  branches.value = await fetchBranchesForRepositoryService(repository, accessTokenStore.token)
}

const filteredRepositories = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return repositories.value.filter((repo: any): any => {
    return repo.name.toLowerCase().includes(query)
  })
})
</script>
