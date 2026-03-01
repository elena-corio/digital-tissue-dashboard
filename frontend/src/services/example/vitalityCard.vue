<!-- VitalityCard.vue -->
<script setup lang="ts">
import { useSpeckleData } from '@/composables/useSpeckleData'

const { data, loading, error, refresh } = useSpeckleData()
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error loading data</div>
  <div v-else>
    <p>Liveability: {{ data?.project.model.properties.liveability }}</p>
  </div>
</template>