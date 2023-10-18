<template>
  <Navbar :owner="owner" />
  <Banner />
  <div>Repositories Vue</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAccessTokenStore } from '@/stores'
import { authenticateWithGitHubService, fetchUserDataService } from '@/services/GithubService'
import Banner from '../components/Banner.vue'
import Navbar from '../components/Navbar.vue'

const accessTokenStore = useAccessTokenStore()

const loading = ref(true)
const owner: any = ref([])

onMounted(async () => {
  loading.value = true
  const code = new URLSearchParams(window.location.search).get('code')
  if (code) {
    try {
      const accessToken = await authenticateWithGitHubService(code)
      accessTokenStore.setToken(accessToken)
      owner.value = await fetchUserDataService(accessToken)
    } catch (error) {
      console.error('Error authenticating with GitHub:', error)
      loading.value = false
    }
  }
})
</script>
