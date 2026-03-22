<template>
	<header class="homepage-header">
		<div class="header-left">
			<h3 class="header-title">
				<span class="digital">digital</span>.<span class="tissue">tissue</span>
			</h3>
		</div>
		<div class="header-right">
			<button class="btn login-btn" @click="goToLogin">Login</button>
		</div>
	</header>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goToLogin() {
	router.push('/sign-in')
}
</script>

<style scoped>
.homepage-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.5rem 2rem;
	background: #fff;
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
    border-radius: var(--radius-sm);
    color: var(--navy-100);
    font-weight: bold;
    font-size: var(--font-size-body);
}

.login-btn:hover {
  background-color: var(--grey-50);
}
</style>
