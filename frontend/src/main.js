import { createApp } from 'vue';
import './styles/style.css';
import App from './App.vue';
import router from './router.js';
import urql from '@urql/vue';
import { speckleClient } from './services/speckleClient';
import { clerkPubKey } from '@/config/clerk.js';
import { useClerk } from '@/composables/useClerk.js';

if (!clerkPubKey) {
  throw new Error('Missing Clerk publishable key');
}

const bootstrap = async () => {
  const { initClerk } = useClerk();

  try {
    await initClerk();
  } catch (error) {
    console.error('Failed to initialize Clerk:', error);
  }

  const app = createApp(App);
  app.use(router);
  app.use(urql, speckleClient);
  app.mount('#app');
};

bootstrap();