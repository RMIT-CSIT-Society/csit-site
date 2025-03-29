<template>
  <div class="window-area" @dragover="dragging">
    <slot />
  </div>
</template>

<script setup lang="ts">

const draggingCoords = defineModel<{ x: number, y: number }>('draggingCoords', { required: true })

function dragging(event: DragEvent) {
  console.log("shit")
  draggingCoords.value = {
    x: event.pageX,
    y: event.pageY
  }

  event.preventDefault();
}
</script>

<style scoped>
.window-area {
  flex: 1;
  height: 100%;
  margin: 0 18px;
  position: relative;
}
</style>