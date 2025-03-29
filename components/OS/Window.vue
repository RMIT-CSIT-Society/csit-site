<template>
  <div class="os-window" ref="windowRef" :style="{
    translate: `${draggingCoords.x - offsetX}px ${draggingCoords.y - offsetY - 80}px`
  }">
    <div class="title-bar" draggable @dragstart="startDrag">{{ title }}>
      <div class="window-tabs">
        <template v-for="(tab, index) in tabs" :key="tab">
          <div @click="currentTab = index" class="tab" :class="{ 'active-tab': currentTab == index }">
            {{ tab }}
          </div>
        </template>
      </div>
    </div>
    <div class="content">
      <slot />

      {{ draggingCoords.x - offsetX }}
      {{ draggingCoords.y - offsetY }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  tabs: string[];
  draggingCoords: {
    x: number,
    y: number
  }
}>();

const currentTab = defineModel<number>('currentTab', { required: true })
const offsetX = ref(0);
const offsetY = ref(0);

const windowRef = ref<HTMLDivElement | null>(null)


function startDrag(event: DragEvent) {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'

    if (windowRef.value != null) {
      offsetX.value = event.clientX - windowRef.value.getBoundingClientRect().left;
      offsetY.value = event.clientY - windowRef.value.getBoundingClientRect().top;
    }
  }
}


</script>

<style>
.os-window {
  .content {

    pre,
    p {
      margin: 0;
    }
  }
}
</style>
<style scoped>
.os-window {
  padding: 10px;
  background: rgba(25, 25, 37, 0.8);
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #fff;
  min-width: 600px;
  min-height: 600px;
  width: 60vw;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  translate: 80px 70px;
  backdrop-filter: blur(15px);
}

.title-bar {
  display: flex;
  height: 56px;
  align-items: center;
  gap: 24px;
  background: rgba(25, 25, 37);
  -webkit-user-drag: element;
  user-select: all;

  p {
    margin: 0;
    font-weight: 700;
    margin-left: 24px;
  }
}

.window-tabs {
  display: flex;
  gap: 12px;
  height: 100%;
  padding-top: 10px;

  .tab {
    border-color: rgba(255, 255, 255, 0.07);
    border-width: 3px 3px 0px 3px;
    border-style: solid;
    user-select: none;
    color: rgba(255, 255, 255, 0.5);
    padding: 0 20px;
    display: flex;
    align-items: center;

    &.active-tab {
      background: firebrick;
    }
  }
}

.content {
  flex: 1;
  font-family: "Source Code Pro", monospace;
  line-height: 100%;
  padding: 40px 30px;
  background: rgba(25, 25, 37, 0.5);
}
</style>