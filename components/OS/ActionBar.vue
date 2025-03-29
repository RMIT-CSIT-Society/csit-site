<template>
  <div class="action-bar">
    <div class="actions">
      <NuxtImg src="/img/white-logo.svg" id="os-logo" />

      <template v-for="action in actions" :key="action.label">
        <OSActionBarButton :action="action" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const actions = ref([
  {
    label: "Terminal",
    childActions: [
      {
        label: "About Terminal",
        onPress: () => {},
      },
      {
        label: "Settings",
        onPress: () => {},
      },
      {
        label: "Quit Terminal",
        onPress: () => {},
      },
    ],
  },
  {
    label: "File",
    childActions: [
      {
        label: "New File",
        onPress: () => {},
      },
      {
        label: "Open File",
        onPress: () => {},
      },
      {
        label: "Save File",
        onPress: () => {},
      },
      {
        label: "Exit",
        onPress: () => {},
      },
    ],
  },
  {
    label: "Edit",
    childActions: [
      {
        label: "Undo",
        onPress: () => {},
      },
      {
        label: "Redo",
        onPress: () => {},
      },
      {
        label: "Cut",
        onPress: () => {},
      },
      {
        label: "Copy",
        onPress: () => {},
      },
      {
        label: "Paste",
        onPress: () => {},
      },
    ],
  },
  {
    label: "View",
    childActions: [
      {
        label: "Zoom In",
        onPress: () => {},
      },
      {
        label: "Zoom Out",
        onPress: () => {},
      },
      {
        label: "Fullscreen",
        onPress: () => {},
      },
      {
        label: "Hide Toolbar",
        onPress: () => {},
      },
    ],
  },
  {
    label: "Help",
    childActions: [
      {
        label: "Documentation",
        onPress: () => {},
      },
      {
        label: "Keyboard Shortcuts",
        onPress: () => {},
      },
      {
        label: "About",
        onPress: () => {},
      },
    ],
  },
]);
</script>

<style scoped>
.action-bar {
  margin: 18px;
  height: 50px;
  background: #191925;
  display: flex;
  align-items: center;
  flex-direction: row;
  row-gap: -0.4em;
  font-size: 0.8em;
}

.actions {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 18px;
  flex: 1;
}

#os-logo {
  fill: #191925;
  height: 20px;
  margin-right: 0.8em;
}

.action-bar-content {
}
</style>
