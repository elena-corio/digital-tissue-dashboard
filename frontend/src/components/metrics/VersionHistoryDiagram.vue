<template>
  <svg :width="svgW" :height="svgH" viewBox="0 0 400 140" class="version-history-svg">
    <!-- Area fill -->
    <polygon :points="areaPoints" fill="#b3bad8" opacity="0.5" />
    <!-- Line -->
    <polyline :points="linePoints" fill="none" stroke="#e9268c" stroke-width="3" />
    <!-- Circles and labels -->
    <g v-for="(pt, i) in points" :key="i">
      <circle :cx="pt.x" :cy="pt.y" r="10" fill="#e9268c" />
      <rect :x="pt.x - 28" :y="pt.y - 32" width="56" height="22" rx="6" fill="#fff" />
      <text :x="pt.x" :y="pt.y - 18" text-anchor="middle" font-size="15" font-weight="bold" fill="#303179">
        {{ pt.label }}
      </text>
    </g>
    <!-- X axis labels -->
    <g v-for="(pt, i) in points" :key="'year-' + i">
      <text :x="pt.x" y="130" text-anchor="middle" font-size="13" fill="#303179">{{ pt.year }}</text>
    </g>
  </svg>
</template>

<script>
import projectData from '../../assets/cache/data.json';
import * as uitext from '../../uitext.js';

export default {
  name: 'VersionHistoryDiagram',
  props: {
    selectedKPI: String
  },
  data() {
    return {
      svgW: 400,
      svgH: 140,
      years: ['v-3', 'v-2', 'v-1', 'latest'],
      versionKeys: ['version01', 'version02', 'version03', 'version04']
    };
  },
  computed: {
    values() {
      // Get values for selectedKPI from each version
      return this.versionKeys.map(v => projectData.versions[v][this.selectedKPI]);
    },
    points() {
      // Map values to SVG coordinates
      const minY = 110, maxY = 30; // invert so higher value = higher y
      // Use global min/max for all KPIs (not just local values)
      let globalMin = null, globalMax = null;
      for (const section of uitext.KPIS.kpis) {
        for (const metric of section.metrics) {
          if (metric.name === this.selectedKPI) {
            globalMin = typeof metric.left === 'number' ? metric.left : Math.min(...this.values);
            globalMax = typeof metric.right === 'number' ? metric.right : Math.max(...this.values);
          }
        }
      }
      if (globalMin === null) globalMin = Math.min(...this.values);
      if (globalMax === null) globalMax = Math.max(...this.values);
      return this.values.map((val, i) => {
        const x = 40 + i * 110;
        let y = minY - ((val - globalMin) / (globalMax - globalMin || 1)) * (minY - maxY);
        let label = typeof val === 'number' ? val.toFixed(2) : val;
        return { x, y, label: label, year: this.years[i] };
      });
    },
    linePoints() {
      return this.points.map(pt => `${pt.x},${pt.y}`).join(' ');
    },
    areaPoints() {
      // Area under line
      const pts = this.points.map(pt => `${pt.x},${pt.y}`);
      return [
        `${this.points[0].x},${this.svgH - 10}`,
        ...pts,
        `${this.points[this.points.length - 1].x},${this.svgH - 10}`
      ].join(' ');
    }
  }
};
</script>

<style scoped>
.version-history-svg {
  width: 100%;
  height: auto;
  display: block;
  background: none;
}
</style>
