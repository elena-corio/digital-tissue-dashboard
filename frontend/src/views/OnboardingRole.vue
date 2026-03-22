<template>
  <div class="onboarding-container">
    <div class="onboarding-card">
      <h2>Select Your Role</h2>
      <form @submit.prevent="saveRole">
        <label for="role-select">Role</label>
        <select id="role-select" v-model="selectedRole" required>
          <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
        </select>
        <button type="submit">Continue</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useClerk } from '@/composables/useClerk.js';
import * as uitext from '@/uitext.js';

const { user } = useClerk();
const router = useRouter();
const roles = uitext.ROLES;
const selectedRole = ref(roles[0]);

async function saveRole() {
  if (user.value) {
    await user.value.update({ publicMetadata: { role: selectedRole.value } });
    router.push('/workspace');
  }
}
</script>

<style scoped>
.onboarding-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
}
.onboarding-card {
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--space-xl);
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
button {
  background: var(--navy-100);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>
