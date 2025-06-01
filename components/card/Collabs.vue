<template>
  <div class="collabs-row">
    <NuxtImg :src="imgSrc" />
    <div class="collabs-info">
      <h3 class="h5">{{ name }}</h3>
      <p>{{ details }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  details: string;
  imgSrc: string;
}>();
</script>

<style scoped>
@keyframes collabs-row {
  from {
    translate: 0 300%;
  }
  to {
    translate: 0 0;
  }
}

.collabs-row {
  max-width: 500px;
  display: flex;
  gap: 2em;

  animation-name: collabs-row;
  animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99);
  animation-fill-mode: both;
  animation-duration: 1ms;
  view-timeline-name: --collabs-row;
  animation-timeline: --collabs-row;
  animation-range: cover 0% contain 50%;

  h3 {
    margin: 0;
  }

  p {
    margin: 0.5em 0;
  }

  .collabs-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  img {
    height: 130px;
    border-radius: 1.6em;
  }
}
</style>
