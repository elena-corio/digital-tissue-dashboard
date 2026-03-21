<template>
  <nav class="nav-tabs-root">
    <div class="nav-tabs-list">
      <router-link
        v-for="tab in tabs"
        :key="tab.label"
        :to="tab.route"
        class="nav-tab"
        :class="{ active: $route.name === tab.name }"
      >
        {{ tab.label }}
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';
const props = defineProps({ tabs: Array });
const $route = useRoute();
</script>

<style>
.nav-tab {
  text-decoration: none;
  border: none;
  background: transparent;
  display: inline-block;
}
.nav-tabs-root {
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 2 2 0%;
}
.nav-tabs-list {
	display: flex;
	gap: var(--space-sm);
	background: var(--grey-100);
	border-radius: var(--radius-lg);
	padding: 2px 4px;
}
.nav-tab {
	font-size: var(--font-size-h5);
	color: var(--navy-100);
	cursor: pointer;
	border-radius: var(--radius-md);
	padding: 6px 20px;
	background: transparent;
	border: none;
	font-weight: var(--font-weight-medium);
}
.nav-tab:hover {
	color: var(--navy-100);
	box-shadow: var(--shadow-soft);
	transition: background 0.2s, box-shadow 0.2s;
}
.nav-tab.active {
	background: #fff!important;
	color: var(--navy-100);
	font-weight: bold;
	box-shadow: var(--shadow-soft);
	position: relative;
	z-index: 2;
	margin: 2px 0;
}
</style>
