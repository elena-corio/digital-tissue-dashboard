
<template>
  <section class="credits-section">
    <div class="credits-columns">
      <div class="credits-col credits-brand">
        <h3 class="brand-title">
				<span class="digital">digital</span>.<span class="tissue">tissue</span>
			</h3>
        <div class="h2">{{ subtitle }}</div>
        <div class="body credits-reserved">{{ credits.allRightsReserved }}</div>
      </div>
      <div class="credits-col credits-content">
        <div class="credits-table body">
            <div class="credits-row">
            <div class="credits-label body">{{ credits.organisation }}</div>
          </div>
          <div class="credits-row">
            <div class="credits-label body">Seminar</div>
            <div class="credits-value">{{ credits.seminar }}</div>
          </div>
          <div class="credits-row">
            <div class="credits-label body">Developers</div>
            <div class="credits-value">
              <ul>
                <li v-for="dev in credits.developers" :key="dev">{{ dev }}</li>
              </ul>
            </div>
          </div>
          <div class="credits-row">
            <div class="credits-label body">Faculty</div>
            <div class="credits-value">
              <ul>
                <li v-for="fac in credits.faculty" :key="fac">{{ fac }}</li>
              </ul>
            </div>
          </div>
          <div class="credits-row">
            <div class="credits-label body">Learn more</div>
            <div class="credits-value">
              <a href="https://www.iaacblog.com/programs/digital-tissue-dashboard/" target="_blank" rel="noopener" class="credits-link">
                {{ credits.learnMore }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import * as uiText from '@/uiText.js'

const credits = computed(() => uiText.HOMEPAGE.credits)
const subtitle = computed(() => uiText.HOMEPAGE.description)
</script>

<style scoped>
.credits-section {
  width: 100vw;
  background: var(--grey-50, #f8f8f8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: var(--space-lg) var(--space-lg);
  min-height: 300px;
}
.credits-columns {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 900px;
  gap: 48px;
  justify-content: center;
  align-items: flex-start;
}
.credits-col {
  flex: 1 1 0;
  min-width: 220px;
}
.credits-brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 32px 0 0 0;
}
.brand-title {
	color: var(--navy-100);
	font-size: 1.5rem;
    margin-bottom: var(--space-lg);
}
.brand-title .digital {
	font-weight: 400;
}
.brand-title .tissue {
    font-weight: 700;
}
.credits-table {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
  margin-bottom: 24px;
}
.credits-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
}
.credits-label {
  min-width: 120px;
  font-weight: 600;
}
.credits-value ul {
  margin: 0;
  padding-left: 18px;
}
.credits-link {
  color: #1976d2;
  text-decoration: underline;
}
.credits-reserved {
  margin-top: var(--space-lg);
}
</style>
