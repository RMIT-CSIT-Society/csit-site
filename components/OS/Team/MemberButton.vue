<template>
  <div class="member-button">
    <p>{{ name }}</p>
    <small>
      <template v-for="role in roles"> {{ role }}, </template>
    </small>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  roles: string[];
}>();
</script>

<style scoped>
.member-button {
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(25, 25, 37, 0.389);
    scale: 0.8;
    opacity: 0;
    /* transform-origin: bottom; */
    transition: cubic-bezier(0.61, 0.01, 0.03, 0.99) all 0.3s;
    z-index: -1;
  }

  &.selected::after,
  &:hover::after {
    scale: 1.05 1.5;
    opacity: 1;
  }
}
</style>
