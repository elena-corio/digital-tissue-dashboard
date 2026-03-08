<template>
  <div class="tower-metrics-title card">
    <div class="card-title">
      {{ getKpiLabel(selectedKPI) }} by Tower
    </div>
    <div ref="containerRef" class="tower-metrics-container" style="display: flex; flex-direction: column; align-items: stretch; width: 100%;">
      <svg
        ref="svgRef"
        class="tower-metrics-svg"
        :viewBox="`0 0 ${containerWidth} ${svgHeight}`"
        :width="containerWidth"
        :height="svgHeight"
        style="display: block; margin-top: 1.5rem;"
      >
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
        <circle
          v-for="(cluster, idx) in clusters"
          :key="cluster.name"
          :cx="circleX(idx)"
          :cy="circleY(cluster)"
          :r="circleR(cluster)"
          :style="{ fill: circleColor(cluster), transformOrigin: `${circleX(idx)}px ${circleY(cluster)}px` }"
          opacity="0.5"
          class="breathe-circle"
        />
        <!-- KPI value inside circle -->
        <text
          v-for="(cluster, idx) in clusters"
          :key="'kpi-' + cluster.name"
          :x="circleX(idx)"
          :y="circleY(cluster)"
          text-anchor="middle"
          alignment-baseline="middle"
          font-size="16"
          font-weight="bold"
          fill="#303179"
        >{{ typeof cluster[selectedKPI] === 'number' ? cluster[selectedKPI].toFixed(2) : '' }}</text>
        <!-- Benchmark value text -->
        <text
          v-if="benchmarkY() !== null"
          :x="benchmarkLineEndX + 8"
          :y="benchmarkY() - 6"
          text-anchor="start"
          font-size="13"
          fill="#303179"
          font-weight="bold"
        >
          {{ typeof safeBenchmarkValue() === 'number' ? safeBenchmarkValue().toFixed(2) : safeBenchmarkValue() }}
          <tspan :x="benchmarkLineEndX + 8" dy="16" font-size="12">{{ kpiUnit() }}</tspan>
        </text>
      </svg>
      <div class="tower-names-row">
        <div
          v-for="(cluster, idx) in clusters"
          :key="'tower-' + cluster.name"
          :style="{
            position: 'absolute',
            left: `${circleX(idx)}px`,
            width: '80px',
            textAlign: 'center',
            transform: 'translateX(-40px)'
          }"
        >{{ 'Tower ' + (idx + 1) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import projectData from '../../assets/cache/data.json'
import { METRICS } from '../../benchmarks.js'
import { KPIS } from '../../uitext.js'
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

export default {
  name: 'TowerMetrics',
  props: {
    selectedKPI: String
  },
  setup() {
    const containerWidth = ref(420);
    const containerRef = ref(null);
    const svgHeight = ref(240);
    const svgRef = ref(null);
    const margin = ref(0);
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
    return { containerWidth, containerRef, svgHeight, svgRef, margin };
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
      // Find min value for selected metric, including benchmark
      if (!this.selectedKPI) return 0;
      const metric = METRICS[this.selectedKPI];
      const values = this.clusters.map(c => c[this.selectedKPI] ?? 0);
      if (metric && typeof metric.benchmark !== 'undefined') values.push(metric.benchmark);
      return Math.min(...values);
    },
    maxMetric() {
      // Find max value for selected metric, including benchmark
      if (!this.selectedKPI) return 1;
      const metric = METRICS[this.selectedKPI];
      const values = this.clusters.map(c => c[this.selectedKPI] ?? 1);
      if (metric && typeof metric.benchmark !== 'undefined') values.push(metric.benchmark);
      return Math.max(...values);
    },
    minArea() {
      return Math.min(...this.clusters.map(c => c.grossFloorArea ?? 0));
    },
    maxArea() {
      return Math.max(...this.clusters.map(c => c.grossFloorArea ?? 1));
    },
    benchmarkLineStartX() {
      // Start at left margin of container
      const margin = Math.max(this.margin, this.containerWidth * 0.1);
      return margin;
    },
    benchmarkLineEndX() {
      // End at right margin of container
      const margin = Math.max(this.margin, this.containerWidth * 0.1);
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
      // Map to radius range 35-70
      return 35 + normA * (70 - 35);
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
      // Use shared normalization for vertical position, radius-aware
      const val = cluster[this.selectedKPI];
      const r = this.circleR(cluster);
      return this.normalizedY(val, r);
    },
    benchmarkY() {
      // Use radius of circle matching benchmark value, else average radius
      const metric = METRICS[this.selectedKPI];
      if (!metric) return 0; // fallback to 0 if metric is missing
      const benchmark = metric.benchmark;
      // Find radius of circle with value == benchmark
      const match = this.clusters.find(c => Math.abs((c[this.selectedKPI] ?? 0) - benchmark) < 1e-6);
      let radius = 0;
      if (match) {
        radius = this.circleR(match);
      } else {
        const radii = this.clusters.map(c => this.circleR(c));
        radius = radii.length ? radii.reduce((a, b) => a + b, 0) / radii.length : 0;
      }
      // Always return a number
      return this.normalizedY(benchmark, radius) ?? 0;
    },
    safeBenchmarkValue() {
      const metric = METRICS[this.selectedKPI];
      return metric && typeof metric.benchmark !== 'undefined' ? metric.benchmark : '';
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
      const metric = METRICS[this.selectedKPI];
      if (!metric) return `var(--lila-100)`;
      const benchmark = metric.benchmark;
      const value = cluster[this.selectedKPI];
      // Determine if higher or lower is better
      const higherIsBetter = metric.right > metric.left;
      // Success color
      const success = 'var(--color-success)';
      // Error color
      const error = 'var(--color-error)';
      if (value === undefined) return error;
      // For higher is better: above benchmark = success, below = error
      // For lower is better: below benchmark = success, above = error
      if (higherIsBetter) {
        return value >= benchmark ? success : error;
      } else {
        return value <= benchmark ? success : error;
      }
    },
    kpiUnit() {
      // Find unit for selected KPI from uitext.js
      const kpiName = this.selectedKPI;
      for (const section of KPIS.kpis) {
        for (const metric of section.metrics) {
          if (metric.name === kpiName) {
            return metric.unit || '';
          }
        }
      }
      return '';
    },
    getKpiLabel(name) {
      for (const section of KPIS.kpis) {
        for (const metric of section.metrics) {
          if (metric.name === name) {
            return metric.label;
          }
        }
      }
      return name;
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
  margin-top: var(--space-md);
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
