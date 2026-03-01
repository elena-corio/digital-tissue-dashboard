<!-- VitalityCard.vue - Example Usage -->
<script setup lang="ts">
import { useSpeckleData } from '../composables/useSpeckleData'

const { data, loading, error, refresh } = useSpeckleData()

// Debug logging
console.log('Component state:', { loading: loading.value, error: error.value, hasData: !!data.value })
</script>

<template>
  <div style="padding: 20px; font-family: sans-serif;">
    <h2>Speckle Integration Test</h2>
    
    <!-- Debug info -->
    <div style="background: #f0f0f0; padding: 10px; margin-bottom: 20px; border-radius: 4px;">
      <p><strong>Status:</strong> {{ loading ? 'Loading...' : 'Ready' }}</p>
      <p><strong>Has Data:</strong> {{ !!data }}</p>
      <p><strong>Has Error:</strong> {{ !!error }}</p>
    </div>

    <div v-if="loading">
      <p style="color: blue;">⏳ Loading Speckle data...</p>
    </div>
    
    <div v-else-if="error" style="background: #fee; padding: 15px; border-radius: 4px; color: #c00;">
      <h3>❌ Error</h3>
      <p><strong>Message:</strong> {{ error.message }}</p>
      <pre style="background: white; padding: 10px; overflow: auto;">{{ error }}</pre>
    </div>
    
    <div v-else-if="data">
      <h3>{{ data.modelName }}</h3>
      <p>Version: {{ data.versionId }}</p>
      <p>Updated: {{ new Date(data.createdAt).toLocaleString() }}</p>
      
      <!-- Overall Properties -->
      <div v-if="data.properties['overall-properties']">
        <h4>Overall Metrics</h4>
        <p>Daylight Potential: {{ data.properties['overall-properties'].daylight_potential }}</p>
        <p>Carbon Efficiency: {{ data.properties['overall-properties'].carbon_efficiency }}</p>
      </div>

      <!-- Tower A -->
      <div v-if="data.properties['tower-a']">
        <h4>Tower A</h4>
        <p>Overall: {{ data.properties['tower-a'].properties.daylight_potential }}</p>
        
        <!-- Level 1 -->
        <div v-if="data.properties['tower-a']['level-1']">
          <h5>Level 1</h5>
          <p>Green Space: {{ data.properties['tower-a']['level-1'].green_space_index }}</p>
        </div>
      </div>

      <!-- Tower B -->
      <div v-if="data.properties['tower-b']">
        <h4>Tower B</h4>
        <p>Overall: {{ data.properties['tower-b'].properties.circulation_efficiency }}</p>
      </div>

      <button @click="refresh" style="margin-top: 20px; padding: 10px 20px; cursor: pointer;">Refresh Data</button>
    </div>
    
    <div v-else style="background: #ffe; padding: 15px; border-radius: 4px;">
      <p>⚠️ No data loaded yet</p>
    </div>
  </div>
</template>