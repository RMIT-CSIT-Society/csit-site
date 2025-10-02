<template>
  <div id="CSIT-OS">
    <OSActionBar />
    <OSWindowArea v-model:draggingCoords="draggingCoords">
      <OSWindow
        title="The Team"
        :tabs="theTeamTabs"
        v-model:current-tab="theTeamCurrentTab"
        id="team-terminal"
        v-model:activeWindow="activeWindow"
        :initial-coords="{
          x: '4vw',
          y: '10vh',
        }"
        style="min-width: 900px; min-height: 500px; width: 55vw; height: 65vh"
        v-if="members"
      >
        <template v-if="theTeamCurrentTab === '2025'">
          <pre id="the-team-heading">
            {{ theTeamHeading }}
          </pre>
          <p>(Use your arrow keys or mouse)</p>
        </template>

        <div
          class="catergorised-members"
          v-if="yearToMembersMap[theTeamCurrentTab]"
        >
          <div>
            <p>
              EXECS<br />
              -----
            </p>
            <template v-for="exec in yearToMembersMap[theTeamCurrentTab].execs">
              <OSTeamMemberButton
                @click="focusOnMember(exec)"
                :name="exec"
                :roles="members[exec].years[theTeamCurrentTab]"
              />
            </template>
          </div>

          <div>
            <p>
              COMMITTEE<br />
              ---------
            </p>
            <template
              v-for="committeeMember in yearToMembersMap[theTeamCurrentTab]
                .committee"
            >
              <OSTeamMemberButton
                @click="focusOnMember(committeeMember)"
                :name="committeeMember"
                :roles="members[committeeMember].years[theTeamCurrentTab]"
              />
            </template>
          </div>
        </div>
      </OSWindow>

      <OSWindowTeamMember
        :showTeamMemberWindow="showTeamMemberWindow"
        :selectedMember="selectedMember"
        v-model:activeWindow="activeWindow"
      />
    </OSWindowArea>
    <div class="os-bg" @click="activeWindow = ''"></div>
  </div>
</template>

<script setup lang="ts">
const { data: members } = await useFetch("/api/members");

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
`;
const activeWindow = ref("The Team");
const draggingCoords = ref({
  x: 0,
  y: 0,
});
const theTeamCurrentTab = ref("2025");

const selectedMember = ref("");

const showTeamMemberWindow = ref(false);

onMounted(() => {
  setTimeout(() => {
    showTeamMemberWindow.value = true;
  }, 100);
});

const focusOnMember = (member: string) => {
  selectedMember.value = member;
  nextTick(() => {
    setTimeout(() => {
      activeWindow.value = "Team member:";
    });
  });
};

const { yearToMembersMap, theTeamTabs } = useYearToMembersMap(members);
</script>

<style scoped lang="scss">
@use "sass:map";

#CSIT-OS {
  height: 100dvh;
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

.catergorised-members {
  margin-top: 1em;
  gap: 3em;
  display: flex;

  @media screen and (max-width: map.get($breakpoint, "medium")) {
    gap: 1em;
  }

  > div {
    flex: 1;

    > p {
      font-weight: 700;
      margin-bottom: 0.5em;
    }
  }

  small {
    opacity: 0.6;
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

#the-team-heading {
  @media screen and (max-width: map.get($breakpoint, "medium")) {
    font-size: 0.35em;
    line-height: 100%;
  }
}
</style>
