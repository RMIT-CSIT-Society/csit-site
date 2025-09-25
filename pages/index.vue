<template>
  <div id="index-page" :class="{ 'loaded-home': loaded }">
    <header id="home-header">
      <div id="bit">
        <TresCanvas preset="realistic" window-size>
          <!-- [0, 20, 100] -->
          <TresPerspectiveCamera :position="[0, 10, 100]" />
          <!-- <OrbitControls :enable-pan="false" :enableZoom="false" /> -->
          <MouseParallax :factor="5" :ease="3" />
          <!-- <TresGridHelper :args="[100, 100]" /> -->
          <ScrollControls v-model="progress" :distance="45" htmlScroll />
          <Suspense>
            <ModelBit />
          </Suspense>
          <Stars :radius="30" />
          <TresAmbientLight :intensity="1" />
        </TresCanvas>
      </div>
      <Navigation></Navigation>
      <Grid>
        <div class="extra-negative-space hoz top">
          <div v-for="n in 9 * 9" :class="'null'"></div>
        </div>
        <div class="extra-negative-space vert left">
          <div v-for="n in 5 * 5" :class="'null'"></div>
        </div>
        <div class="extra-negative-space vert right">
          <div v-for="n in 5 * 5" :class="'null'"></div>
        </div>
        <div class="extra-negative-space hoz bottom">
          <div v-for="n in 9 * 9" class="null"></div>
        </div>

        <div v-for="n in 9" :class="['logo-part-' + n, 'logo-part']"></div>
        <div v-for="n in 27" :class="'null null-part-' + (n - 1)"></div>
      </Grid>
    </header>
    <section id="intro">
      <Container>
        <Grid>
          <Cell class="large-3" id="top-left"> </Cell>
          <Cell class="large-6" id="intro-text">
            <h2 class="h5">
              A student-run club at RMIT University committed to engaging
              students with academic and social events that further their
              professional development.
            </h2>

            <div id="key-notes">
              <div id="key-note">
                <h6>🤵‍♀️ Industry Panels</h6>
                <p>
                  Expert panel discussions that delve into the realities of
                  working in the tech industry.
                </p>
              </div>
              <div id="key-note">
                <h6>🎓 Network</h6>
                <p>
                  Networking and celebratory social events to make new friends
                  and meet future employers.
                </p>
              </div>
              <div id="key-note">
                <h6>🤖 Workshops</h6>
                <p>
                  Hands-on workshops with emerging software and hardware such as
                  VR and robotics.
                </p>
              </div>
            </div>

            <NuxtLink class="button" to="/about">More about us</NuxtLink>
          </Cell>
          <Cell class="large-12" id="bottom-sprites">
            <div id="lights"></div>
            <div id="shapes"></div>
            <div id="games-night"></div>
            <div id="blur"></div>
          </Cell>
        </Grid>
      </Container>
    </section>
    <section id="events-section">
      <Container>
        <Grid>
          <Cell class="large-4" id="events-section-heading">
            <h2 class="h1">
              What's <br />going on <span class="text-cursor">.</span>
            </h2>

            <p class="h6">Check out what events we have coming up!</p>
          </Cell>
          <Cell class="large-5" id="events-section-heading-bit">
            <NuxtImg src="/img/pixelated-bit.png" />
          </Cell>
        </Grid>
      </Container>

      <Container id="events">
        <Grid>
          <CardEvent
            v-for="clubEvent in clubEvents"
            :clubEvent="clubEvent"
          ></CardEvent>
        </Grid>
      </Container>

      <Container id="events">
        <Grid>
          <Cell class="large-4"></Cell>
          <Cell class="large-5" id="join-discord">
            <h3 class="h5">
              <i class="fa-brands fa-discord"></i>
              Join our Discord
            </h3>
            <NuxtLink
              class="button-outline"
              to="https://discord.csitsociety.club/"
              >Join
              <span class="material-symbols-outlined">arrow_outward</span>
            </NuxtLink>
          </Cell>
        </Grid>
      </Container>

      <div id="grid-bg">
        <Grid>
          <div class="extra-negative-space hoz top">
            <div v-for="n in 9" :class="'null'"></div>
          </div>
          <div class="extra-negative-space vert left">
            <div v-for="n in 5 * 5" :class="'null'"></div>
          </div>
          <div class="extra-negative-space vert right">
            <div v-for="n in 5 * 5" :class="'null'"></div>
          </div>
          <div class="extra-negative-space hoz bottom">
            <div v-for="n in 9 * 9" class="null"></div>
          </div>

          <div v-for="n in 9 * 6" :class="'null'"></div>
        </Grid>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const bio = ref("TBD");

