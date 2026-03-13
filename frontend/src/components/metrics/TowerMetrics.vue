<template>
  <div class="tower-metrics-title card">
    <div class="card-title">
      {{ selectedMetric?.label }} by Tower
    </div>
    <div ref="containerRef" class="tower-metrics-container" style="display: flex; flex-direction: column; align-items: stretch; width: 100%; height: 100%; min-height: 0; max-height: 320px;">
      <svg
        ref="svgRef"
        class="tower-metrics-svg"
        :viewBox="`0 0 ${containerWidth} ${svgHeight}`"
        :width="containerWidth"
        :height="svgHeight"
        style="display: block; margin-top: 1.5rem;"
      >
        <circle
          v-for="(cluster, idx) in clusters"
          :key="cluster.name"
          :cx="circleX(idx)"
          :cy="circleY(cluster)"
          :r="circleR(cluster)"
          :style="{ fill: circleColor(cluster), transformOrigin: `${circleX(idx)}px ${circleY(cluster)}px` }"
          opacity="0.5"
          class="breathe-circle"
          @mouseenter="hoveredIdx = idx"
          @mouseleave="hoveredIdx = null"
        />
        <!-- Small center circle for each cluster -->
        <circle
          v-for="(cluster, idx) in clusters"
          :key="'center-' + cluster.name"
          :cx="circleX(idx)"
          :cy="circleY(cluster)"
          r="6"
          fill="#fff"
        />
        <!-- Benchmark label inside the diagram, just above the line -->
        <text
          v-if="benchmarkY() !== null"
          :x="benchmarkLineEndX - 4"
          :y="benchmarkY() - 8"
          text-anchor="end"
          font-size="11"
          font-weight="normal"
          fill="#303179"
        >
           benchmark = {{ typeof safeBenchmarkValue() === 'number' ? safeBenchmarkValue().toFixed(2) : safeBenchmarkValue() }}<tspan v-if="kpiUnit()">&nbsp;{{ kpiUnit() }}</tspan>
        </text>
        <!-- Benchmark line (robust, always visible) -->
        <line
          v-if="benchmarkY() !== null"
          :x1="benchmarkLineStartX"
          :x2="benchmarkLineEndX"
          :y1="benchmarkY()"
          :y2="benchmarkY()"
          stroke="var(--navy-100)"
          stroke-width="2"
          stroke-dasharray="6,4"
          opacity="1"
        />
        <!-- Small center circle for each cluster -->
        <circle
          v-for="(cluster, idx) in clusters"
          :key="'center-' + cluster.name"
          :cx="circleX(idx)"
          :cy="circleY(cluster)"
          r="7"
          fill="#fff"
          stroke-width="2"
        />
        <!-- Tower tags at bottom of diagram -->
        <text
          v-for="(cluster, idx) in clusters"
          :key="'tag-' + idx"
          :x="circleX(idx)"
          :y="svgHeight - 10"
          text-anchor="middle"
          font-size="13"
          font-weight="normal"
          fill="#303179"
        >
          {{ 't' + String(idx + 1).padStart(2, '0') }}
        </text>
      </svg>
      <!-- Show tower name and value only on hover, centered inside the hovered circle -->
      <svg v-if="hoveredIdx !== null" class="tower-names-svg" :style="{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none' }">
        <text
          :x="circleX(hoveredIdx)"
          :y="circleY(clusters[hoveredIdx]) - 5"
          text-anchor="middle"
          font-size="15"
          font-weight="bold"
          fill="#303179"
        >
          {{ typeof clusters[hoveredIdx][selectedMetric?.name] === 'number' ? clusters[hoveredIdx][selectedMetric?.name].toFixed(2) : '' }}<tspan v-if="kpiUnit()"> {{ kpiUnit() }}</tspan>
        </text>
      </svg>
    </div>
  </div>
</template>

<script>
import projectData from '../../assets/cache/data.json'
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

