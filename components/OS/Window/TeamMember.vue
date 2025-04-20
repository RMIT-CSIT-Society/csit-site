<template>
  <OSWindow
    v-show="showTeamMemberWindow"
    title="Team member:"
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
      <template v-if="selectedMember != '' && members">
        <div class="os-window-content">
          <p class="team-heading">
            {{ selectedMember }}
            ###############
            <br />
            <br />
          </p>

          <div class="roles-wrapper">
            <p class="roles" v-for="(roles, year) in members[selectedMember].years">
              <p class="timeline-years">{{ year }}</p>
              <small>
                <template v-for="role in roles">{{`  ||-- ${role}\n`}} </template>
              </small>
               <small v-if="!theTeamTabs.includes((parseInt(year) + 1).toString())">
                {{`  []\n\n`}}
              </small>
            </p>
          </div>

          <p class="team-sub-heading">Bio:</p>
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
</template>

<script setup lang="ts">
defineProps<{
  showTeamMemberWindow: boolean;
  selectedMember: string;
}>()

const activeWindow = defineModel<string>("activeWindow", { required: true });

const { data: members } = await useFetch("/api/members");
const { theTeamTabs } = useYearToMembersMap(members);

</script>

<style scoped>
#team-member-content-wrapper {
  display: flex;
  flex: 1;
  gap: 10px;
  max-height: calc(100% - 56px - 10px);

  .sidebar {
    min-width: 42.5%;
    flex: 0;
    display: flex;

    img {
      height: 70%;
      object-fit: cover;
      width: 100%;
    }
  }

  .roles {
    margin-bottom: 0.5em;

    small {
      color: rgba(255, 255, 255, 0.6);
    }
  }

  .roles-wrapper {
    margin-bottom: 1em;
    white-space: pre;
  }

  .team-heading {
    font-weight: bold;
  }

  .team-sub-heading {
    border-bottom: 2px #fff dashed;
    padding-bottom: 0.5em;
    margin-bottom: 1em;
  }
}
</style>