<template>
  <div class="tower-metrics-placeholder card">
    <div class="card-title">Metrics by tower</div>
    <svg
      class="tower-metrics-svg"
      viewBox="0 0 420 260"
      preserveAspectRatio="xMidYMid meet"
      style="width: 100%; height: 260px; display: block;"
    >
      <circle
        v-for="(cluster, idx) in clusters"
        :key="cluster.name"
        :cx="circleX(idx)"
        :cy="circleY(cluster)"
        :r="circleR(cluster)"
        :style="{ fill: `var(${palette[idx % palette.length]})` }"
        opacity="0.5"
      />
      <text
        v-for="(cluster, idx) in clusters"
        :key="'label-' + cluster.name"
        :x="circleX(idx)"
        :y="circleY(cluster)"
        text-anchor="middle"
        alignment-baseline="middle"
        font-size="14"
        fill="#303179"
      >{{ cluster.name }}</text>
    </svg>
  </div>
</template>

<script>
import projectData from '../../assets/cache/data.json'

export default {
  name: 'TowerMetrics',
  props: {
    selectedKPI: String
  },
  data() {
    return {
      svgW: 420,
      svgH: 260,
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
      // Find min value for selected metric
      if (!this.selectedKPI) return 0;
      return Math.min(...this.clusters.map(c => c[this.selectedKPI] ?? 0));
    },
    maxMetric() {
      if (!this.selectedKPI) return 1;
      return Math.max(...this.clusters.map(c => c[this.selectedKPI] ?? 1));
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
      // Area proportional to grossFloorArea, radius = sqrt(area/pi)
      const minA = this.minArea;
      const maxA = this.maxArea;
      const normA = (cluster.grossFloorArea - minA) / (maxA - minA);
      // Map to radius range 24-60
      return 24 + normA * (60 - 24);
    },
    circleY(cluster) {
      // z-position proportional to selected metric value
      const minM = this.minMetric;
      const maxM = this.maxMetric;
      let val = cluster[this.selectedKPI];
      if (val === undefined) val = minM;
      const padding = 48;
      const minY = padding;
      const maxY = this.svgH - padding;
      // If all values are equal, center vertically
      if (maxM === minM) {
        return (minY + maxY) / 2;
      }
      const norm = (val - minM) / (maxM - minM);
      return maxY - norm * (maxY - minY);
    },
    circleX(idx) {
      // Evenly space circles horizontally
      return 60 + idx * 90;
    }
  }
};
</script>

<style scoped>
.tower-metrics-placeholder {
  text-align: center;
  color: var(--navy-50);
  font-family: var(--font-family);
}
.tower-metrics-svg {
  width: 100%;
  height: auto;
  margin-top: var(--space-md);
}
</style>
