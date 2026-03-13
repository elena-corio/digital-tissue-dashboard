<template>
  <svg :width="width" :height="height" style="display: block; width: 100%; height: 100%;">
    <line
      :x1="0"
      :x2="width"
      :y1="benchmarkY"
      :y2="benchmarkY"
      stroke="var(--navy-100)"
      stroke-width="2"
      stroke-dasharray="6,4"
      opacity="1"
    />
    <text
      :x="width - 4"
      :y="benchmarkY - 8"
      text-anchor="end"
      font-size="11"
      font-weight="normal"
      fill="#303179"
    >
      benchmark = {{ benchmarkValue }}<tspan v-if="unit">&nbsp;{{ unit }}</tspan>
    </text>
  </svg>
</template>

<script>
export default {
  name: 'BenchmarkLine',
  props: {
    benchmarkValue: {
      type: [Number, String],
      required: true
    },
    unit: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 320
    },
    height: {
      type: Number,
      default: 40
    },
    y: {
      type: Number,
      default: 20
    }
  },
  computed: {
    benchmarkY() {
      return this.y;
    }
  }
};
</script>

<style scoped>
svg {
  display: block;
}
</style>
