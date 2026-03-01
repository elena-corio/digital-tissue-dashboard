<!-- VitalityCard.vue -->
<script setup lang="ts">
import { useSpeckleData } from '../composables/useSpeckleData'

const { data, loading, error, refresh } = useSpeckleData()
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error loading data</div>
  <div v-else>
    <p>Daylight Potential: {{ data?.project.model.properties.daylight_potential }}</p>
    <p>Green Space Index: {{ data?.project.model.properties.green_space_index }}</p>
    <p>Carbon Efficiency: {{ data?.project.model.properties.carbon_efficiency }}</p>
  </div>
</template>