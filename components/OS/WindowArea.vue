<template>
  <div class="window-area">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.window-area {
  flex: 1;
  height: 100%;
  margin: 0 18px;
  position: relative;
}
</style>