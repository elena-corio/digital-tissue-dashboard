<template>
  <div class="circle-grid-bg">
    <svg
      class="circle-grid-svg"
      :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
    >
      <g v-for="rowIndex in rows" :key="rowIndex">
        <circle
          v-for="colIndex in cols" :key="colIndex"
          :cx="(colIndex-1) * spacing + offsetX"
          :cy="(rowIndex-1) * spacing + offsetY"
          :r="getAnimatedRadius(rowIndex-1, colIndex-1)"
          :fill="getAnimatedColor(rowIndex-1, colIndex-1)"
          :opacity="0.5"
        />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const spacing = 14
const radius = 3
const offsetX = 8
const offsetY = 8
const svgHeight = 700
const colorPalette = [
  'var(--grey-50)',
  'var(--lila-100)',
  'var(--blue-50)',
]

const svgWidth = ref(window.innerWidth)
const rows = Math.floor(svgHeight / spacing)
const cols = ref(Math.floor(svgWidth.value / spacing))

function updateCols() {
  svgWidth.value = window.innerWidth
  cols.value = Math.floor(svgWidth.value / spacing)
}

onMounted(() => {
  window.addEventListener('resize', updateCols)
  updateCols()
})

function seededRandom(row, col) {
  // Simple hash for repeatable randomness
  let seed = row * 73856093 ^ col * 19349663;
  seed = (seed ^ (seed >> 13)) * 0x5bd1e995;
  return Math.abs(seed);
}
function getColor(row, col) {
  // Random color per dot, but consistent per dot
  const idx = seededRandom(row, col) % colorPalette.length;
  return colorPalette[idx];
}

// Animation state: Map of active circle keys to activation timestamps
const activeCircles = ref(new Map())
let animationTimer = null

// Sinusoidal wave state for all circles
const waveTime = ref(Date.now())
let waveTimer = null

function getAnimatedColor(row, col) {
  const key = `${row},${col}`
  if (activeCircles.value.has(key)) {
    return 'var(--light-blue-100)'
  }
  return getColor(row, col)
}

function getAnimatedRadius(row, col) {
  // Breathing effect for active circles
  const key = `${row},${col}`
  let baseRadius = radius
  if (activeCircles.value.has(key)) {
    const start = activeCircles.value.get(key)
    const elapsed = Date.now() - start
    const duration = 900 // ms, must match removal below
    const t = Math.min(elapsed / duration, 1)
    const scale = 1 + 0.5 * Math.sin(Math.PI * t)
    baseRadius = radius * scale
  }
  // Apply sinusoidal wave scale to all circles
  return baseRadius * getWaveScale(row, col)
}

function getWaveScale(row, col) {
  // Sinusoidal scale for each circle, with a traveling wave effect
  const t = waveTime.value / 1000
  // The wave travels horizontally (col) across the grid
  const speed = 1.2 // smaller = slower
  const wavelength = 8 // number of columns per wave
  const phase = (col / wavelength) - (t / speed)
  // Range: 0.85 to 1.15 for a smooth, traveling wave
  return 1 + 0.15 * Math.sin(2 * Math.PI * phase)
}



onMounted(() => {
  window.addEventListener('resize', updateCols)
  updateCols()
  animationTimer = setInterval(animateCircles, 60)
  waveTimer = setInterval(() => {
    waveTime.value = Date.now()
  }, 16) // 60fps for smoothness
})
onUnmounted(() => {
  window.removeEventListener('resize', updateCols)
  if (animationTimer) clearInterval(animationTimer)
  if (waveTimer) clearInterval(waveTimer)
})

function animateCircles() {
  const total = rows * cols.value
  const toActivate = Math.floor(Math.random() * 2) + 1 // 1-2 at a time
  const now = Date.now()
  const newActive = new Map(activeCircles.value)
  for (let i = 0; i < toActivate; i++) {
    const idx = Math.floor(Math.random() * total)
    const row = Math.floor(idx / cols.value)
    const col = idx % cols.value
    const key = `${row},${col}`
    if (!newActive.has(key)) {
      newActive.set(key, now)
    }
  }
  // Remove expired
  for (const [key, start] of newActive.entries()) {
    if (now - start > 900) {
      newActive.delete(key)
    }
  }
  activeCircles.value = newActive
}

onMounted(() => {
  window.addEventListener('resize', updateCols)
  updateCols()
  animationTimer = setInterval(animateCircles, 60)
  waveTimer = setInterval(() => {
    waveTime.value = Date.now()
  }, 16) // 60fps for smoothness
})
onUnmounted(() => {
  window.removeEventListener('resize', updateCols)
  if (animationTimer) clearInterval(animationTimer)
  if (waveTimer) clearInterval(waveTimer)
})
</script>

<style scoped>
.circle-grid-bg {
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  z-index: 1;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.circle-grid-svg {
  width: 100vw;
  height: 100%;
  display: block;
}
</style>
