<template>
  <div class="p-4 mx-6 border-current">
    <div class="flex items-center mb-2">
      <h2 class="text-lg font-bold mb-2 text-sky-600">{{ repository.name }}</h2>
      <span
        class="badge bg-emerald-600 text-white px-2 py-1 rounded-full mx-2 w-15 h-6 text-xs mb-2"
        >{{ PRIVATE_BADGE }}</span
      >
    </div>
    <div class="mb-2 text-sm dark:text-white">{{ repository.description }}</div>
    <div class="text-sm dark:text-white">{{ formattedDate }}</div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { formatCreatedAt } from '@/utils/date'
import { PRIVATE_BADGE } from '@/utils/constants'
const formattedDate = ref('')

const props = defineProps({
  repository: {
    type: Object,
    required: true
  }
})
const emits = defineEmits()
formattedDate.value = formatCreatedAt(props.repository.created_at)
</script>
