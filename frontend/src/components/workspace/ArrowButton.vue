<template>
  <button class="arrow-btn">
    <svg width="24" height="24" viewBox="0 0 24 24" class="arrow-icon">
      <line x1="6" y1="18" x2="18" y2="6" stroke="currentColor" stroke-width="2"/>
      <polyline points="8,6 18,6 18,16" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>
  </button>
</template>

<script setup>
// No props for now, can add click/aria/size props if needed
</script>

<style scoped>
.arrow-btn {
color: var(--grey-100);
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.arrow-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
</style>
