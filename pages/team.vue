<template>
  <div id="CSIT-OS">
    <OSActionBar />
    <OSWindowArea v-model:draggingCoords="draggingCoords">
      <OSWindow title="The Team" :tabs="theTeamTabs" v-model:current-tab="theTeamCurrentTab" id="team-terminal"
        v-model:activeWindow="activeWindow" :initial-coords="{
          x: '4vw',
          y: '10vh'
        }" style="
          min-width: 900px;
          min-height: 600px;
          width: 55vw;
          height: 60vh;
        ">
        <template v-if="theTeamCurrentTab === 0">
          <pre>
            {{ theTeamHeading }}
          </pre>
          <p>
            (Use your arrow keys or mouse)
          </p>
        </template>
      </OSWindow>

      <OSWindow v-show="showTeamMemberWindow" title="Team member:" v-model:current-tab="theTeamCurrentTab"
        id="team-terminal" v-model:activeWindow="activeWindow" :initial-coords="{
          x: '52vw',
          y: '25vh'
        }" style="
          min-width: 600px;
          min-height: 600px;
          width: 44vw;
          height: 70vh;

        ">
        <template v-if="theTeamCurrentTab === 0">
          <p>
            (Use your arrow keys or mouse)
          </p>
        </template>
      </OSWindow>
    </OSWindowArea>
    <div class="os-bg" @click="activeWindow = ''"></div>
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
const activeWindow = ref("The Team")
const draggingCoords = ref({
  x: 0,
  y: 0
})
const theTeamCurrentTab = ref(0)
const theTeamTabs = ref(["2025", "2024", "2023", "2022", "2021", "2020"])

const showTeamMemberWindow = ref(false)

onMounted(() => {
  setTimeout(() => {
    showTeamMemberWindow.value = true
  }, 300);
})
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
  z-index: 0;

  @starting-style {
    background-size: 200% 200%;
    filter: blur(50px);
  }
}
</style>
