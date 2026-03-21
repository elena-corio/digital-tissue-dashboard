<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h1>Welcome Back</h1>
        <p>Sign in to access your workspace</p>
      </div>
      <div ref="signInContainer"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useClerk } from '@/composables/useClerk.js';

const signInContainer = ref(null);
let unmount = null;

onMounted(async () => {
  const { clerk, initClerk } = useClerk();
  await initClerk();

  if (clerk.value && signInContainer.value) {
    const signUpUrl = '/sign-up'; // always use local path
    const forceRedirectUrl = '/workspace'; // always use local path
    unmount = clerk.value.mountSignIn(signInContainer.value, {
      signUpUrl,
      forceRedirectUrl
    });
  }
});

onUnmounted(() => {
  if (unmount) {
    unmount();
  }
});
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
  padding: var(--space-lg);
}

.auth-card {
  width: 100%;
  max-width: 480px;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--space-xl);
}

.auth-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.auth-header h1 {
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  color: var(--navy-blue-100);
  margin-bottom: var(--space-sm);
}

.auth-header p {
  font-size: var(--font-size-body);
  color: var(--navy-blue-50);
}
</style>
