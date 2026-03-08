<template>
  <div class="tower-metrics-placeholder card">
    <div class="card-title">Metrics by tower</div>
    <svg
      class="tower-metrics-svg"
      viewBox="0 0 420 240"
      preserveAspectRatio="xMidYMid meet"
      style="width: 100%; height: 240px; display: block; margin-top: 1.5rem;"
    >
      <circle
        v-for="(cluster, idx) in clusters"
        :key="cluster.name"
        :cx="circleX(idx)"
        :cy="circleY(cluster)"
        :r="circleR(cluster)"
        :style="{ fill: circleColor(cluster) }"
        opacity="0.5"
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
      >{{ (cluster[selectedKPI] ?? '') }}</text>
      <!-- Horizontal line at benchmark Y position -->
      <line
        v-if="benchmarkY() !== null"
        x1="0"
        :y1="benchmarkY()"
        x2="420"
        :y2="benchmarkY()"
        stroke="#303179"
        stroke-width="2"
        stroke-dasharray="6,4"
        opacity="0.7"
      />
      <text
        v-if="benchmarkY() !== null"
        x="430"
        :y="benchmarkY()+3"
        text-anchor="start"
        font-size="13"
        fill="#303179"
        font-weight="bold"
      >{{ safeBenchmarkValue() }}</text>
    </svg>
    <div class="tower-names-row">
      <div
        v-for="(cluster, idx) in clusters"
        :key="'tower-' + cluster.name"
        :style="{
          flex: '1 1 0',
          textAlign: 'center',
          marginLeft: idx === 0 ? `${margin}px` : undefined,
          marginRight: idx === clusters.length - 1 ? `${margin}px` : undefined
        }"
      >{{ 'Tower ' + (idx + 1) }}</div>
    </div>
  </div>
</template>

<script>
import projectData from '../../assets/cache/data.json'
import { METRICS } from '../../benchmarks.js'

export default {
  name: 'TowerMetrics',
  props: {
    selectedKPI: String
  },
  data() {
    return {
      svgW: 420,
      svgH: 260,
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
    circleY(cluster) {
      // z-position proportional to selected metric value, accounting for circle radius
      const minM = this.minMetric;
      const maxM = this.maxMetric;
      let val = cluster[this.selectedKPI];
      if (val === undefined) val = minM;
      const r = this.circleR(cluster);
      const marginTop = 4;
      const marginBottom = 24;
      const minY = r + marginTop;
      const maxY = this.svgH - r - marginBottom;
      // If all values are equal, center vertically
      if (maxM === minM) {
        return (minY + maxY) / 2;
      }
      const norm = (val - minM) / (maxM - minM);
      return maxY - norm * (maxY - minY);
    },
    benchmarkY() {
      // Get benchmark value for selected KPI
      const metric = METRICS[this.selectedKPI];
      if (!metric) return null;
      // Use same normalization as circleY
      const minM = this.minMetric;
      const maxM = this.maxMetric;
      const benchmark = metric.benchmark;
      const r = 0; // line, not circle
      const marginTop = 8;
      const marginBottom = 24;
      const minY = r + marginTop;
      const maxY = this.svgH - r - marginBottom;
      if (maxM === minM) return (minY + maxY) / 2;
      const norm = (benchmark - minM) / (maxM - minM);
      return maxY - norm * (maxY - minY);
    },
    safeBenchmarkValue() {
      const metric = METRICS[this.selectedKPI];
      return metric && typeof metric.benchmark !== 'undefined' ? metric.benchmark : '';
    },
    circleX(idx) {
      // Evenly space circle centers horizontally, independent of radius
      const n = this.clusters.length;
      const margin = this.margin;
      const minX = margin;
      const maxX = this.svgW - margin;
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
    }
  }
};
</script>

<style scoped>
.tower-metrics-placeholder {
  text-align: center;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 32px;
  margin-top: 8px;
}
</style>
