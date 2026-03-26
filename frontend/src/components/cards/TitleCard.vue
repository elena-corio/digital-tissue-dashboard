<template>
  <div class="card title-card">
    <h4 class="card-name">{{ name }}</h4>
    <img :src="iconSrc" :alt="name" :class="[
      'card-icon',
      name === 'Monitoring' ? 'rotate-icon' : '',
      name === 'Framework' ? 'framework-3d' : '',
      (name === 'Automation' || name === 'Coordination') ? 'breathe-card' : ''
    ]" />
    <p class="card-description">{{ description }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
});

// Dynamically import icon from assets - works with GitHub Pages base path
const iconSrc = computed(() => {
  return new URL(`../../assets/icons/${props.icon}`, import.meta.url).href;
});
</script>

<style scoped>
.title-card {
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: var(--space-sm);
  background-color: var(--lila-50);

}

.card-icon {
  width: 5rem;
  height: 5rem;
  object-fit: contain;
  margin-bottom: var(--space-sm);
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s;
  opacity: 0.75;
}






.title-card:hover .card-icon:not(.rotate-icon):not(.framework-3d):not(.breathe-card) {
  animation: breatheOpacity 1.2s infinite alternate cubic-bezier(0.4,0,0.2,1);
}

.title-card:hover .breathe-card {
  animation: breatheOpacity 1.2s infinite alternate cubic-bezier(0.4,0,0.2,1);
}

.title-card:hover .rotate-icon {
  animation: rotate360Opacity 2.5s infinite linear;
}

.title-card:hover .framework-3d {
  animation: rotate3dFramework 2s infinite linear;
  transform-style: preserve-3d;
}
@keyframes rotate3dFramework {
  0% {
    transform: rotate3d(1, 1, 0, 0deg);
    opacity: 0.75;
  }
  100% {
    transform: rotate3d(1, 1, 0, 360deg) rotate3d(1, 1, 0, -45deg);
    opacity: 1;
  }
}


@keyframes breatheOpacity {
  0% {
    transform: scale(1);
    opacity: 0.75;
  }
  100% {
    transform: scale(1.1);
    opacity: 1;
  }
}

@keyframes rotate360Opacity {
  0% {
    transform: rotate(0deg);
    opacity: 0.75;
  }
  100% {
    transform: rotate(360deg);
    opacity: 1;
  }
}

/*
// Uncomment below for always-on breathing effect:
.card-icon {
  animation: breathe 1.2s infinite alternate cubic-bezier(0.4,0,0.2,1);
}
*/

@keyframes breathe {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

.card-name {
  color: var(--navy-100);
  font-weight: bold;
  margin: 0;
  text-align: center;
}

.card-description {
  color: var(--navy-50);
  margin: 0;
  font-size: var(--font-size-body);
  line-height: var(--line-height-relaxed);
  text-align: center;
}
</style>
