<template>
  <div>
    <i class="fa-solid fa-circle-dot text-xs"></i>
    <span class="mx-5 text-gray-400">{{ COMMITS_TEXT }} {{ formatCreatedAt(commit.date) }}</span>
  </div>
  <div class="flex">
    <div class="vertical-line bg-gray-400"></div>
    <div class="divide-y divide-slate-700 my-6">
      <div v-for="item in commit.data" :key="item.commit.message">
        <div class="hover:bg-slate-400 w-full px-6 py-2 rounded-lg">
          <h2 class="text-md font-semibold dark:text-white">{{ item.commit.message }}</h2>
          <div class="flex items-center">
            <img :src="item.author.avatar_url" alt="Avatar" class="w-8 h-8 rounded-full mr-2" />
            <span class="dark:text-white">{{ item.author.login }}</span>
            <span class="dark:text-white mx-2"
              >{{ COMMIT_DATE_TEXT }} {{ formatCreatedAt(item.commit.author.date) }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import { formatCreatedAt } from '@/utils/date'
import { COMMITS_TEXT, COMMIT_DATE_TEXT } from '@/utils/constants'
const props = defineProps({
  commit: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.vertical-line {
  width: 1px;
  margin: 5px;
  height: auto;
}
</style>