useHead({
  title: "RMIT CSIT",
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

const progress = ref(0);

const { data: clubEvents } = await useFetch("/api/events");
</script>

<style lang="scss">
@use "sass:map";

* {
  box-sizing: border-box;
}

/* #works {
  display: flex;
  padding-bottom: 10em;

  .grid {
    padding-bottom: 10em;
    grid-template-columns: 1fr 1fr;
    transition: filter 0.75s cubic-bezier(0.64, 0.01, 0.16, 0.99);

    @media screen and (max-width: map.get($breakpoint, "medium")) {
      grid-template-columns: 1fr;
    }

    &.pending {
      filter: blur(400px);
    }
  }
} */

.button-row-works-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 4em;
  top: calc(100dvh - 80px - 1em);
  position: sticky;
  z-index: 9999;
  transition: all 0.15s cubic-bezier(0.64, 0.01, 0.16, 0.99);
}

.button-row-works {
  display: flex;
  gap: 0.45em;
  background: #de9797;
  flex-shrink: 1;
  padding: 0.5em;
  border-radius: 1.2em;
}

.button-row {
  display: flex;
  gap: 10px;
}

.button-outline {
  text-decoration: none;
  gap: 0.85em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  color: #d99090;
  border: solid 2px;
  padding: 0.75em 1em;

  span {
    display: flex;
    align-items: center;
    gap: 0.85em;
  }

  &:hover {
    background: rgba(105, 133, 179, 0.247);
  }
}

.button,
.pill-toggle {
  padding: 0.75em 1em;
  border: 0;
  background: #d99090;
  color: #b22222;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    background: #f1b5b5;
  }
}
</style>

<style lang="scss" scoped>
@use "sass:map";

#bit {
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 9;
  pointer-events: none;
  width: 100%;
  height: 100dvh;
  mix-blend-mode: luminosity;
  opacity: 0.75;

  * {
    pointer-events: none !important;
  }
}

#join-discord {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: invert(0) blur(12px);
  margin: 10vh 1.5em 0;
  transition: 0.25s cubic-bezier(0.93, 0.02, 0.69, 0.99) all;
  scale: 1;
  transform: translateZ(0);
  backface-visibility: hidden;
  pointer-events: auto;
  padding: 20px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  translate: 0 100%;

  animation-name: join-discord;
  animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99);
  animation-fill-mode: both;
  animation-duration: 1ms;
  view-timeline-name: --join-discord;
  animation-timeline: --join-discord;
  animation-range: cover 0% contain 50%;

  @media screen and (max-width: map.get($breakpoint, "medium")) {
    flex-direction: column;
    text-align: center;
    margin: 10vh 1.5em 10vh;
    padding-bottom: 4.5em;
  }

  .fa-discord {
    margin-right: 0.5em;
  }
}

section {
  z-index: 10;
  position: relative;

  &#intro {
    padding: 2em;
    margin-top: 2em;
    padding-bottom: 0;

    @media screen and (max-width: map.get($breakpoint, "medium")) {
      padding: 1em;
    }

    > div {
      background: firebrick;
    }
  }

  .grid-container {
    max-width: 2048px;

    > .grid {
      gap: 0;
      grid-template-columns: repeat(9, 1fr);
    }
  }
}

@keyframes blinking-cursor {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes image-parallax {
  from {
    background-position: 50% 50%;
  }
  to {
    background-position: 50% calc(50% + 20vh);
  }
}

@keyframes floating-bit-guy {
  from {
    translate: -20% calc(-50% - 50vh);
    rotate: 30deg;
  }
  to {
    translate: 0 0;
    rotate: 0;
  }
}

@keyframes join-discord {
  from {
    translate: 0 100%;
  }
  to {
    translate: 0 0;
  }
}

@keyframes footer-grid {
  from {
    translate: 0 100%;
    background-size: 200%;
  }
  to {
    background-size: 150%;
    translate: 0 0;
  }
}

.text-cursor {
  background: #d9d9d9;
  color: #d9d9d9;
  width: 0.6em;
  display: inline-block;
  border-radius: 0.08em;
  animation: blinking-cursor 1.25s infinite;
  animation-timing-function: cubic-bezier(0.31, 0.02, 0, 0.98);
}

#intro {
  color: #fff;
  position: relative;
  z-index: 13;

  #top-left {
    background: url("~/assets/img/about-us-top-left.jpg");
    min-height: 80lvh;
    background-repeat: no-repeat;
    background-size: auto calc(100% + 20vh);
    background-position: center;

    animation-name: image-parallax;
    animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99);
    animation-duration: 1ms;
    animation-timeline: --scrollTimeline;
    animation-range: contain 0% contain 100%;

    @media screen and (max-width: map.get($breakpoint, "medium")) {
      min-height: 50lvh;
    }
  }

  #intro-text {
    padding: 3.5em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    h2 {
      margin-top: 0;
      max-width: 960px;
      margin-right: 2em;
    }

    @media screen and (max-width: map.get($breakpoint, "medium")) {
      padding: 2em;
      padding-bottom: 10vh;

      h2 {
        margin-right: 0.5em;
      }
    }
  }

  #key-notes {
    display: flex;
    gap: 3em;
    margin-bottom: 2rem;

    @media screen and (max-width: map.get($breakpoint, "medium")) {
      flex-direction: column;
      gap: 1em;
    }

    p {
      font-size: 0.9em;
    }
  }
}

