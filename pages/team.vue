<template>
  <div id="CSIT-OS">
    <OSActionBar />
    <div class="os-bg"></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank",

  pageTransition: {
    name: "os",
    mode: "out-in",
  },
});
</script>

<style scoped>
#CSIT-OS {
  height: 100vh;
  width: 100%;
  transition: 0.7s cubic-bezier(0.61, 0.01, 0.03, 0.99) all;
  filter: blur(0);

  @starting-style {
    filter: blur(50px);
  }
}

.os-bg {
  height: 100vh;
  width: 100%;
  background: url("img/os-bg.png");
  background-size: 100% 100%;
  transition: 1.5s cubic-bezier(0.61, 0.01, 0.03, 0.99) all 0.9s;
  background-position: center;
  filter: blur(0);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  @starting-style {
    background-size: 200% 200%;
    filter: blur(50px);
  }
}
</style>
