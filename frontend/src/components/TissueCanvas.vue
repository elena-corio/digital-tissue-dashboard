<template>
  <div class="tissue-canvas">
    <svg ref="svgRef" class="tissue-svg" :width="canvasW" :height="canvasH">
      <line
        v-for="(conn, i) in connections"
        :key="'line-'+i"
        :x1="cells[conn[0]].cx"
        :y1="cells[conn[0]].cy"
        :x2="cells[conn[1]].cx"
        :y2="cells[conn[1]].cy"
        stroke="var(--blue-50)" stroke-width="6" stroke-linecap="round" opacity="0.18"
      />
    </svg>
    <div
      v-for="(cell, idx) in cells"
      :key="idx"
      class="tissue-cell"
      :class="{ large: cell.large }"
      :style="cell.style"
      @mouseenter="() => showCard(idx)"
      @mouseleave="() => hideCard(idx)"
    >
      <div class="tissue-core"></div>
      <div v-if="cell.large" class="tissue-ring"></div>
      <div v-if="cell.showCard" class="tissue-hover-card">
        <div class="card-title">Cell Info</div>
        <div class="body">Type: {{ cell.label }}</div>
        <div class="caption">Activity: {{ cell.activity }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, onBeforeUnmount } from 'vue'
const tissueColors = [
  'var(--navy-100)',
  'var(--blue-100)',
  'var(--light-blue-100)',
  'var(--lila-100)'
]
const svgRef = ref(null)
const canvasW = ref(700)
const canvasH = ref(340)
const cellDefs = [
  { x: 18, y: 22, r: 90, color: tissueColors[0], large: true, label: 'Navy', activity: 'Stable' },
  { x: 60, y: 30, r: 80, color: tissueColors[1], large: true, label: 'Blue', activity: 'Active' },
  { x: 35, y: 65, r: 100, color: tissueColors[2], large: true, label: 'Light Blue', activity: 'Expanding' },
  { x: 70, y: 70, r: 85, color: tissueColors[3], large: true, label: 'Lila', activity: 'Resting' },
  { x: 45, y: 18, r: 40, color: tissueColors[2], large: false, label: 'Small', activity: 'Idle' },
  { x: 80, y: 18, r: 35, color: tissueColors[1], large: false, label: 'Small', activity: 'Idle' },
  { x: 10, y: 60, r: 30, color: tissueColors[3], large: false, label: 'Small', activity: 'Idle' },
  { x: 85, y: 50, r: 30, color: tissueColors[0], large: false, label: 'Small', activity: 'Idle' },
  { x: 55, y: 80, r: 35, color: tissueColors[1], large: false, label: 'Small', activity: 'Idle' },
  { x: 75, y: 55, r: 32, color: tissueColors[0], large: false, label: 'Small', activity: 'Idle' }
]
const cells = reactive(cellDefs.map(c => ({ ...c, cx: 0, cy: 0, style: '', showCard: false })))
const connections = [
  [0,1],[0,2],[1,2],[2,3],[1,3],[0,4],[2,4],[3,5],[1,5],[0,6],[3,7],[2,8],[1,9],[3,9]
]
function resizeCanvas() {
  if (!svgRef.value) return
  const parent = svgRef.value.parentElement
  if (parent) {
    canvasW.value = parent.offsetWidth
    canvasH.value = parent.offsetHeight
    cells.forEach(cell => {
      cell.cx = (cell.x / 100) * canvasW.value
      cell.cy = (cell.y / 100) * canvasH.value
      cell.style = `left: calc(${cell.x}% - ${cell.r/2}px); top: calc(${cell.y}% - ${cell.r/2}px); width: ${cell.r*2}px; height: ${cell.r*2}px; box-shadow: 0 0 40px 0 ${cell.color}, 0 8px 32px 0 rgba(10,26,47,0.12); background: radial-gradient(circle at 60% 40%, #fff 0%, ${cell.color} 80%); animation: breathe 6s infinite;`;
    })
  }
}
function showCard(idx) {
  if (cells[idx].large) cells[idx].showCard = true
}
function hideCard(idx) {
  if (cells[idx].large) cells[idx].showCard = false
}
let resizeObserver
onMounted(() => {
  nextTick(() => {
    resizeCanvas()
    resizeObserver = new ResizeObserver(resizeCanvas)
    if (svgRef.value && svgRef.value.parentElement) {
      resizeObserver.observe(svgRef.value.parentElement)
    }
  })
})
onBeforeUnmount(() => {
  if (resizeObserver && svgRef.value && svgRef.value.parentElement) {
    resizeObserver.unobserve(svgRef.value.parentElement)
  }
})
</script>

<style scoped>
.tissue-canvas {
  width: 100%;
  height: 100%;
  min-height: 240px;
  background: var(--grey-50);
  position: relative;
  overflow: hidden;
}
.tissue-svg {
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 0;
}
.tissue-cell {
  position: absolute;
  border-radius: 50%;
  transition: box-shadow 0.3s, transform 0.2s;
  z-index: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tissue-cell.large:hover {
  z-index: 10;
  box-shadow: 0 0 0 8px var(--blue-50), 0 8px 32px 0 rgba(10,26,47,0.18);
}
.tissue-core {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40%;
  height: 40%;
  background: radial-gradient(circle, #fff 0%, var(--grey-50) 80%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.7;
  z-index: 2;
}
.tissue-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 80%;
  height: 80%;
  border: 4px solid #fff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 24px 4px #fff8;
  pointer-events: none;
  z-index: 3;
}
.tissue-hover-card {
  position: absolute;
  left: 50%;
  top: 0%;
  transform: translate(-50%, -110%);
  min-width: 120px;
  background: #fff;
  color: var(--navy-100);
  border-radius: 12px;
  box-shadow: 0 4px 24px 0 rgba(10,26,47,0.12);
  padding: 12px 16px;
  font-size: 1rem;
  z-index: 20;
  pointer-events: none;
}
.card-title {
  font-weight: bold;
  margin-bottom: 4px;
}
.caption {
  font-size: 0.85em;
  color: var(--blue-100);
}
@keyframes breathe {
  0% { transform: scale(1); }
  50% { transform: scale(1.06); }
  100% { transform: scale(1); }
}
</style>