#index-page {
  position: relative;
  width: 100%;
}

#bottom-sprites {
  gap: 0;
  grid-template-areas:
    "c1 c1 c2 c2 c2 c3 c3 c3 c3"
    "c1 c1 c4 c4 c4 c3 c3 c3 c3"
    "c5 c5 c4 c4 c4 c3 c3 c3 c3";
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(9, 1fr);
  aspect-ratio: 9 / 3;
  width: 100%;
  display: grid;

  > * {
    background-size: cover !important;
  }

  #lights {
    grid-area: c1;
    background: url("~/assets/img/lights.png");
  }

  #shapes {
    grid-area: c2;
    background: url("~/assets/img/intro-geo.svg");
  }

  #games-night {
    grid-area: c3;
    background: url("~/assets/img/csit-switch-hackathon.jpg");
    background-position: center;
    animation-name: image-parallax;
    animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99);
    animation-duration: 1ms;
    animation-timeline: --scrollTimeline;
    animation-range: contain 0% contain 100%;
  }

  #blur {
    grid-area: c4;
    background: url("~/assets/img/blur_lol.jpg");
    background-position: center;
  }
}

.null {
  z-index: 2;
  border: 1px solid #ffeaea;
  transition: all 0.75s cubic-bezier(0.075, 0.82, 0.165, 1);
  outline: #ffeaea 0px solid;
  outline-offset: 0;

  &:hover {
    //background: rgba(178, 34, 34, 0.136);
    outline-width: 3em;
    outline-offset: -2em;
    outline-offset: #ffeaea;
  }
}

#events-section {
  background: #191925;
  min-height: 120lvh;
  outline: 10em #191925 solid;
  position: relative;
  z-index: 11;
  overflow: clip;
  padding: 20vh 2em 0;
  color: #fff;

  .grid-container {
    pointer-events: none;
  }

  #grid-bg {
    padding-top: 2em;
  }
}

#events {
  margin-top: 5em;
}

#events-section-heading {
  padding-left: 1em;

  h2 {
    line-height: 100%;
  }
}

#events-section-heading-bit {
  display: flex;
  justify-content: flex-end;
  translate: 0 0;

  animation-name: floating-bit-guy;
  animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99);
  animation-duration: 1ms;
  animation-timeline: --scrollTimeline;
  animation-range: contain 0% contain 75%;

  img {
    height: 17em;
    scale: 2;
    translate: -75% 0;

    @media screen and (max-width: map.get($breakpoint, "medium")) {
      translate: 30% 40%;
      scale: 1.8;
    }
  }
}

