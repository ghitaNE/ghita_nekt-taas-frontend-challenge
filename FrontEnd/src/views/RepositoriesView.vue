<template>
  <div>Repositories Vue</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAccessTokenStore } from '@/stores'
import { authenticateWithGitHubService } from '@/services/GithubService'

const accessTokenStore = useAccessTokenStore()

const loading = ref(true)

onMounted(async () => {
  loading.value = true
  const code = new URLSearchParams(window.location.search).get('code')
  if (code) {
    try {
      const accessToken = await authenticateWithGitHubService(code)
      console.log('🚀 ~ file: RepositoriesView.vue:19 ~ onMounted ~ accessToken:', accessToken)
      accessTokenStore.setToken(accessToken)
    } catch (error) {
      console.error('Error authenticating with GitHub:', error)
      loading.value = false
    }
  }
})
</script>
