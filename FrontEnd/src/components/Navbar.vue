<template>
  <div class="navbar bg-gray-800 p-4 flex justify-between items-center">
    <div class="flex items-center">
      <div class="text-white font-bold text-xl">{{ APP_NAME }}</div>
    </div>
    <div v-if="isLoading" class="flex items-center space-x-4">
      <font-awesome-icon class="animate-spin text-white" :icon="['fas', 'spinner']" />
    </div>
    <div v-if="!isLoading" class="flex items-center space-x-4">
      <div class="text-white">{{ ownerInfo.login }}</div>
      <img :src="ownerInfo.avatar_url" alt="User Avatar" class="w-8 h-8 rounded-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, watch } from 'vue'
import { APP_NAME } from '@/utils/constants'
interface Owner {
  login: string
  avatar_url: string
}
const isLoading = ref(true)
const props = defineProps({
  owner: Object as () => Owner
})
const ownerInfo = computed(() => {
  if (props.owner) {
    const { login, avatar_url } = props.owner || {}
    isLoading.value = false
    return { login, avatar_url }
  }
  isLoading.value = true
  return { login: '', avatar_url: '' }
})
watch(
  () => props.owner,
  (newValue) => {
    if (newValue) {
      isLoading.value = false
    }
  }
)
</script>
