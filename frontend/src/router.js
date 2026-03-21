import { createRouter, createWebHistory } from 'vue-router';
import Homepage from './views/Homepage.vue';

import SignIn from './views/SignIn.vue';
import SignUp from './views/SignUp.vue';
import Workspace from './views/Workspace.vue';
import { useClerk } from './composables/useClerk';
const routes = [
  { path: '/', name: 'Homepage', component: Homepage },
 {
  path: '/workspace',
  component: Workspace,
  redirect: { name: 'Overview' },
  meta: { requiresAuth: true },
  children: [
    {
      path: 'overview',
      name: 'Overview',
      component: () => import('@/views/DashboardView.vue')
    },
    {
      path: 'site',
      name: 'Site',
      component: () => import('@/views/SiteView.vue')
    },
    {
      path: 'project',
      name: 'Project',
      component: () => import('@/views/ProjectView.vue')
    },
    {
      path: 'metrics',
      name: 'Metrics',
      component: () => import('@/views/MetricsView.vue')
    },

  ]
},
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const isAuthBypassEnabled = import.meta.env.DEV && import.meta.env.VITE_SKIP_AUTH === 'true'

// Navigation guard to protect routes requiring authentication
router.beforeEach(async (to, from, next) => {
  const { isSignedIn, initClerk } = useClerk()

  // Skip authentication only in development when explicitly enabled
  if (isAuthBypassEnabled) {
    next()
    return
  }

  if (to.meta.requiresAuth) {
    try {
      await initClerk()
    } catch (error) {
      console.warn('Clerk initialization failed, redirecting to sign-in:', error)
      next({ name: 'sign-in' })
      return
    }

    console.log('Route:', to.path, 'isSignedIn:', isSignedIn.value);

    if (!isSignedIn.value) {
      next({ name: 'sign-in' })
      return
    }
  }

  next()
})

export default router

