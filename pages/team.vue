<template>
  <div id="CSIT-OS">
    <OSActionBar />
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
}
</style>
