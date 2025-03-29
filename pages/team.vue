<template>
  <div id="CSIT-OS">
    <OSActionBar />
    <OSWindowArea v-model:draggingCoords="draggingCoords">
      <OSWindow title="The Team" :tabs="theTeamTabs" v-model:current-tab="theTeamCurrentTab" id="team-terminal"
        :dragging-coords="draggingCoords">
        <template v-if="theTeamCurrentTab === 0">
          <pre>
            {{ theTeamHeading }}
          </pre>
          <p>
            (Use your arrow keys or mouse)
          </p>
        </template>
      </OSWindow>
    </OSWindowArea>
    <div class="os-bg"></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank",

  pageTransition: {
    name: "os",
    mode: "out-in",
  },
});

const theTeamHeading = `
████████╗██╗  ██╗███████╗    ████████╗███████╗ █████╗ ███╗   ███╗
╚══██╔══╝██║  ██║██╔════╝    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
   ██║   ███████║█████╗         ██║   █████╗  ███████║██╔████╔██║
   ██║   ██╔══██║██╔══╝         ██║   ██╔══╝  ██╔══██║██║╚██╔╝██║
   ██║   ██║  ██║███████╗       ██║   ███████╗██║  ██║██║ ╚═╝ ██║
   ╚═╝   ╚═╝  ╚═╝╚══════╝       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝
`
const draggingCoords = ref({
  x: 0,
  y: 0
})
const theTeamCurrentTab = ref(0)
const theTeamTabs = ref(["2025", "2024", "2023", "2022", "2021", "2020"])
</script>

<style scoped>
#CSIT-OS {
  height: 100vh;
  width: 100%;
  transition: 0.7s cubic-bezier(0.61, 0.01, 0.03, 0.99) all;
  filter: blur(0);
  display: flex;
  flex-direction: column;
  overflow: clip;

  @starting-style {
    filter: blur(50px);
  }
}

#team-terminal {
  transition: 0.5s cubic-bezier(0.61, 0.01, 0.03, 0.99) filter 1.2s, 0.6s cubic-bezier(0.61, 0.01, 0.03, 0.99) scale 1.2s, 0.1s cubic-bezier(0.61, 0.01, 0.03, 0.99) transform-origin 2s;
  scale: 1;
  transform-origin: 0 0;

  @starting-style {
    filter: blur(50px);
    scale: 0.8;
    transform-origin: 50% 50%;
  }
}

.os-bg {
  height: 100vh;
  width: 100%;
  background: url("img/os-bg.png");
  background-size: 100% 100%;
  transition: 1.5s cubic-bezier(0.61, 0.01, 0.03, 0.99) all 0.9s;
  background-position: center;
  filter: blur(0);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  @starting-style {
    background-size: 200% 200%;
    filter: blur(50px);
  }
}
</style>