export default {
  name: 'TowerMetrics',
  props: {
    selectedMetric: Object
  },
  setup() {
    const containerWidth = ref(420);
    const containerRef = ref(null);
    const svgHeight = ref(240);
    const svgRef = ref(null);
    const margin = ref(0);
    const hoveredIdx = ref(null);
    function updateContainerWidth() {
      if (containerRef.value) {
        containerWidth.value = containerRef.value.clientWidth;
      }
      if (svgRef.value) {
        svgHeight.value = svgRef.value.clientHeight;
      }
    }
    onMounted(() => {
      nextTick(updateContainerWidth);
      window.addEventListener('resize', updateContainerWidth);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateContainerWidth);
    });
    return { containerWidth, containerRef, svgHeight, svgRef, margin, hoveredIdx };
  },
  data() {
    return {
      margin: 30,
      palette: [
        '--light-blue-100',
        '--blue-100',
        '--orange-100',
        '--yellow-100'
      ]
    }
  },
  computed: {
    clusters() {
      // Convert clusters object to array with name
      return Object.entries(projectData.clusters).map(([name, values]) => ({ name, ...values }))
    },
    minMetric() {
      if (!this.selectedMetric) return 0;
      const values = this.clusters.map(c => c[this.selectedMetric.name] ?? 0);
      if (typeof this.selectedMetric.benchmark !== 'undefined') values.push(this.selectedMetric.benchmark);
      return Math.min(...values);
    },
    maxMetric() {
      if (!this.selectedMetric) return 1;
      const values = this.clusters.map(c => c[this.selectedMetric.name] ?? 1);
      if (typeof this.selectedMetric.benchmark !== 'undefined') values.push(this.selectedMetric.benchmark);
      return Math.max(...values);
    },
    minArea() {
      return Math.min(...this.clusters.map(c => c.grossFloorArea ?? 0));
    },
    maxArea() {
      return Math.max(...this.clusters.map(c => c.grossFloorArea ?? 1));
    },
    benchmarkLineStartX() {
      // Start at left margin of container (smaller margin for longer line)
      const margin = Math.max(this.margin, this.containerWidth * 0.05);
      return margin;
    },
    benchmarkLineEndX() {
      // End at right margin of container (smaller margin for longer line)
      const margin = Math.max(this.margin, this.containerWidth * 0.05);
      return this.containerWidth - margin;
    }
  },
  methods: {
    circleR(cluster) {
      // Area proportional to grossFloorArea: radius = k * sqrt(grossFloorArea)
      const minA = this.minArea;
      const maxA = this.maxArea;
      if (maxA === minA) return 52;
      const minSqrt = Math.sqrt(minA);
      const maxSqrt = Math.sqrt(maxA);
      const sqrtA = Math.sqrt(cluster.grossFloorArea);
      const normA = (sqrtA - minSqrt) / (maxSqrt - minSqrt);
      // Map to radius range 40-60
      return 40 + normA * (60 - 40);
    },
    normalizedY(value, radius = 0) {
      // Use actual SVG height for normalization
      const minM = this.minMetric;
      const maxM = this.maxMetric;
      const marginTop = 4;
      const marginBottom = 24;
      const minY = radius + marginTop;
      const maxY = this.svgHeight - radius - marginBottom;
      if (maxM === minM) return (minY + maxY) / 2;
      const norm = (value - minM) / (maxM - minM);
      return maxY - norm * (maxY - minY);
    },
    circleY(cluster) {
      const val = cluster[this.selectedMetric?.name];
      const r = this.circleR(cluster);
      return this.normalizedY(val, r);
    },
    benchmarkY() {
      if (!this.selectedMetric) return 0;
      const benchmark = this.selectedMetric.benchmark;
      const match = this.clusters.find(c => Math.abs((c[this.selectedMetric.name] ?? 0) - benchmark) < 1e-6);
      let radius = 0;
      if (match) {
        radius = this.circleR(match);
      } else {
        const radii = this.clusters.map(c => this.circleR(c));
        radius = radii.length ? radii.reduce((a, b) => a + b, 0) / radii.length : 0;
      }
      return this.normalizedY(benchmark, radius) ?? 0;
    },
    safeBenchmarkValue() {
      return this.selectedMetric && typeof this.selectedMetric.benchmark !== 'undefined' ? this.selectedMetric.benchmark : '';
    },
    circleX(idx) {
      // Use actual container width for responsive positioning
      const n = this.clusters.length;
      // Further increase margin for left/right padding
      const margin = Math.max(this.margin, this.containerWidth * 0.16);
      const minX = margin;
      const maxX = this.containerWidth - margin;
      if (n === 1) return (minX + maxX) / 2;
      return minX + idx * (maxX - minX) / (n - 1);
    },
    circleColor(cluster) {
      if (!this.selectedMetric) return `var(--lila-100)`;
      const benchmark = this.selectedMetric.benchmark;
      const value = cluster[this.selectedMetric.name];
      const higherIsBetter = this.selectedMetric.right > this.selectedMetric.left;
      const success = 'var(--color-success)';
      const error = 'var(--color-error)';
      if (value === undefined) return error;
      if (higherIsBetter) {
        return value >= benchmark ? success : error;
      } else {
        return value <= benchmark ? success : error;
      }
    },
    kpiUnit() {
      return this.selectedMetric?.unit || '';
    },
    getKpiLabel() {
      return this.selectedMetric?.label || '';
    }
  }
};
</script>

<style scoped>
.tower-metrics-title {
  color: var(--navy-50);
  font-family: var(--font-family);
  position: relative;
}
.tower-metrics-svg {
  width: 100%;
  height: auto;
}
.tower-names-row {
  position: relative;
  height: 24px;
  margin-top: 8px;
}
@keyframes breathe {
  0% { transform: scale(0.98); }
  50% { transform: scale(1.02); }
  100% { transform: scale(0.98); }
}
.breathe-circle {
  animation: breathe 2.5s infinite ease-in-out;
  transform-origin: center;
}
.tower-metrics-container {
  position: relative;
  width: 100%;
}
</style>
