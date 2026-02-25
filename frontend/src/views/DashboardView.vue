<template>
  <div class="dashboard-root">
    <!-- Header -->
    <HeaderBar />
    <div class="dashboard-main">
      <!-- Left Column -->
      <section class="dashboard-left">
        <TissueCanvas />
        <OrganSelector class="dashboard-organs" />
      </section>
      <!-- Right Column -->
      <section class="dashboard-right">
        <div class="dashboard-topbar">
          <h2 class="h2">{{ uitext.VITALITY.sectionTitle }}</h2>
          <div class="dashboard-cards">
            <VitalityCard type="metabolic" />
            <VitalityCard type="regeneration" />
            <VitalityCard type="expansion">
              <CircularGraph />
            </VitalityCard>
          </div>
        </div>
        <div class="dashboard-bottom">
          <div class="dashboard-bottom-left">
            <TeamList />
          </div>
          <div class="dashboard-bottom-right">
            <GrowthCycles />
            <IssueFound />
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
.dashboard-main {
  display: flex;
  flex: 1 1 auto;
  gap: var(--space-xl);
  padding: var(--space-xl) var(--space-xl) 0 var(--space-xl);
}
.dashboard-left {
  flex: 2 2 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
}
.dashboard-right {
  flex: 3 3 0%;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}
.dashboard-topbar {
  width: 100%;
  margin-bottom: var(--space-lg);
}
.dashboard-cards {
  display: flex;
  gap: var(--space-lg);
  margin-top: var(--space-md);
}
.dashboard-bottom {
  display: flex;
  gap: var(--space-lg);
}
.dashboard-bottom-left {
  flex: 1 1 0%;
}
.dashboard-bottom-right {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
.dashboard-organs {
  margin-top: var(--space-lg);
}
</style>
