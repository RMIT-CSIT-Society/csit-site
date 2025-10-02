<template>
  <div
    class="os-window"
    ref="windowRef"
    :style="{
      translate: `${finalCoords.x} ${finalCoords.y}`,
    }"
    :class="{ dragging: isDragging, 'active-window': activeWindow == title }"
    @click="activeWindow = title"
  >
    <div class="title-bar" @mousedown="mouseDown">
      <p>
        {{ title }}
      </p>
      <div v-if="tabs" class="window-tabs">
        <template v-for="tab in tabs" :key="tab">
          <div
            @click="currentTab = tab"
            class="tab"
            :class="{ 'active-tab': currentTab == tab }"
            @mousedown.stop
          >
            {{ tab }}
          </div>
        </template>
      </div>
      <div class="window-actions">
        <div>-</div>
        <div>X</div>
      </div>
    </div>

    <template v-if="customContentWrapper">
      <slot />
    </template>
    <template v-else>
      <div class="os-window-content">
        <slot />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  tabs?: string[];
  initialCoords: {
    x: string;
    y: string;
  };
  customContentWrapper?: boolean;
}>();

const currentTab = defineModel<string>("currentTab", { required: false });
const activeWindow = defineModel<string>("activeWindow", { required: true });

// Window offsets
const offsetX = ref(0);
const offsetY = ref(0);
const windowRef = ref<HTMLDivElement | null>(null);

const isDragging = ref(false);

const finalCoords = ref({
  x: props.initialCoords.x,
  y: props.initialCoords.y,
});

const mouseDown = (event: MouseEvent) => {
  isDragging.value = true;
  activeWindow.value = props.title;

  if (windowRef.value != null) {
    console.log();

    offsetX.value =
      event.clientX - windowRef.value.getBoundingClientRect().left;
    offsetY.value = event.clientY - windowRef.value.getBoundingClientRect().top;
  }

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

function onMouseMove(event: MouseEvent) {
  if (isDragging.value) {
    finalCoords.value = {
      x: `${event.clientX - offsetX.value}px`,
      y: `${event.clientY - offsetY.value}px`,
    };
  }
}

function onMouseUp() {
  isDragging.value = false;
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
}
</script>

<style lang="scss" scoped>
@use "sass:map";

.os-window {
  .os-window-content {
    flex: 1;
    font-family: "Space Mono", monospace;
    line-height: 100%;
    padding: 40px 30px;
    background: rgba(25, 25, 37, 0.5);
    border-radius: 0 0 5px 5px;
    overflow-y: auto;
    padding-bottom: 10em;

    @media screen and (max-width: map.get($breakpoint, "medium")) {
      padding: 1em;
    }

    &:not(.active-window) {
      background: rgba(25, 25, 37, 0.2);
      z-index: 1;

      .os-window-content,
      .title-bar {
        background: rgba(25, 25, 37, 0.3);
      }
    }

    pre,
    p {
      margin: 0;
    }
  }
}

$window-borders: 10px;
$window-borders-mobile: 8px;

.os-window {
  padding: $window-borders;
  gap: $window-borders;
  background: rgba(25, 25, 37, 0.5);
  display: flex;
  flex-direction: column;
  color: #fff;
  min-width: 690px;
  min-height: 600px;
  width: 55vw;
  height: 60vh;
  max-width: calc(100vw - 18px * 2);
  max-height: calc(100vh - 18px * 2 - 50px);
  position: fixed;
  top: 0;
  left: 0;
  transform-origin: 50% 50%;
  translate: 80px 70px;
  backdrop-filter: blur(36px);
  border-radius: 10px;
  overflow: auto;
  resize: both;
  outline: 0px rgba(25, 25, 37, 0.5) solid;
  outline-offset: 0;
  transition: 0.7s cubic-bezier(0, 0.66, 0.03, 0.99) background,
    0.6s cubic-bezier(0, 0.66, 0.03, 0.99) outline-offset,
    0.5s cubic-bezier(0.61, 0.01, 0.03, 0.99) filter 1.2s,
    0.6s cubic-bezier(0.61, 0.01, 0.03, 0.99) scale 1.2s,
    0.1s cubic-bezier(0.61, 0.01, 0.03, 0.99) transform-origin 2s;
  scale: 1;
  transform-origin: 0 0;
  z-index: 2;

  @media screen and (max-width: map.get($breakpoint, "medium")) {
    min-width: auto !important;
    width: 100% !important;
    translate: 0 !important;
    position: absolute;
    padding: $window-borders-mobile;
    gap: $window-borders-mobile;
    transition: 0.7s cubic-bezier(0, 0.66, 0.03, 0.99) background,
      0.6s cubic-bezier(0, 0.66, 0.03, 0.99) outline-offset,
      0.4s cubic-bezier(0.61, 0.01, 0.03, 0.99) filter 1.2s,
      0.45s cubic-bezier(0.61, 0.01, 0.03, 0.99) scale 0s,
      0.35s cubic-bezier(0.61, 0.01, 0.03, 0.99) translate 0s,
      0.35s cubic-bezier(0.61, 0.01, 0.03, 0.99) transform-origin 0s,
      0.1s cubic-bezier(0, 0.68, 0.03, 0.99) opacity 0s;
  }

  @starting-style {
    filter: blur(50px);
    scale: 0.8;
    transform-origin: 50% 50%;
  }

  &.dragging {
    outline: 5px rgba(25, 25, 37, 0.2) solid;
    outline-offset: 5px;
  }

  .os-window-content,
  .title-bar {
    transition: 0.7s cubic-bezier(0, 0.66, 0.03, 0.99) background;
  }

  &:not(.active-window) {
    background: rgba(25, 25, 37, 0.2);
    z-index: 1;

    @media screen and (max-width: map.get($breakpoint, "medium")) {
      translate: 0 2em !important;
      scale: 0.9 !important;
      transform-origin: 50% 50% !important;

      &:active {
        opacity: 0.5;
      }
    }

    .os-window-content,
    .title-bar {
      background: rgba(25, 25, 37, 0.3);
    }
  }
}

.window-actions {
  display: flex;
  justify-content: flex-end;
  flex: 1;
  height: 100%;
  align-self: center;

  @media screen and (max-width: map.get($breakpoint, "medium")) {
    display: none;
  }

  > div {
    display: flex;
    align-items: center;
    padding: 0 0.8em;
    height: 100%;

    &:hover {
      background: #413849;

      &:last-child {
        background: firebrick;
      }
    }
  }
}

.title-bar {
  display: flex;
  height: 56px;
  align-items: baseline;
  gap: 24px;
  background: rgba(25, 25, 37);
  user-select: none;
  border-radius: 5px 5px 0 0;

  p {
    margin: 0;
    font-weight: 700;
    margin-left: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:not(:has(+ .window-tabs)) {
      align-self: center;
    }

    @media screen and (max-width: map.get($breakpoint, "medium")) {
      display: none;
    }
  }
}

.window-tabs {
  display: flex;
  gap: 12px;
  height: 100%;
  padding-top: $window-borders;
  box-sizing: border-box;
  overflow: auto;
  overflow-y: hidden;

  .tab {
    border-color: rgba(255, 255, 255, 0.07);
    border-width: 3px 3px 0px 3px;
    border-style: solid;
    user-select: none;
    color: rgba(255, 255, 255, 0.8);
    padding: 0 20px;
    display: flex;
    align-items: center;

    &:hover {
      background: #413849;
    }

    &.active-tab {
      background: firebrick;
    }
  }
}
</style>
