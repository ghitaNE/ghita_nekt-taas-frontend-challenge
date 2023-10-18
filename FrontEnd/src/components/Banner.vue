<template>
  <div
    v-if="isVisible"
    class="banner bg-blue-500 text-white p-4 flex justify-between items-center my-4 mx-4 rounded-md"
  >
    <div class="message">{{ BANNER_TEXT }}</div>
    <button @click="hideBanner" class="close-icon">
      <i class="fa-solid fa-circle-xmark"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BANNER_TEXT } from '@/utils/constants'
const isVisible = ref(true)

const hideBanner = () => {
  isVisible.value = false
}
</script>
