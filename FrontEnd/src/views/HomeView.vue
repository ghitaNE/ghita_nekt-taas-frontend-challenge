<template>
  <div class="flex items-center justify-center h-screen">
    <button
      @click="GithubOAuthService.redirectToGitHub"
      class="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      <i class="fa-brands fa-github px-2"></i> {{ AUTHORIZATION_BUTTON_TEXT }}
    </button>
  </div>
</template>

<script setup>
import GithubOAuthService from '@/services/GithubOAuthService'
import { AUTHORIZATION_BUTTON_TEXT } from '@/utils/constants'
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.centered-button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.centered-button:hover {
  background-color: #0056b3;
}
</style>
