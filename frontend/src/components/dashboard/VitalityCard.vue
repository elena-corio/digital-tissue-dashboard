<template>
  <div class="card vitality-card-parent">
    <div class="vitality-children-wrapper">
      <div class="card vitality-card-child" v-for="(card, idx) in vitalityCards" :key="card.title">
        <router-link :to="cardRoutes[idx]" class="arrow-btn">
          <ArrowButton />
        </router-link>
        <span class="vitality-label">{{ card.title }}</span>
        <div class="vitality-child-content">
          <div class="vitality-info-inline">
            <span class="vitality-circle-wrapper">
              <svg :width="72" :height="72" class="vitality-circle">
                <circle
                  :stroke-width="getCircleProps(getPercent(card.value, card.goal, idx)).stroke"
                  :r="getCircleProps(getPercent(card.value, card.goal, idx)).radius"
                  :cx="36"
                  :cy="36"
                  fill="none"
                  class="vitality-circle-bg"
                />
                <circle
                  :stroke-width="getCircleProps(getPercent(card.value, card.goal, idx)).stroke"
                  :r="getCircleProps(getPercent(card.value, card.goal, idx)).radius"
                  :cx="36"
                  :cy="36"
                  fill="none"
                  :stroke-dasharray="getCircleProps(getPercent(card.value, card.goal, idx)).circumference"
                  :stroke-dashoffset="getCircleProps(getPercent(card.value, card.goal, idx)).offset"
                  :class="['vitality-circle-bar', percentColor(getPercent(card.value, card.goal, idx), idx)]"
                />
                <text x="36" y="38" text-anchor="middle" font-size="22" :class="['vitality-circle-text', percentColor(getPercent(card.value, card.goal, idx), idx)]">
                  {{ getPercent(card.value, card.goal, idx) }}%
                </text>
              </svg>
            </span>
            <span class="vitality-desc">{{ card.description }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as uiText from '../../uiText.js'
import ArrowButton from '../workspace/ArrowButton.vue'

const props = defineProps({
  tissueExpansion: { type: Number, required: false },
  kpisOnTargetPercent: { type: Number, required: false },
  bodyBalance: { type: Number, required: false },
});

const vitalityCards = [
  {
    ...uiText.VITALITY.cards.body,
    value: props.bodyBalance ?? 0, // Already percent, do not multiply by 100
  },
  {
    ...uiText.VITALITY.cards.tissue,
    value: props.tissueExpansion ?? 0,
  },
  {
    ...uiText.VITALITY.cards.metabolism,
    value: props.kpisOnTargetPercent ?? 0,
  }
];
const cardRoutes = ['/workspace/site', '/workspace/building', '/workspace/metrics']; // order matches cards

// idx must be passed as third argument
function getPercent(value, goal, idx) {
  // idx 0 (bodyBalance) is already percent
  if (idx === 0) return Math.round(value);
  // idx 1 (tissue) and 2 (metabolism) are both direct percentages
  if (idx === 1 || idx === 2) return Math.round(value);
  if (!goal || isNaN(value) || isNaN(goal)) return 0;
  return Math.round((value / goal) * 100);
}

function percentColor(percent, idx) {
  // idx 0: body balance (HB03 %), error if too far from 33%
  if (idx === 0) {
    // Error if <23% or >43% (±10% from 33%)
    if (percent < 23 || percent > 43) return 'error';
    if (percent < 28 || percent > 38) return 'warning';
    return 'success';
  }
  // idx 1: tissue expansion, error if <75%
  if (idx === 1) {
    if (percent < 75) return 'error';
    if (percent < 90) return 'warning';
    return 'success';
  }
  // idx 2: kpis on target, error if <75%
  if (idx === 2) {
    if (percent < 75) return 'error';
    if (percent < 90) return 'warning';
    return 'success';
  }
  // fallback
  if (percent >= 75) return 'success';
  if (percent >= 50) return 'warning';
  return 'error';
}

// Update getCircleProps for larger circle
function getCircleProps(percent) {
  const radius = 36; 
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = Math.max(0, Math.min(percent, 100));
  const offset = circumference - (progress / 100) * circumference;
  return { radius: normalizedRadius, circumference, offset, stroke };
}
</script>

<style scoped>
.arrow-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.arrow-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  opacity: 0.7;
}
.vitality-card-parent {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.vitality-children-wrapper {
  display: flex;
  flex-direction: row;
  gap: var(--space-md);
  width: 100%;
}
.vitality-card-child {
  border-radius: var(--radius-md);
  flex: 1 1 0;
  min-width: 0;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  justify-content: flex-start;
  position: relative;
}

.vitality-child-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}
.vitality-percent {
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
}
.success {
  color: var(--color-success);
}
.warning {
  color: var(--color-error);
}
.error {
  color: var(--color-error);
}
.vitality-info-inline {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.25rem;
}
.vitality-label {
  color: var(--navy-100);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  font-weight: var(--font-weight-bold);
}
.vitality-desc {
  color: var(--navy-50);
  font-size: var(--font-size-caption);
  font-weight: 500;
  margin-left: 0.2rem;
  max-width: 120px;
}

/* Add styles for the circle */
.vitality-circle-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
}
.vitality-circle-bg {
  stroke: #e0e0e0;
}
.vitality-circle-bar {
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.5s;
}
.vitality-circle-bar.success {
  stroke: var(--color-success, #4caf50);
}
.vitality-circle-bar.warning {
  stroke: var(--color-warning, #ff9800);
}
.vitality-circle-bar.error {
  stroke: var(--color-error, #f44336);
}
.vitality-circle-text {
  dominant-baseline: middle;
  font-weight: bold;
  font-family: inherit;
  /* color is set by .success/.warning/.error */
  font-size: 18px;
}
.vitality-circle-text.success {
  fill: var(--color-success, #4caf50);
}
.vitality-circle-text.warning {
  fill: var(--color-warning, #ff9800);
}
.vitality-circle-text.error {
  fill: var(--color-error, #f44336);
}
</style>
