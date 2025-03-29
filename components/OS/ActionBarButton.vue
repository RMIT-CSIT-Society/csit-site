<template>
  <div class="action-button-wrapper" :class="{ anchor: contextMenuOpened == index }">
    <div class="action-button" @click="toggleMenu" @mouseenter="whenContextMenuOpenedSwitchToHoveredAction">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  index: number
}>();

const contextMenuOpened = defineModel<number | null>('contextMenuOpened', { required: true })

function toggleMenu() {
  if (contextMenuOpened.value == props.index) {
    contextMenuOpened.value = null
  } else {
    contextMenuOpened.value = props.index;
  }

}

function whenContextMenuOpenedSwitchToHoveredAction() {
  if (contextMenuOpened.value != null && contextMenuOpened.value != props.index) {
    contextMenuOpened.value = props.index
  }
}

</script>

<style scoped>
.action-button-wrapper {
  position: relative;
  user-select: none;

  &.anchor {
    anchor-name: --actionBarButtonAnchor;
  }

  &::after {
    content: "";
    height: 100%;
    width: 100%;
    background: rgba(255, 255, 255, 0.514);
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    scale: 0.5;
    opacity: 0;
    transition: 0.3s cubic-bezier(0, 0.47, 0.03, 0.99) all;
  }

  &:hover::after,
  &.anchor::after {
    scale: 1;
    opacity: 1;
  }

}

.action-button {
  font-weight: bold;
  color: rgba(255, 255, 255, 0.70);
  padding: 0 0.8em;
  position: relative;

  .anchor & {
    color: rgba(255, 255, 255, 1);
  }
}
</style>
