<template>
  <div class="link">
    <NuxtLink :href="to" :class="{ active: activeSection == sectionName }">
      <slot></slot>
      <div class="highlight"></div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activeSection: string;
  sectionName: string;
  to: string;
}>();
</script>

<style lang="scss" scoped>
@use "sass:map";

.link {
  display: flex;
  justify-content: center;
}

a {
  text-decoration: none;
  color: #858585;
  font-weight: 700;
  line-height: 1.2;
  position: relative;
  //xlarge screens
  @media screen and (min-width: map.get($breakpoint, "large")) {
    pointer-events: auto;
  }

  @media screen and (max-width: map.get($breakpoint, "medium")) {
    color: #fff4f4;
  }

  .highlight {
    position: absolute;
    content: "";
    top: 0;
    left: -20%;
    height: 1.2em;
    width: 140%;
    transform: rotate(-7.5deg);
    z-index: -1;

    &::after {
      content: "";
      display: block;
      background: rgba(130, 162, 214, 0.1);
      width: 100%;
      height: 100%;
      transform-origin: left;
      transform: scaleX(0);
      transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) all;
    }
  }

  &:hover {
    color: #48546a;

    .highlight::after {
      transform: scaleX(1);
      background: rgba(130, 162, 214, 0.368);
    }
  }

  &.active,
  &:active {
    color: #48546a;

    .highlight::after {
      background: #de9797;
      transform: scaleX(1);
    }
  }
}
</style>
