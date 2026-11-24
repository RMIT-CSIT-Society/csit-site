<template>
  <div id="about-page" :class="{ 'loaded-home': loaded }">
    <Navigation></Navigation>
    <header id="about-header">
      <div id="bit">
        <SectionAboutHeader />
      </div>
      <div id="header-title">
        <h1>About</h1>
        <h1 id="csit-highlight">
          <img src="/public/img/csit-logo.png" id="csit-logo"></img>
          <div class="highlight"></div>
        </h1>
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

<style lang="scss" scoped>
@use "sass:map";

@keyframes bar-grow {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}



#about-page {
  header {
    background: #ffffff;
    position: relative;
    z-index: -1;
    height: 130vh;
    width: 100vw;
    overflow-x: clip;
    z-index: -1;
  }
}
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
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
#csit-logo {
  width: 1.99em;
  height: fit-content;
  display: block;
  animation: fade-in 1s ease-out 0.3s both;
}

#csit-highlight {
  position: relative;
  isolation: isolate;
  width: fit-content;

  .highlight { //empty div
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;

    &::after {
      content: "";
      display: block;
      background: rgb(202, 38, 38);
      width: 100%;
      height: 100%;
      transform-origin: left;
      animation: bar-grow 1.2s cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s both;
    }
  }
}

header {
  min-height: 110vh;
  position: relative;
  padding: 0;
  width: 100%;
  overflow-x: clip;

  @media (max-aspect-ratio: 2040/1342) {
    display: flex;
    max-height: 120vmin;
  }

  &::before {
    height: 100vh;
    width: 100vw;
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
    padding-bottom: 20vh;
    z-index: 99;
    position: relative;

    @media screen and (max-width: map.get($breakpoint, "medium")) {
      padding: 4em 2em;

      padding-bottom: 12vh;
    }
  }

  h1 {
    font-size: 10rem;
    line-height: 100%;
    margin: 0;

    @media screen and (max-width: map.get($breakpoint, "medium")) {
      font-size: 25vw;
    }
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
