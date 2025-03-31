<template>
  <div class="member-button">
    <p>{{ name }}</p>
    <small>
      <template v-for="role in roles">
        {{ role }}
      </template>
    </small>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  roles: string[];
}>();
</script>

<style scoped></style>
