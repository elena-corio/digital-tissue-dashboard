<script setup>
// Ensure Speckle data is loaded globally on app load
import { useSpeckleData } from './composables/useSpeckleData';
useSpeckleData();
import './main.css'
import { useClerk } from '@/composables/useClerk.js'
import { useRouter, useRoute } from 'vue-router'
import { watchEffect } from 'vue'
const { isLoaded, isSignedIn } = useClerk()
const router = useRouter()
const route = useRoute()

watchEffect(() => {
  if (
    isLoaded.value &&
    isSignedIn.value &&
    route.path === '/'
  ) {
    router.replace('/workspace')
  }
})
</script>

<template>
  <div v-if="isLoaded">
    <router-view />
  </div>
  <div v-else class="clerk-loading">
    Loading authentication...
  </div>
</template>

<style>
.clerk-loading {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #888;
}
</style>


