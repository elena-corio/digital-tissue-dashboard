<!-- HealthCheck.vue - Example Usage -->
<script setup lang="ts">
import { ref } from 'vue'
import { useSpeckleData } from '../composables/useSpeckleData'

const { data, loading, error, refresh } = useSpeckleData()
const refreshTime = ref<number | null>(null)

const handleRefresh = async () => {
  const start = performance.now()
  await refresh()
  refreshTime.value = Math.round(performance.now() - start)
}
</script>

<template>
  <div class="container">
    <div class="card">
      <h2>Digital Tissue Health Check</h2>
      
      <div v-if="loading" class="status loading">Loading...</div>
      <div v-else-if="error" class="status error">{{ error.message }}</div>
      <div v-else-if="data" class="stats">
        <div class="stat">
          <span class="label">Model</span>
          <span class="value">{{ data.modelName }}</span>
        </div>
        <div class="stat">
          <span class="label">Version</span>
          <span class="value">{{ data.versionId }}</span>
        </div>
        <div class="stat">
          <span class="label">Object ID</span>
          <span class="value">{{ data.objectId }}</span>
        </div>
        <div class="stat">
          <span class="label">Project ID</span>
          <span class="value">{{ data.modelId }}</span>
        </div>
        <div class="stat">
          <span class="label">Last Updated</span>
          <span class="value">{{ new Date(data.createdAt).toLocaleString() }}</span>
        </div>
        <div v-if="refreshTime" class="stat">
          <span class="label">Refresh Time</span>
          <span class="value">{{ refreshTime }}ms</span>
        </div>

        <div v-if="data.data?.properties" class="metrics">
          <h3>{{ data.data.name }} Metrics</h3>
          <div class="metrics-grid">
            <div class="stat">
              <span class="label">Carbon Intensity</span>
              <span class="value">{{ data.data.properties.carbon_intensity.toFixed(2) }}</span>
            </div>
            <div class="stat">
              <span class="label">Daylight Potential</span>
              <span class="value">{{ data.data.properties.daylight_potential.toFixed(2) }}</span>
            </div>
            <div class="stat">
              <span class="label">Green Space Index</span>
              <span class="value">{{ data.data.properties.green_space_distance.toFixed(2) }}</span>
            </div>
            <div class="stat">
              <span class="label">Usable Area Ratio</span>
              <span class="value">{{ data.data.properties.usable_area_ratio.toFixed(2) }}</span>
            </div>
            <div class="stat">
              <span class="label">Circulation Efficiency</span>
              <span class="value">{{ data.data.properties.circulation_efficiency.toFixed(2) }}</span>
            </div>
            <div class="stat">
              <span class="label">Net Floor Area Ratio</span>
              <span class="value">{{ data.data.properties.net_floor_area_ratio.toFixed(2) }}</span>
            </div>
            <div class="stat">
              <span class="label">Program Diversity</span>
              <span class="value">{{ data.data.properties.program_diversity_index.toFixed(2) }}</span>
            </div>
            <div class="stat">
              <span class="label">Volume/Envelope Ratio</span>
              <span class="value">{{ data.data.properties.volume_to_envelope.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <div v-if="data.data?.elements" class="clusters">
          <h3>Clusters ({{ data.data.elements.length }})</h3>
          <div class="clusters-grid">
            <div v-for="cluster in data.data.elements" :key="cluster.id" class="cluster-info">
              <span class="label">{{ cluster.name }}</span>
              <span class="value">{{ cluster.elements.length }} levels</span>
            </div>
          </div>
        </div>
        
        <button @click="handleRefresh" :disabled="loading" class="refresh-btn">
          {{ loading ? 'Refreshing...' : 'Refresh' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 32px;
  max-width: 800px;
  width: 100%;
}

h2 {
  margin: 0 0 24px 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}

.status {
  padding: 12px;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
}

.status.loading {
  background: #f0f9ff;
  color: #0369a1;
}

.status.error {
  background: #fef2f2;
  color: #dc2626;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.stat:last-of-type {
  border-bottom: none;
}

.label {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
}

.value {
  font-size: 13px;
  color: #1a1a1a;
  font-family: 'SF Mono', Monaco, monospace;
  word-break: break-all;
  text-align: right;
  max-width: 60%;
}

.refresh-btn {
  margin-top: 8px;
  width: 100%;
  padding: 10px;
  background: #0369a1;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.refresh-btn:hover:not(:disabled) {
  background: #075985;
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.metrics {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid #f0f0f0;
}

.metrics h3 {
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  grid-column: 1 / -1;
}

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 24px;
}

.metrics .stat {
  display: grid;
  grid-template-columns: 1fr min-content min-content;
  gap: 8px;
  align-items: center;
}

.metrics .stat .value {
  white-space: nowrap;
  max-width: none;
}

.benchmark {
  font-size: 11px;
  color: #9ca3af;
  font-family: 'SF Mono', Monaco, monospace;
  margin-left: 8px;
}

.benchmark::before {
  content: '↑';
  margin-right: 2px;
}

.clusters {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px solid #f0f0f0;
}

.clusters h3 {
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  grid-column: 1 / -1;
}

.clusters-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 24px;
}

.cluster-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.cluster-info:last-child {
  border-bottom: none;
}
</style>