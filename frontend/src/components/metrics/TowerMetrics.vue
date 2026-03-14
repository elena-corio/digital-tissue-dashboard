<template>
  <div class="tower-metrics-title card">
    <div class="card-title">{{ selectedMetric?.label }} by Tower</div>
    <div ref="containerRef" class="tower-metrics-container"
      @mousemove="onMouseMove"
    >
    <svg
        ref="svgRef"
        class="tower-metrics-svg"
        :viewBox="`0 0 ${containerWidth} ${svgHeight}`"
        :width="containerWidth"
        :height="svgHeight"
        style="display: block;"
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
        <!-- Y-axis extremes: right (good) at top, left (bad) at bottom -->
        <text
          v-if="selectedMetric"
          x="4"
          y="14"
          text-anchor="start"
          class="axis-label"
        >{{ typeof selectedMetric.right === 'number' ? selectedMetric.right.toFixed(2) : selectedMetric.right }}<tspan v-if="kpiUnit()">&nbsp;{{ kpiUnit() }}</tspan></text>
        <text
          v-if="selectedMetric"
          x="4"
          :y="svgHeight - 28"
          text-anchor="start"
          class="axis-label"
        >{{ typeof selectedMetric.left === 'number' ? selectedMetric.left.toFixed(2) : selectedMetric.left }}<tspan v-if="kpiUnit()">&nbsp;{{ kpiUnit() }}</tspan></text>
        <!-- Tower tags at bottom of diagram -->
        <text
          v-for="(cluster, idx) in clusters"
          :key="'tag-' + idx"
          :x="circleX(idx)"
          :y="svgHeight - 10"
          text-anchor="middle"
          class="chart-tag"
        >
          {{ 'Tower ' + String(idx + 1).padStart(2, '0') }}
        </text>
      </svg>
      <!-- Benchmark line overlay -->
      <BenchmarkLine
        v-if="selectedMetric"
        :benchmarkValue="safeBenchmarkValue()"
        :unit="kpiUnit()"
        :width="containerWidth"
        :height="svgHeight"
        :y="benchmarkY()"
        :style="{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none' }"
      />
      <!-- Hover tooltip card -->
      <div
        v-if="hoveredIdx !== null && selectedMetric"
        ref="tooltipRef"
        class="tower-tooltip"
        :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }"
      >
        <span class="tower-tooltip-value">
          {{ (() => {
            const metricName = selectedMetric?.name;
            const snakeKey = metricName ? metricName.replace(/[A-Z]/g, l => `_${l.toLowerCase()}`) : '';
            const value = clusters[hoveredIdx]?.properties?.[snakeKey];
            return typeof value === 'number' ? value.toFixed(2) : value;
          })() }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// import projectData from '../../assets/cache/data.json'
import { ref } from 'vue';
import BenchmarkLine from './BenchmarkLine.vue';
import { useChartSize } from '../../utils/useChartSize.js';

export default {
  name: 'TowerMetrics',
  components: { BenchmarkLine },
  props: {
    selectedMetric: Object,
    speckleData: Object
  },
  setup() {
    const { containerRef, chartWidth: containerWidth, chartHeight: svgHeight } = useChartSize(420, 240);
    const svgRef = ref(null);
    const margin = ref(0);
    const hoveredIdx = ref(null);
    const tooltipX = ref(0);
    const tooltipY = ref(0);
    const tooltipRef = ref(null);
    return { containerWidth, containerRef, svgHeight, svgRef, margin, hoveredIdx, tooltipX, tooltipY, tooltipRef };
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
      // Use real Speckle data: data.data.elements (array of clusters)
      if (this.speckleData && this.speckleData.data && Array.isArray(this.speckleData.data.elements)) {
        return this.speckleData.data.elements;
      }
      return [];
    },
    minArea() {
      return Math.min(...this.clusters.map(c => c.properties?.gross_floor_area ?? 0));
    },
    maxArea() {
      return Math.max(...this.clusters.map(c => c.properties?.gross_floor_area ?? 1));
    },
  },
  methods: {
    circleR(cluster) {
      const minA = this.minArea;
      const maxA = this.maxArea;
      if (maxA === minA) return 52;
      const minSqrt = Math.sqrt(minA);
      const maxSqrt = Math.sqrt(maxA);
      const sqrtA = Math.sqrt(cluster.properties?.gross_floor_area ?? 0);
      const normA = (sqrtA - minSqrt) / (maxSqrt - minSqrt);
      return 40 + normA * (60 - 40);
    },
    normalizedY(value, radius = 0) {
      const leftBound = this.selectedMetric?.left ?? 0;
      const rightBound = this.selectedMetric?.right ?? 1;
      const inverted = leftBound > rightBound;
      const metricName = this.selectedMetric?.name;
      const snakeKey = metricName ? metricName.replace(/[A-Z]/g, l => `_${l.toLowerCase()}`) : '';
      const dataVals = this.clusters.map(c => c.properties?.[snakeKey] ?? 0);
      if (typeof this.selectedMetric?.benchmark !== 'undefined') dataVals.push(this.selectedMetric.benchmark);
      dataVals.push(leftBound, rightBound);
      const rangeMin = Math.min(...dataVals);
      const rangeMax = Math.max(...dataVals);
      const marginTop = 4;
      const marginBottom = 24;
      const minY = radius + marginTop;
      const maxY = this.svgHeight - radius - marginBottom;
      if (rangeMax === rangeMin) return (minY + maxY) / 2;
      const norm = inverted
        ? (rangeMax - value) / (rangeMax - rangeMin)
        : (value - rangeMin) / (rangeMax - rangeMin);
      return maxY - norm * (maxY - minY);
    },
    circleY(cluster) {
      const metricName = this.selectedMetric?.name;
      const snakeKey = metricName ? metricName.replace(/[A-Z]/g, l => `_${l.toLowerCase()}`) : '';
      const val = cluster.properties?.[snakeKey];
      const r = this.circleR(cluster);
      return this.normalizedY(val, r);
    },
    benchmarkY() {
      if (!this.selectedMetric || typeof this.selectedMetric.benchmark === 'undefined') return 0;
      const benchmark = this.selectedMetric.benchmark;
      const leftBound = this.selectedMetric.left ?? 0;
      const rightBound = this.selectedMetric.right ?? 1;
      const inverted = leftBound > rightBound;
      const rangeMin = Math.min(leftBound, rightBound);
      const rangeMax = Math.max(leftBound, rightBound);
      const marginTop = 4;
      const marginBottom = 24;
      const yTop = marginTop;
      const yBottom = this.svgHeight - marginBottom;
      if (rangeMax === rangeMin) return (yTop + yBottom) / 2;
      const norm = inverted
        ? (rangeMax - benchmark) / (rangeMax - rangeMin)
        : (benchmark - rangeMin) / (rangeMax - rangeMin);
      return yBottom - norm * (yBottom - yTop);
    },
    safeBenchmarkValue() {
      return this.selectedMetric && typeof this.selectedMetric.benchmark !== 'undefined' ? this.selectedMetric.benchmark : '';
    },
    circleX(idx) {
      const n = this.clusters.length;
      const margin = Math.max(this.margin, this.containerWidth * 0.16);
      const minX = margin;
      const maxX = this.containerWidth - margin;
      if (n === 1) return (minX + maxX) / 2;
      return minX + idx * (maxX - minX) / (n - 1);
    },
    circleColor(cluster) {
      if (!this.selectedMetric) return `var(--lila-100)`;
      const benchmark = this.selectedMetric.benchmark;
      const metricName = this.selectedMetric.name;
      const snakeKey = metricName ? metricName.replace(/[A-Z]/g, l => `_${l.toLowerCase()}`) : '';
      const value = cluster.properties?.[snakeKey];
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
    },
    onMouseMove(e) {
      const rect = this.containerRef.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const tooltipW = this.tooltipRef?.offsetWidth || 60;
      const tooltipH = this.tooltipRef?.offsetHeight || 36;
      this.tooltipX = x + 12 + tooltipW > rect.width ? x - tooltipW - 12 : x + 12;
      this.tooltipY = y + 12 + tooltipH > rect.height ? y - tooltipH - 12 : y + 12;
    }
  }
};
</script>

<style scoped>
.tower-metrics-title {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  min-height: 0;
  box-sizing: border-box;
  gap: 0;
}
.tower-metrics-title .card-title {
  margin-bottom: 0;
}
.tower-metrics-svg {
  width: 100%;
  flex: 1 1 0%;
  min-height: 0;
  display: block;
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
  cursor: pointer;
}
.tower-metrics-container {
  position: relative;
  width: 100%;
  flex: 1 1 0%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.tower-tooltip {
  position: absolute;
  pointer-events: none;
  background: var(--card-bg, #fff);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  padding: var(--space-xs) var(--space-sm);
  width: fit-content;
}
.tower-tooltip-value {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-bold);
  color: var(--navy-100);
  white-space: nowrap;
}
.axis-label {
  font-size: var(--font-size-value);
  fill: var(--navy-50);
}
.chart-tag {
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-regular);
  fill: var(--navy-100);
}
</style>
