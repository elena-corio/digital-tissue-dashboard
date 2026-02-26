<template>
  <div class="team-card card">
    <div class="card-title">{{ uitext.TEAM.title }}</div>
    <ul class="team-list">
      <li v-for="member in uitext.TEAM.members" :key="member.name" class="team-list-item">
        <span class="team-member-name">{{ member.name }}</span>
        <span class="team-member-role">{{ member.role }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import * as uitext from '../uitext.js'
</script>

<style scoped>
.team-card {
  display: flex;
  flex-direction: column;
flex: 1 1 0%;
  min-height: auto;}

.team-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
 
}
.team-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-xs) 0;
  border-bottom: 1px solid var(--grey-100);
  font-size: var(--font-size-body);
   
}
.team-list-item:last-child {
  border-bottom: none;
}
.team-member-name {
  font-weight: var(--font-weight-medium);
  color: var(--navy-100);
}
.team-member-role {
  font-size: var(--font-size-caption);
  color: var(--navy-50);
  font-weight: var(--font-weight-regular);
}
/* Add space below the card */
.team-list-bottom-space {
  margin-bottom: var(--space-xl);
}
</style>