header {
  min-height: 110vh;
  position: relative;
  padding: 0;
  width: 100%;
  padding: 2em;
  overflow-x: clip;

  @media (max-aspect-ratio: 2040/1342) {
    display: flex;
    max-height: calc(100dvh);
    min-height: 100dvh;
  }

  .grid {
    gap: 0;
    // CSIT LOGO - every c cell is part of the logo
    grid-template-areas:
      "c1 c1 c1 c1 c1 c5 c7 c7 c7"
      "c2 n0 n1 c4 n8 n9 n10 c8 n14"
      "c2 n2 n3 c4 c9 c6 n11 c8 n15"
      "c2 n4 n5 n6 n7 c6 n12 c8 n16"
      "c2 c3 c3 c3 c3 c6 n13 c8 n17"
      "n18 n19 n20 n21 n22 n23 n24 n25 n26";
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(9, 1fr);
    aspect-ratio: 9 / 6;
    max-height: calc(105vh - 2.5em);
    margin: auto;
    position: relative;

    @media (max-aspect-ratio: 2040/1342) {
      height: 100%;
      flex-grow: 1;
      grid-template-rows: repeat(5, 1fr);
      aspect-ratio: 9 / 5;
    }

    /* @media (min-aspect-ratio: 2150/1342) {
      margin: auto;
    } */

    .logo-part {
      position: relative;
      overflow: clip;

      &::before {
        content: "";
        background: rgba(178, 34, 34, 0);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;

        .loaded-home & {
          background: firebrick;
        }
      }

      &::after {
        outline-color: firebrick;
        outline-offset: -3dvh;
        outline-width: 0dvh;
        outline-style: solid;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;

        .loaded-home & {
          outline-offset: -12dvh;
          outline-width: 12dvh;
        }
      }
    }

    @for $i from 0 through 9 {
      > .logo-part-#{$i} {
        grid-area: c#{$i};

        &::before {
          transition: 0.15s cubic-bezier(0.48, 0.02, 0.06, 1) background;
          transition-delay: 100ms * $i + 800ms;
        }

        &::after {
          transition: 0.75s cubic-bezier(0.48, 0.02, 0.06, 1) outline-width,
            0.45s cubic-bezier(0.48, 0.02, 0.06, 1) outline-offset;
          transition-delay: 100ms * $i + 100ms;
        }
      }
    }

    // i of the CSIT
    @for $i from 0 through 27 {
      > .null-part-#{$i} {
        grid-area: n#{$i};
      }
    }

    @media (max-aspect-ratio: 2040/1342) {
      @for $i from 18 through 27 {
        > .null-part-#{$i} {
          display: none;
        }
      }
    }

    .extra-negative-space {
      z-index: 2;
      position: absolute;
      display: grid;

      &.vert {
        height: 100%;
        top: 0;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(6, 1fr);
        aspect-ratio: 5 / 6;

        @media (max-aspect-ratio: 2040/1342) {
          flex-grow: 1;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(5, 1fr);
          aspect-ratio: 5 / 5;
        }
      }

      &.hoz {
        width: 100%;
        left: 0;

        grid-template-rows: repeat(9, 1fr);
        grid-template-columns: repeat(9, 1fr);
        aspect-ratio: 9 / 9;
      }

      &.top {
        top: 0;
        translate: 0 -100%;
      }

      &.bottom {
        bottom: 0;
        translate: 0 100%;

        @media (min-aspect-ratio: 2040/1342) {
          height: 5em;
          translate: 0 5em;
          aspect-ratio: 9 / 1;
          grid-template-rows: repeat(1, 1fr);

          .null:nth-child(n + 10) {
            display: none;
          }

          .null:nth-child(2n) {
            opacity: 0;
          }
        }
      }

      &.left {
        left: 0;
        translate: -100% 0;
      }

      &.right {
        right: 0;
        translate: 100% 0;
      }
    }

    .logo-part-5,
    .logo-part-6 {
      opacity: 0.5;
    }
  }

  @media screen and (max-width: map.get($breakpoint, "medium")) {
    ///
  }

  @media screen and (min-width: map.get($breakpoint, "large")) {
    //padding-left: 0 2.25em;
  }
}

#grid-bg {
  min-height: 110vh;
  position: absolute;
  padding: 0;
  width: 100%;
  opacity: 0.5;
  mix-blend-mode: soft-light;
  top: 7em;
  left: 0;
  z-index: -1;

  @media (max-aspect-ratio: 2040/1342) {
    display: flex;
    max-height: calc(100dvh);
    min-height: 100dvh;
  }

  .grid {
    gap: 0;
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(9, 1fr);
    aspect-ratio: 9 / 6;
    max-height: calc(105vh - 2.5em);
    margin: 0 auto;
    position: relative;

    @media (max-aspect-ratio: 2040/1342) {
      height: 100%;
      flex-grow: 1;
      grid-template-rows: repeat(5, 1fr);
      aspect-ratio: 9 / 5;
    }

    .extra-negative-space {
      z-index: 2;
      position: absolute;
      display: grid;

      &.vert {
        height: 100%;
        top: 0;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(6, 1fr);
        aspect-ratio: 5 / 6;

        @media (max-aspect-ratio: 2040/1342) {
          flex-grow: 1;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(5, 1fr);
          aspect-ratio: 5 / 5;
        }
      }

      &.hoz {
        width: 100%;
        left: 0;

        grid-template-rows: repeat(9, 1fr);
        grid-template-columns: repeat(9, 1fr);
        aspect-ratio: 9 / 9;
      }

      &.top {
        top: 0;
        translate: 0 -100%;
        height: 5em;
        aspect-ratio: 9 / 1;
        grid-template-rows: repeat(1, 1fr);

        .null:nth-child(n + 10) {
          display: none;
        }

        .null:nth-child(2n) {
          opacity: 0;
        }
      }

      &.bottom {
        bottom: 0;
        translate: 0 100%;
      }

      &.left {
        left: 0;
        translate: -100% 0;
      }

      &.right {
        right: 0;
        translate: 100% 0;
      }
    }

    .logo-part-5,
    .logo-part-6 {
      opacity: 0.5;
    }
  }

  @media screen and (max-width: map.get($breakpoint, "medium")) {
    ///
  }

  @media screen and (min-width: map.get($breakpoint, "large")) {
    //padding-left: 0 2.25em;
  }
}
</style>
