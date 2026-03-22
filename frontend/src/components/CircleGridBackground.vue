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
          :r="radius"
          :fill="getColor(rowIndex-1, colIndex-1)"
          :opacity="0.85"
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
const svgHeight = 750
const colorPalette = [
  'var(--grey-50)',
  'var(--lila-100)',
  'var(--blue-50)'
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
onUnmounted(() => {
  window.removeEventListener('resize', updateCols)
})

function getColor(row, col) {
  // Diagonal color pattern
  return colorPalette[(row + col) % colorPalette.length]
}
</script>

<style scoped>
.circle-grid-bg {
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  height: 750px;
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
