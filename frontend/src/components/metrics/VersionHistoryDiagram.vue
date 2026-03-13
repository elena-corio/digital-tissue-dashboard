<template>
  <div ref="containerRef" style="position: relative; width: 100%; height: 100%;">
    <svg :width="svgW" :height="svgH" :viewBox="`0 0 ${svgW} ${svgH}`" class="version-history-svg">
      <!-- Area fill -->
      <polygon :points="areaPoints" fill="#b3bad8" opacity="0.5" />
      <!-- Line -->
      <polyline :points="linePoints" fill="none" stroke="#3b479f" stroke-width="3" />
      <!-- Circles -->
      <g v-for="(pt, i) in points" :key="i">
        <circle :cx="pt.x" :cy="pt.y" r="6" fill="#3b479f" @mouseenter="hoveredIdx = i" @mouseleave="hoveredIdx = null" />
      </g>
      <!-- X axis labels -->
      <g v-for="(pt, i) in points" :key="'year-' + i">
        <text :x="pt.x" :y="svgH - 10" text-anchor="middle" font-size="13" class="chart-tag">{{ pt.year }}</text>
      </g>
      <!-- Y-axis extremes: right (good) at top, left (bad) at bottom -->
      <text v-if="selectedMetric" x="4" y="14" text-anchor="start" font-size="11" class="axis-label" style="fill: var(--navy-50);"
      >{{ typeof selectedMetric.right === 'number' ? selectedMetric.right.toFixed(2) : selectedMetric.right }}<tspan v-if="kpiUnit">&nbsp;{{ kpiUnit }}</tspan></text>
      <text v-if="selectedMetric" x="4" :y="svgH - 28" text-anchor="start" font-size="11" class="axis-label" style="fill: var(--navy-50);"
      >{{ typeof selectedMetric.left === 'number' ? selectedMetric.left.toFixed(2) : selectedMetric.left }}<tspan v-if="kpiUnit">&nbsp;{{ kpiUnit }}</tspan></text>
    </svg>
    <!-- Hover label in separate SVG, matching TowerMetrics.vue style -->
    <svg v-if="hoveredIdx !== null" :width="svgW" :height="svgH" :viewBox="`0 0 ${svgW} ${svgH}`" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none;">
      <text
        :x="points[hoveredIdx].x"
        :y="points[hoveredIdx].y - 20"
        text-anchor="middle"
        font-size="15"
        class="hover-label"
      >
        {{ points[hoveredIdx].label }}<tspan v-if="kpiUnit"> {{ kpiUnit }}</tspan>
      </text>
    </svg>
  </div>
</template>

<script>
import projectData from '../../assets/cache/data.json';
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

export default {
  name: 'VersionHistoryDiagram',
  props: {
    selectedMetric: Object
  },
  setup() {
    const containerRef = ref(null);
    const svgW = ref(400);
    const svgH = ref(240);
    function updateSize() {
      if (containerRef.value) {
        svgW.value = containerRef.value.clientWidth;
        svgH.value = containerRef.value.clientHeight || 240;
      }
    }
    onMounted(() => { nextTick(updateSize); window.addEventListener('resize', updateSize); });
    onBeforeUnmount(() => { window.removeEventListener('resize', updateSize); });
    return { containerRef, svgW, svgH };
  },
  data() {
    return {
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
      const marginTop = 4;
      const marginBottom = 24;
      const yBottom = this.svgH - marginBottom;
      const yTop = marginTop;

      const leftBound = this.selectedMetric?.left ?? 0;
      const rightBound = this.selectedMetric?.right ?? 1;
      const inverted = leftBound > rightBound;

      const dataVals = [...this.values];
      if (typeof this.selectedMetric?.benchmark !== 'undefined') dataVals.push(this.selectedMetric.benchmark);
      dataVals.push(leftBound, rightBound);
      const rangeMin = Math.min(...dataVals);
      const rangeMax = Math.max(...dataVals);

      const xMarginLeft = 40;
      const xMarginRight = 30;
      const xStep = (this.svgW - xMarginLeft - xMarginRight) / (this.years.length - 1);

      return this.values.map((val, i) => {
        const x = xMarginLeft + i * xStep;
        const norm = rangeMax === rangeMin ? 0.5
          : inverted ? (rangeMax - val) / (rangeMax - rangeMin)
          : (val - rangeMin) / (rangeMax - rangeMin);
        const y = yBottom - norm * (yBottom - yTop);
        const label = typeof val === 'number' ? val.toFixed(2) : val;
        return { x, y, label, year: this.years[i] };
      });
    },
    linePoints() {
      return this.points.map(pt => `${pt.x},${pt.y}`).join(' ');
    },
    areaPoints() {
      // Area under line
      const pts = this.points.map(pt => `${pt.x},${pt.y}`);
      return [
        `${this.points[0].x},${this.svgH - 24}`,
        ...pts,
        `${this.points[this.points.length - 1].x},${this.svgH - 24}`
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
.chart-tag {
  font-weight: var(--font-weight-regular);
  fill: var(--navy-100);
}
.hover-label {
  font-weight: var(--font-weight-bold);
  fill: var(--navy-100);
}
.axis-label {
  font-weight: var(--font-weight-regular);
  fill: var(--navy-50);
}
</style>
