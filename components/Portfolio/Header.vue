<template>
  <div class="back-button pseudo-button" @click="goBack">
    <span class="material-symbols-outlined size-40">arrow_back</span>
  </div>

  <header>
    <slot></slot>
    <nuxt-img
      :src="img"
      @load="loadedIMG()"
      :class="{ loaded: loaded }"
    ></nuxt-img>
  </header>

  <section class="header-details">
    <Container class="fluid">
      <Row>
        <Cell class="large-10">
          <div class="text-info">
            <h1 lang="en" :class="{ loaded: loaded }">{{ name }}</h1>
            <div class="caption" :class="{ loaded: loaded }">
              <p class="h5">{{ caption }}</p>
            </div>
          </div>
        </Cell>
        <Cell class="large-2">
          <div class="timespan" :class="{ loaded: loaded }">
            <div class="timespan-date-row from">
              <div class="diamond"></div>
              <span>{{ timeline.start }}</span>
            </div>
            <div class="timespan-date-row to">
              <div class="diamond"></div>
              <span>{{ timeline.end || "Present" }}</span>
            </div>
          </div>
        </Cell>
      </Row>
    </Container>
  </section>
</template>

<script setup lang="ts">
//import { Container } from '#build/components';
import { ref } from "vue";
const router = useRouter();

const goBack = () => {
  router.back();
};

defineProps<{
  name: string;
  timeline: {
    start: string;
    end: string;
  };
  img: string;
  caption?: string;
}>();

const loaded = ref(false);

function loadedIMG() {
  console.log("img loaded");
  setTimeout(() => {
    loaded.value = true;
  }, 0);
}
</script>

<style lang="scss" scoped>
@use "sass:map";

$padding: 1.75em * 2;
$title-font-size: 4.209rem;
$elements-in: all 0.75s cubic-bezier(0.59, 0.01, 0.1, 0.99);

.back-button {
  background: #e8effa;
  height: 60px;
  width: 60px;
  position: fixed;
  left: calc(3.5em + 1em);
  top: calc(3.5em + 1em);
  z-index: 999;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  animation-name: headerButtonScrollAnimation;
  animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99);
  animation-duration: 1ms;
  animation-timeline: --scrollTimeline;
  animation-range: contain 50% contain 100%;

  &:hover {
    background: #d9e4f6;
  }

  @media screen and (max-width: map.get($breakpoint, "medium")) {
    left: calc(2em + 30px + 15px);
    top: 2em;
    animation-name: none;
    border-radius: 0 100% 100% 0;

    .size-40 {
      font-size: 24px;
    }

    &::before {
      content: "";
      left: 0;
      top: 0;
      height: 60px;
      width: 15px;
      translate: -15px 0;
      position: absolute;
      background: #e8effa;
      z-index: -1;
    }

    &:hover {
      background: #e8effa;
    }

    &:active {
      background: #d9e4f6;

      &::before {
        background: #d9e4f6;
      }
    }
  }

  // medium and up
  @media screen and (min-width: map.get($breakpoint, "medium")) {
    z-index: 99;
  }
}

// Timespan:
.timespan-date-row {
  display: flex;
  align-items: center;
  gap: 1em;

  @media screen and (max-width: map.get($breakpoint, "medium")) {
    margin-bottom: 0.7em;
  }
}

.diamond {
  height: 18px;
  width: 18px;
  background: #f7af65;
  transform: rotate(45deg);
}

.from:after {
  content: "";
  height: 1.2em;
  width: 2px;
  background: #f7af65;
  position: absolute;
  left: 7.5px;
  top: 22px;
}

header {
  width: calc(100% - $padding * 2);
  position: relative;
  padding: $padding $padding $padding - 0.5em;
  //background: aquamarine;
  //transform: translateX(calc(-275px - 3.5em * 2 + $padding));
  //height: 100vh;
  //margin-bottom: -25vh;

  // scroll timeline shit
  animation-name: headerScrollAnimation;
  animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99);
  animation-duration: 1ms;
  animation-timeline: --scrollTimeline;
  animation-range: contain 0% contain 100%;

  @media screen and (max-width: map.get($breakpoint, "medium")) {
    $padding: 1.5em;
    width: calc(100% - $padding * 2);
    padding: $padding $padding $padding - 0.5em;
  }

  img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    border-radius: 2.4em;
    view-transition-name: selected-project;

    transition: filter 0.75s cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s,
      scale 0.9s cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s,
      height 0.75s cubic-bezier(0.59, 0.01, 0.1, 0.99) 0.75s;
    filter: blur(320px);
    scale: 1.75;

    &.loaded {
      filter: blur(0px);
      scale: 1;
      height: calc(100vh - $title-font-size * 3 - $padding);
    }
  }
}

@keyframes headerScrollAnimation {
  0% {
    scale: 1;
    translate: 0 0;
  }

  50% {
    scale: 1.2;
    translate: 0 -200px;
  }

  100% {
    scale: 1.2;
    translate: 0 -200px;
  }
}

@keyframes headerButtonScrollAnimation {
  0% {
    translate: 0 0;
  }

  50% {
    translate: 0 -2em;
  }

  100% {
    translate: 0 -2em;
  }
}

@keyframes headerButtonScrollAnimationMobile {
  0% {
    translate: 0 0;
  }

  50% {
    translate: -1.5em -1.5em;
  }

  100% {
    translate: -1.5em -1.5em;
  }
}

.header-details {
  //width: 100%;
  padding: 0 $padding * 1.5;
  margin-bottom: 15vh;

  @media screen and (max-width: map.get($breakpoint, "medium")) {
    $padding: 1.5em;
    padding: 0 $padding * 1.5;
  }

  .timeline {
    transform: translateY(4em);
    transition: $elements-in 0.6s;
  }
}

.text-info {
  max-width: 690px;

  .caption {
    margin: 3.5em 0 1.5em;
    padding: 0.38rem 0;
    position: relative;
    transform: translateY(4em);
    transition: $elements-in 0.85s;

    &:before {
      content: "";
      background: #f5aceb;
      width: 0.75em;
      height: 100%;
      position: absolute;
      border-radius: 0.75em;
    }

    p {
      padding-left: 1.75em;
    }
  }
}

h1 {
  transform: translateY(4em);
  transition: $elements-in 0.9s;
  //padding-top: 0.75em;
  opacity: 0;
  hyphens: auto;
}

.timespan {
  transform: translateY(4em);
  transition: $elements-in 0.8s;
  margin-top: 0.75em;
  opacity: 0;
}

h1,
.text-info .caption,
.timespan {
  &.loaded {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
