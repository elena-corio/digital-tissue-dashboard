<template>
  <div class="card vitality-card-parent">
    <div class="card-title">{{ uiText.VITALITY.sectionTitle }}</div>
    <div class="vitality-children-wrapper">
      <div class="card vitality-card-child" v-for="(card, idx) in vitalityCards" :key="card.title">
        <router-link :to="cardRoutes[idx]" class="arrow-btn">
          <ArrowButton />
        </router-link>
        <span class="vitality-label">{{ card.title }}</span>
        <div class="vitality-child-content">
          <div class="vitality-info-inline">
            <span :class="['vitality-percent', percentColor(getPercent(card.value, card.goal, idx))]">{{ getPercent(card.value, card.goal, idx) }}%</span>
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

import { useWorkspaceUI } from '../../composables/useWorkspaceUI.js';
const { bodyBalance, kpisOnTargetPercent } = useWorkspaceUI();
const props = defineProps({ tissueExpansion: { type: Number, required: false } });

const vitalityCards = [
  {
    ...uiText.VITALITY.cards.body,
    value: bodyBalance.value / 100, // normalize to 0-1 for percent calc
  },
  {
    ...uiText.VITALITY.cards.tissue,
    value: props.tissueExpansion ?? 0,
  },
  {
    ...uiText.VITALITY.cards.metabolism,
    value: kpisOnTargetPercent.value, // pass the percentage directly (0-100)
  }
];
const cardRoutes = ['/workspace/site', '/workspace/project', '/workspace/metrics']; // order matches cards

// idx must be passed as third argument
function getPercent(value, goal, idx) {
  // idx 1 (tissue) and 2 (metabolism) are both direct percentages
  if (idx === 1 || idx === 2) return Math.round(value);
  if (!goal || isNaN(value) || isNaN(goal)) return 0;
  return Math.round((value / goal) * 100);
}

function percentColor(percent) {
  if (percent >= 75) return 'success';
  if (percent >= 50) return 'warning';
  return 'error';
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
  gap: 0.5rem;
}
.vitality-label {
  color: var(--navy-100);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  font-weight: var(--font-weight-bold);
}
.vitality-desc {
  color: var(--navy-100);
  font-size: var(--font-size-body);
}
</style>
