<template>
  <div
    class="work-card"
    @mouseover="hovering = true"
    @mouseleave="hovering = false"
  >
    <NuxtLink
      :to="`/work/${work.slug}`"
      @click.native="active = true"
    ></NuxtLink>
    <img
      loading="lazy"
      v-if="work.rolloverImg"
      :src="work.rolloverImg"
      class="rollover-image"
    />

    <img loading="lazy" :src="work.img" :class="{ active: active }" />

    <div class="card-content">
      <h3 class="h5">
        {{ work.title }}
      </h3>
    </div>

    <div class="blur-overlay"></div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectSummary } from "~/server/types";

const hovering = ref(false);

const props = defineProps<{
  /* work: {
    id: number;
    name: string;
    slug: string;
    timeline: {
      start: string;
      end: string;
    };
    img?: string;
    caption: string;
  }; */
  work: ProjectSummary;
}>();

const active = ref(false);
</script>

<style lang="scss" scoped>
@use "sass:map";

.work-card {
  background: #edc3c7;
  border-radius: 1em;
  overflow: hidden;
  position: relative;
  // scroll timeline shit
  animation-name: staggeredScroll;
  animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99);
  animation-duration: 1ms;
  animation-timeline: view();
  animation-range: entry 0% cover 70%;
  aspect-ratio: 16/9;
  position: relative;

  .rollover-image {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: 0.75s cubic-bezier(0.23, 0.01, 0, 1) all;
    transform: scale(0.85);
  }

  &:nth-child(2n - 1) {
    transform-origin: bottom right;
  }
  &:nth-child(2n) {
    transform-origin: bottom left;
  }

  @media screen and (max-width: map.get($breakpoint, "medium")) {
    animation-range: entry 0% cover 40%;
  }

  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;

    outline-width: 0.5em;
    outline-color: #edc3c7;
    outline-offset: calc(-0.5em + 3px);
    outline-style: solid;
    transition: 0.6s cubic-bezier(0.23, 0, 0, 1) all;
    border-radius: 1em;
    z-index: 5;
  }

  .card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2em;
    z-index: 3;
    color: #fff;
    box-sizing: border-box;

    @media screen and (max-width: map.get($breakpoint, "medium")) {
      padding: 2em;
    }
  }

  .blur-overlay {
    height: 20em;
    position: absolute;
    bottom: 0;
    width: 100%;
    background: linear-gradient(
      0deg,
      rgb(237, 195, 199) 15%,
      rgba(205, 218, 242, 0)
    );

    opacity: 0;
  }

  a {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 10;
  }

  h3 {
    margin: 0;
  }

  &:hover {
    &::before {
      outline-width: 1em;
      outline-offset: calc(-1em + 3px);
    }

    img {
      transform: scale(1.15);
    }

    .rollover-image {
      opacity: 1;
      z-index: 1;
      transform: scale(1) !important;
    }
  }

  &:active {
    &::before {
      outline-width: 6em;
      outline-offset: calc(-4em + 3px);
      transition-duration: 0.125s;
      border-radius: 6em;
      outline-color: #ff5565;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.6s cubic-bezier(0.23, 0.01, 0, 1) all;
    //border-radius: 2.4em;

    &.active {
      view-transition-name: selected-project;
    }
  }
}
</style>
