<template>
  <div class="dashboard-root">
    <div class="dashboard-header">
      <HeaderBar />
    </div>
    <div class="dashboard-title-block">
      <h2 class="h2">{{ uitext.DASHBOARD.title }}</h2>
      <div class="subtitle">{{ uitext.DASHBOARD.subtitle }}</div>
    </div>
    <div class="dashboard-main">
      <!-- Left Column -->
      <section class="dashboard-left dashboard-col">
        <div class="dashboard-left-stack">
          <div class="tissue-organ-wrapper">
            <TissueCanvas />
            <OrganSelector class="dashboard-organs" />
          </div>
        </div>
      </section>
      <!-- Right Column -->
      <section class="dashboard-right dashboard-col">
        <div class="dashboard-right-stack">
          <div class="dashboard-vitality-wrapper">
            <VitalityCard />
          </div>
          <div class="dashboard-team-growth-wrapper">
            <div class="dashboard-team-growth-left">
              <TeamList />
            </div>
            <div class="dashboard-team-growth-right">
              <GrowthCycles />
              <IssueFound />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import HeaderBar from '../components/HeaderBar.vue'
import TissueCanvas from '../components/TissueCanvas.vue'
import OrganSelector from '../components/OrganSelector.vue'
import VitalityCard from '../components/VitalityCard.vue'
import CircularGraph from '../components/CircularGraph.vue'
import GrowthCycles from '../components/GrowthCycles.vue'
import IssueFound from '../components/IssueFound.vue'
import TeamList from '../components/TeamList.vue'
import * as uitext from '../uitext.js'
</script>

<style scoped>
.dashboard-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--grey-50);
}
.dashboard-title-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: var(--space-xl);
  margin-right: var(--space-xl);
  margin-top: var(--space-md);
  gap: var(--space-xs);
}
.dashboard-main {
  display: flex;
  flex: 1 1 auto;
  gap: var(--space-lg);
  margin-left: var(--space-xl);
  margin-right: var(--space-xl);
  margin-top: var(--space-lg);
  align-items: stretch;
  min-height: 0;
}
.dashboard-left.dashboard-col {
  display: flex;
  flex-direction: column;
  flex: 2 2 0%;
  min-height: 0;
}
.dashboard-right.dashboard-col {
  display: flex;
  flex-direction: column;
  flex: 3 3 0%;
  min-height: 0;
}
.dashboard-left-stack {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.dashboard-right-stack {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: var(--space-lg);
}
.dashboard-vitality-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.dashboard-team-growth-wrapper {
  display: flex;
  flex: 1 1 0%;
  gap: var(--space-lg);
  height: 100%;
  align-items: flex-start;
}
.dashboard-team-growth-left {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.dashboard-team-growth-right {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
.dashboard-organs {
  margin-top: var(--space-sm);
  margin-bottom: var(--space-lg);
}
.tissue-organ-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  min-height: 0;
}
</style>
