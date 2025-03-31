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
        style="min-width: 900px; min-height: 600px; width: 55vw; height: 60vh"
      >
        <template v-if="theTeamCurrentTab === '2025'">
          <pre>
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
                @click="selectedMember = exec"
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
                @click="selectedMember = committeeMember"
                :name="committeeMember"
                :roles="members[committeeMember].years[theTeamCurrentTab]"
              />
            </template>
          </div>
        </div>
      </OSWindow>

      <OSWindow
        v-show="showTeamMemberWindow"
        title="Team member:"
        v-model:current-tab="theTeamCurrentTab"
        id="team-terminal"
        v-model:activeWindow="activeWindow"
        :initial-coords="{
          x: '52vw',
          y: '25vh',
        }"
        style="min-width: 600px; min-height: 600px; width: 44vw; height: 70vh"
        customContentWrapper
      >
        <div id="team-member-content-wrapper">
          <template v-if="selectedMember != ''">
            <div class="os-window-content">
              <p>
                {{ selectedMember }}
                ###############
                <br />
                <br />
                {{ members[selectedMember].years }}
                <br />
                <br />
              </p>
              <p>Bio:</p>
              <p>---------------------</p>
              <p>
                {{ members[selectedMember].bio }}
              </p>
            </div>
            <div class="os-window-content sidebar">
              <img :src="members[selectedMember].imageURL" alt="" />
            </div>
          </template>
        </div>
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
`;
const activeWindow = ref("The Team");
const draggingCoords = ref({
  x: 0,
  y: 0,
});
const theTeamCurrentTab = ref("2025");

const theTeamTabs = computed(() => {
  return Object.keys(yearToMembersMap.value).reverse();
});

const selectedMember = ref("");

const showTeamMemberWindow = ref(false);

onMounted(() => {
  setTimeout(() => {
    showTeamMemberWindow.value = true;
  }, 300);
});

interface Member {
  years: Record<string, string[]>;
  bio: string;
  links: { label: string; url: string }[];
  imageURL?: string;
}

interface YearToMembers {
  execs: string[];
  committee: string[];
}

const execRoles = [
  "President",
  "VP (Administration)",
  "VP (Operations)",
  "Treasurer",
  "Events Manager",
];

const members: Record<string, Member> = {
  "Some random cat": {
    years: {
      "1825": ["Emotional Support Intern"],
      "2025": ["Super Senior Emotional Support"],
      "2024": ["Senior Emotional Support"],
      "2023": ["Junior Emotional Support"],
      "2020": ["Junior Emotional Support"],
    },
    bio: "Oiiai, oiiai, oiiai, oii—, oii— Oiiai, oiiai, oiiai, oii—, oii— Oiiai, oiiai, oiiai, oii—, oii—",
    links: [
      {
        label: "LinkedIn",
        url: "#",
      },
      {
        label: "Instagram",
        url: "#",
      },
      {
        label: "X",
        url: "#",
      },
    ],
    imageURL: "",
  },
  "Some unknown guy": {
    years: {
      "1825": ["President", "Alledged Founder"],
    },
    bio: "Oiiai, oiiai, oiiai, oii—, oii— Oiiai, oiiai, oiiai, oii—, oii— Oiiai, oiiai, oiiai, oii—, oii—",
    links: [
      {
        label: "LinkedIn",
        url: "#",
      },
      {
        label: "Instagram",
        url: "#",
      },
      {
        label: "X",
        url: "#",
      },
    ],
    imageURL: "",
  },
};

const containsAny = (arr: string[], values: string[]): boolean => {
  return arr.some((item) => values.includes(item));
};

const getYearToMembersMap = (): Record<string, YearToMembers> => {
  const yearMap: Record<string, YearToMembers> = {};

  Object.entries(members).forEach(([name, data]) => {
    Object.entries(data.years).forEach(([year, roles]) => {
      // If the year doesn't exist yet create new year entry
      if (!yearMap[year]) {
        yearMap[year] = {
          execs: [],
          committee: [],
        };
      }

      // Filtering Execs and Committe
      if (containsAny(roles, execRoles)) {
        yearMap[year].execs.push(name);
      } else {
        yearMap[year].committee.push(name);
      }
    });
  });

  return yearMap;
};

const yearToMembersMap = ref<Record<string, YearToMembers>>({});

onMounted(() => {
  yearToMembersMap.value = getYearToMembersMap();
});
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

.catergorised-members {
  margin-top: 1em;
  gap: 3em;
  display: flex;

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

#team-member-content-wrapper {
  display: flex;
  flex: 1;
  gap: 10px;

  .sidebar {
    min-width: 42.5%;
    flex: 0;
    display: flex;
  }
}
</style>
