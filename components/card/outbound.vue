<template>
  <div>
    <div class="outbound-card">
      <a :href="link"></a>

      <div class="blur-overlay"></div>

      <div class="card-content">
        <h3>{{ title }}</h3>
        <h5>
          <slot></slot>
        </h5>
      </div>

      <nuxt-img class="card" :src="img"></nuxt-img>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  link: string;
  img?: string;
}>();
</script>

<style lang="scss" scoped>
@use "sass:map";

.outbound-card {
  background: #cddaf2;
  border-radius: 2em;
  overflow: hidden;
  position: relative;

  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;

    outline-width: 0.5em;
    outline-color: #cddaf2;
    outline-offset: calc(-0.5em + 3px);
    outline-style: solid;
    transition: 0.6s cubic-bezier(0.23, 0, 0, 1) all;
    border-radius: 2em;

    z-index: 5;
  }

  &:hover {
    &::before {
      outline-width: 1em;
      outline-offset: calc(-1em + 3px);
    }

    img {
      transform: scale(1.15);
    }
  }

  a {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 10;
  }

  .blur-overlay {
    height: 20em;
    position: absolute;
    bottom: 0;
    width: 100%;
    background: linear-gradient(0deg,
        rgba(205, 218, 242) 15%,
        rgba(205, 218, 242, 0));
    z-index: 1;
  }

  img {
    width: 100%;
    transition: 0.6s cubic-bezier(0.23, 0.01, 0, 1) all;
  }

  .card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    //padding: 2.5em;
    z-index: 3;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: map.get($breakpoint, "medium")) {
      flex-direction: column;
    }
  }

  h3,
  h5 {
    margin: 45px;

    @media screen and (max-width: map.get($breakpoint, "medium")) {
      margin: 0 45px;
    }
  }
}
</style>