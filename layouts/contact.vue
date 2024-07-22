<template>
  <div>
    <main class="default">
      <Navigation></Navigation>
      <slot />

      <Footer hideCallToAction />
    </main>
  </div>
</template>

<script setup>
const route = useRoute();

//console.log(route)

watch(
  () => route.fullPath,
  (newValue) => {
    console.log(newValue.includes("/work"));
  }
);
</script>

<style lang="scss">
@use "sass:map";

html {
  overflow-x: hidden;
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  background: #fff4f4;
}

main.default {
  display: flex;
  flex-direction: column;

  @media screen and (max-width: map.get($breakpoint, "medium")) {
    display: block;
  }
}

.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s;
}

.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 15deg);
}

::view-transition-old(selected-project),
::view-transition-new(selected-project) {
  animation-duration: 0.75s;
  animation-timing-function: cubic-bezier(0.52, 0, 0, 0.99);
}

::view-transition-old(navigation),
::view-transition-new(navigation) {
  /* Prevent the default animation,
  so both views remain opacity:1 throughout the transition */
  animation: none;
  /* Use normal blending,
  so the new view sits on top and obscures the old view */
  mix-blend-mode: normal;
}
</style>
