<template>
  <div id="about-page" :class="{ 'loaded-home': loaded }">
    <header id="about-header">
      <div id="bit">
        <TresCanvas window-size v-bind="gl">
          <TresPerspectiveCamera :position="[0, 0, 2]" />
          <MouseParallax :factor="0.5" :ease="3" />
          <!-- <TresGridHelper :args="[100, 100]" /> -->
          <ScrollControls :distance="2" htmlScroll />
          <Shit
            :url="URLS[0]"
            :transparent="true"
            :position="[-1.5, 0, -1]"
            toneMapped="false"
          />
          <Shit
            :url="URLS[1]"
            :transparent="true"
            toneMapped="false"
            :scale="[1, 1.23463687151]"
          />
          <Shit :url="URLS[2]" :transparent="true" :position="[1.5, 0, -1]" />
          <!-- <TresAmbientLight :intensity="1" /> -->
        </TresCanvas>
      </div>
      <Navigation></Navigation>
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

import {
  NoToneMapping,
  LinearToneMapping,
  SRGBColorSpace,
  ReinhardToneMapping,
  AgXToneMapping,
  NoColorSpace,
  SrcColorFactor,
} from "three";
import { TresCanvas } from "@tresjs/core";
import { Image as Shit, OrbitControls } from "@tresjs/cientos";

const gl = {
  /*  clearColor: "#82DBC5",*/
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
  toneMappingExposure: 1,
  useLegacyLights: false,
};

const URL_STUB = "img/about/";

const URLS = [
  "IMG_0813.png",
  "IMG_9340.png",
  "IMG_9351.png",
  "IMG_9362.png",
  "IMG_9391.png",
].map((url) => URL_STUB + url);
</script>

<style scoped>
#about-page {
  background: #191925;

  header {
    background: #fff;
    position: relative;

    #header-title {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 0em 5em;
      padding-bottom: 20vh;
    }

    h1 {
      font-size: 10rem;
      line-height: 100%;
    }
  }
}
</style>

<style lang="scss" scoped>
@use "sass:map";

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

  #bit {
    position: fixed !important;
    top: 0;
    left: 0;
    z-index: 9;
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
