<template>
  <div style="position: relative; width: 100%; height: 100%;">
    <svg :width="svgW" :height="svgH" :viewBox="`0 0 ${svgW} ${svgH}`" class="version-history-svg">
      <!-- Area fill -->
      <polygon :points="areaPoints" fill="#b3bad8" opacity="0.5" />
      <!-- Line -->
      <polyline :points="linePoints" fill="none" stroke="#3b479f" stroke-width="3" />
      <!-- Circles -->
      <g v-for="(pt, i) in points" :key="i">
        <circle :cx="pt.x" :cy="pt.y" r="6" fill="#3b479f" @mouseenter="hoveredIdx = i" @mouseleave="hoveredIdx = null" />
      </g>
      <!-- X axis labels: adaptive position below diagram -->
      <g v-for="(pt, i) in points" :key="'year-' + i">
        <text :x="pt.x" :y="svgH - 4" text-anchor="middle" font-size="13" fill="#303179">{{ pt.year }}</text>
      </g>
    </svg>
    <!-- Hover label in separate SVG, matching TowerMetrics.vue style -->
    <svg v-if="hoveredIdx !== null" :width="svgW" :height="svgH" :viewBox="`0 0 ${svgW} ${svgH}`" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none;">
      <text
        :x="points[hoveredIdx].x"
        :y="points[hoveredIdx].y - 20"
        text-anchor="middle"
        font-size="15"
        font-weight="bold"
        fill="#303179"
      >
        {{ points[hoveredIdx].label }}<tspan v-if="kpiUnit"> {{ kpiUnit }}</tspan>
      </text>
    </svg>
  </div>
</template>

<script>
import projectData from '../../assets/cache/data.json';

export default {
  name: 'VersionHistoryDiagram',
  props: {
    selectedMetric: Object
  },
  data() {
    return {
      svgW: 400,
      svgH: 200,
      years: ['v-3', 'v-2', 'v-1', 'latest'],
      versionKeys: ['version01', 'version02', 'version03', 'version04'],
      hoveredIdx: null
    };
  },
  computed: {
    kpiUnit() {
      return this.selectedMetric?.unit || '';
    },
    values() {
      return this.versionKeys.map(v => projectData.versions[v][this.selectedMetric?.name]);
    },
    points() {
      // Map values to SVG coordinates
      const minY = 120, maxY = 30; // move diagram higher
      // Use global min/max for all KPIs (not just local values)
      let globalMin = null, globalMax = null;
      globalMin = typeof this.selectedMetric?.left === 'number' ? this.selectedMetric.left : Math.min(...this.values);
      globalMax = typeof this.selectedMetric?.right === 'number' ? this.selectedMetric.right : Math.max(...this.values);
      const rightMargin = 46;
      const xStep = (this.svgW - 40 - rightMargin) / (this.years.length - 1);
      return this.values.map((val, i) => {
        const x = 40 + i * xStep;
        let y = minY - ((val - globalMin) / (globalMax - globalMin || 1)) * (minY - maxY);
        // Ensure label fits: add padding for label height
        y = Math.max(maxY + 22, Math.min(minY - 22, y));
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
