import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from './views/DashboardView.vue';
import SiteView from './views/SiteView.vue';
import ProjectView from './views/ProjectView.vue';
import MetricsView from './views/MetricsView.vue';

const routes = [
  { path: '/', name: 'Overview', component: DashboardView },
  { path: '/site', name: 'Site', component: SiteView },
  { path: '/project', name: 'Project', component: ProjectView },
  { path: '/metrics', name: 'Metrics', component: MetricsView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
