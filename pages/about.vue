<template>
  <div id="about-page" :class="{ 'loaded-home': loaded }">
    <Navigation></Navigation>
    <header id="about-header">
      <div id="bit">
        <SectionAboutHeader />
      </div>
      <div id="header-title">
        <h1>What are <br />we?</h1>
      </div>
    </header>

    <SectionAboutIntro />
    <SectionAboutCollabs />
    <SectionAboutFinalStatement />
  </div>
</template>

<script setup lang="ts">
const bio = ref("TBD");

useHead({
  title: "RMIT CSIT | About Us",
  meta: [
    {
      name: "description",
      content: bio,
    },
  ],
});

const loaded = ref(false);
onMounted(() => {
  loaded.value = true;
});
</script>

<style scoped>
#about-page {
  header {
    background: #fff;
    position: relative;
    z-index: -1;
    height: 130vh;
  }
}
</style>

<style lang="scss" scoped>
@use "sass:map";

@keyframes about-bg {
  from {
    //translate: 0 100vh;
    background: transparent;
  }
  to {
    //translate: 0 0;
    background: #191925;
    backdrop-filter: blur(50px);
  }
}

#index-page {
  position: relative;
  width: 100%;
}

header {
  min-height: 110vh;
  position: relative;
  padding: 0;
  width: 100%;
  overflow-x: clip;

  @media (max-aspect-ratio: 2040/1342) {
    display: flex;
    max-height: calc(100dvh);
    min-height: 100dvh;
  }

  &::before {
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    content: "";
    background: #191925;
    position: fixed;

    animation-name: about-bg;
    /* animation-timing-function: cubic-bezier(0.65, 0.44, 0, 0.98); */
    animation-duration: 1ms;
    animation-timeline: --scrollTimeline;
    animation-range: cover 0% contain 40%;
  }

  #header-title {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0em 5em;
    padding-bottom: 25vh;
    z-index: 99;
    position: relative;
  }

  h1 {
    font-size: 10rem;
    line-height: 100%;
  }

  #bit {
    position: fixed !important;
    top: 0;
    left: 0;
    z-index: -1;
    pointer-events: none;
    width: 100%;
    height: 100dvh;
    /* mix-blend-mode: luminosity; */
    /*  opacity: 0.75; */

    * {
      pointer-events: none !important;
    }
  }
}
</style>
