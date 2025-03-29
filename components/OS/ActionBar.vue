<template>
  <div class="action-bar">
    <div class="actions">
      <div id="os-logo-wrapper">
        <NuxtImg src="/img/white-logo.svg" id="os-logo" />
      </div>

      <template v-for="(action, index) in actions" :key="action.label">
        <OSActionBarButton :label="action.label" :index="index" v-model:contextMenuOpened="contextMenuOpened" />
      </template>

      <OSActionBarContextMenu v-if="contextMenuOpened != null" :childActions="actions[contextMenuOpened].childActions"
        v-model:contextMenuOpened="contextMenuOpened" />
    </div>
  </div>
</template>

<script setup lang="ts">
const contextMenuOpened = ref<number | null>(null)
const actions = ref([
  {
    label: "Terminal",
    childActions: [
      {
        label: "About Terminal",
        onPress: () => { },
      },
      {
        label: "Settings",
        onPress: () => { },
      },
      {
        label: "Quit Terminal",
        onPress: () => { },
      },
    ],
  },
  {
    label: "File",
    childActions: [
      {
        label: "New File",
        onPress: () => { },
      },
      {
        label: "Open File",
        onPress: () => { },
      },
      {
        label: "Save File",
        onPress: () => { },
      },
      {
        label: "Exit",
        onPress: () => { },
      },
    ],
  },
  {
    label: "Edit",
    childActions: [
      {
        label: "Undo",
        onPress: () => { },
      },
      {
        label: "Redo",
        onPress: () => { },
      },
      {
        label: "Cut",
        onPress: () => { },
      },
      {
        label: "Copy",
        onPress: () => { },
      },
      {
        label: "Paste",
        onPress: () => { },
      },
    ],
  },
  {
    label: "View",
    childActions: [
      {
        label: "Zoom In",
        onPress: () => { },
      },
      {
        label: "Zoom Out",
        onPress: () => { },
      },
      {
        label: "Fullscreen",
        onPress: () => { },
      },
      {
        label: "Hide Toolbar",
        onPress: () => { },
      },
    ],
  },
  {
    label: "Help",
    childActions: [
      {
        label: "Documentation",
        onPress: () => { },
      },
      {
        label: "Keyboard Shortcuts",
        onPress: () => { },
      },
      {
        label: "About",
        onPress: () => { },
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
  transition: 0.5s cubic-bezier(0.61, 0.01, 0.03, 0.99) height 1s, 0.6s cubic-bezier(0.61, 0.01, 0.03, 0.99) scale;
  scale: 1;

  @starting-style {
    height: calc(100vh - 18px * 2);
    scale: 3;
  }
}

.actions {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 18px;
  flex: 1;
}

#os-logo-wrapper {
  height: 20px;
  margin-right: 0.8em;
  display: flex;
  justify-content: center;
  width: max-content;
  transition: 0.5s cubic-bezier(0.61, 0.01, 0.03, 0.99) all 0.5s;
  color: firebrick;

  @starting-style {
    width: calc(100vw - 18px * 4)
  }
}

#os-logo {
  height: 20px;
  scale: 1;
  transition: 0.5s cubic-bezier(0.61, 0.01, 0.03, 0.99) all 0.5s;

  @starting-style {
    scale: 10
  }
}

.action-bar-content {}
</style>
