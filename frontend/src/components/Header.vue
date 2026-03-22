<template>
	<header class="homepage-header">
		<div class="header-left">
			<h3 class="header-title">
				<span class="digital">digital</span>.<span class="tissue">tissue</span>
			</h3>
		</div>
		<div class="header-right">
			<button class="btn login-btn" @click="handleAuthClick">
				{{ isSignedIn.value ? 'Logout' : 'Login' }}
			</button>
		</div>
	</header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useClerk } from '../composables/useClerk.js'
import { onMounted } from 'vue'

const router = useRouter()
const { isSignedIn, signOut, initClerk } = useClerk()

onMounted(() => {
	initClerk()
})

function goToLogin() {
	router.push('/sign-in')
}

async function handleAuthClick() {
	if (isSignedIn.value) {
		await signOut()
		router.push('/')
	} else {
		goToLogin()
	}
}
</script>

<style scoped>
.homepage-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: var(--space-md) var(--space-lg);
	background: rgba(255,255,255,0.85);
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
	box-shadow: var(--shadow-card);
}
.header-title {
	color: var(--navy-100);
	font-size: 1.5rem;
	margin: 0;
}
.header-title .digital {
	font-weight: 400;
}
.header-title .tissue {
	font-weight: 700;
}
.login-btn {
    padding: var(--space-sm) var(--space-lg);
    border-radius: var(--radius-sm);
    color: var(--navy-100);
    font-weight: bold;
    font-size: var(--font-size-body);
}

.login-btn:hover {
  background-color: var(--grey-50);
}
</style>
