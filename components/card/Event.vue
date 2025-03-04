<template>
  <Cell class="large-3" id="events-card">
    <a :href="clubEvent.url">
      <div>
        <img :src="clubEvent.featureImage.url" alt="" />
        <h3 class="h5">{{ clubEvent.name }}</h3>
        <p>{{ clubEvent.startDate }} - {{ clubEvent.endDate }}</p>
      </div>

      <NuxtLink class="button" to="#">View Event</NuxtLink>
    </a>
  </Cell>
</template>

<script setup lang="ts">
const props = defineProps<{
  clubEvent: ClubEvent
}>();
</script>

<style scoped lang="scss">
@use "sass:map";

#events-card {
  background: rgba(255, 255, 255, 0.10);
  backdrop-filter: invert(0) blur(12px);
  margin: 1.5em;
  outline-color: rgba(255, 255, 255, 0);
  outline-width: 0;
  outline-style: solid;
  outline-offset: -10px;
  transition: 0.25s cubic-bezier(0.93, 0.02, 0.69, 0.99) all;
  scale: 1;
  transform: translateZ(0);
  backface-visibility: hidden;
  pointer-events: auto;

  &:hover {
    outline-width: 5px;
    outline-offset: 10px;
    transition: 0.45s cubic-bezier(0, 0.58, 0.03, 0.99) all;
    outline-color: rgba(255, 255, 255, 0.50);
    scale: 1.05;
    backdrop-filter: invert(1) blur(0px);

    >a {
      color: #191925;
      transition: 0.4s cubic-bezier(0, 0.58, 0.03, 0.99) all;

    }
  }


  >a {
    text-decoration: none;
    color: #fff;
    padding: 1.25em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.25em;
    transition: 0.3s cubic-bezier(0.93, 0.02, 0.69, 0.99) all;

  }

  img {
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  h3 {
    line-height: 125%;
    margin: 0;
    margin-top: 0.5em;
  }

  p {
    opacity: 0.6;
  }
}

// mobile
@media screen and (max-width: map.get($breakpoint, "medium")) {
  #events-card {
    margin: 0.5em;
  }
}
</style>
