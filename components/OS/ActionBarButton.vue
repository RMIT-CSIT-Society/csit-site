<template>
  <div class="action-button-wrapper">
    <div class="action-button" @click="toggleMenu()">
      {{ action.label }}
    </div>

    <div class="action-menu" v-if="opened" v-on-click-outside="toggleMenu">
      <template
        v-for="childAction in action.childActions"
        :key="childAction.label"
      >
        <div class="child-action-button">
          {{ childAction.label }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";

defineProps<{
  action: OSAction;
}>();

const opened = ref(false);

function toggleMenu() {
  opened.value = !opened.value;
}
</script>

<style scoped>
.action-button-wrapper {
  position: relative;
}
.action-button {
  font-weight: bold;
  color: #fff;
  padding: 0 0.8em;
}
.child-action-button {
  font-weight: 500;
  color: #fff;
}
.action-menu {
  width: 200px;
  position: absolute;
  top: 40px;
  left: -8px;
  background: #191925;
}
</style>
