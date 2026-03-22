<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h1 class="h1">Create Account</h1>
        <p class="h4">Sign up to digital tissue</p>
      </div>
      <div ref="signUpContainer" class="body"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useClerk } from '@/composables/useClerk.js';

const signUpContainer = ref(null);
let unmount = null;

onMounted(async () => {
  const { clerk, initClerk } = useClerk();
  await initClerk();

  if (clerk.value && signUpContainer.value) {
    const baseUrl = import.meta.env.BASE_URL;
    const signInUrl = baseUrl + 'sign-in';
    const forceRedirectUrl = baseUrl + 'workspace';
    unmount = clerk.value.mountSignUp(signUpContainer.value, {
      signInUrl,
      forceRedirectUrl,
      appearance: {
        variables: {
          colorText: '#303179' // matches var(--navy-100)
        }
      }
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-header {
  text-align: center;
  margin-bottom: var(--space-xl);
  width: 100%;
}
/* Center Clerk widget inside card */
.body {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


</style>
