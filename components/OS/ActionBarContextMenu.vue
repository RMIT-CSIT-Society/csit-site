<template>
  <div class="action-menu" v-on-click-outside="hideMenu">
    <template v-for="childAction in childActions" :key="childAction.label">
      <div class="child-action-button">
        {{ childAction.label }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";

const contextMenuOpened = defineModel<number | null>('contextMenuOpened', { required: true })

defineProps<{
  childActions: OSChildAction[];
}>();

function hideMenu() {
  contextMenuOpened.value = null
}
</script>

<style scoped>
.action-menu {
  width: 200px;
  background: #191925;
  position: fixed;
  top: 1em;
  left: -0.5em;
  position-anchor: --actionBarButtonAnchor;
  position-area: bottom span-right;
  transition: 0.5s cubic-bezier(0.61, 0.01, 0.03, 0.99) all,
    display .5s ease-in;
  ;
  transition-behavior: allow-discrete;

  overflow-y: clip;
  height: max-content;
  transform: translateY(0);

  @starting-style {
    height: 0;
    transform: translateY(-1em);
  }

  &[hidden] {
    opacity: 0;
  }
}

.child-action-button {
  font-weight: 500;
  color: #fff;
  padding: 0.3em 1em;
  user-select: none;

  &:hover {
    background: #413849;
  }
}
</style>
