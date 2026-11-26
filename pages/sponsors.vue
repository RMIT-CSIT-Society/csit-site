<template>
  <div id="index-page" :class="{ 'loaded-home': loaded }">
    <header id="home-header">
      <div id="bit">
        <TresCanvas preset="realistic" window-size>
          <TresPerspectiveCamera :position="[0, 10, 110]" />
          <MouseParallax :factor="5" :ease="3" />
          <ScrollControls v-model="progress" :distance="45" htmlScroll />
          <Stars :radius="50" />
          <TresAmbientLight :intensity="1" />
        </TresCanvas>
      </div>
      <Grid>
        <div class="extra-negative-space vert left">
          <div v-for="n in 5 * 3" class="null"></div>
        </div>
        <div class="extra-negative-space vert right">
          <div v-for="n in 5 * 3" class="null"></div>
        </div>
        
        <div v-for="n in 9 * 3" class="null"></div>
        <div id="header-title" style="position: absolute; z-index: 4;  inset: 0 0 calc(100% / 4) 0; display: flex; align-items: flex-end; pointer-events: none;">
          <h1>Sponsors</h1>
        </div>
        
      </Grid>
      <div>
        <div style=" position: absolute; display: flex; inset: calc(100% / 1.45) 0 0 0">
          <Navigation disableTopOffset></Navigation>
        </div>
      </div>
    </header>

    <div id="gradient-spacer"></div>

    <section id="events-section">
      <Container>
        <Grid>
          <Cell class="large-5" id="events-section-heading">
            <h4 class="h2" id="sponsor-heading"></h4>
          </Cell>
        </Grid>
      </Container>

      <Container id="sponsors-segment">
        <Grid id="sponsor-list" style="display:flex; flex-direction:column">
          <div v-if="diamondSponsors.length > 0">
            <Cell class="large-5 sponsor-group" style="align-self: center; background-color: #6a8fa0; --tier-color: #1a2a32;">
              <div>
                <h3 class="h5" style="margin: 0;">
                  Diamond Sponsors
                </h3>
                <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
                  <img class="sponsor-logo" v-for="sponsor in diamondSponsors" :src="sponsor.logo" :alt="sponsor.name" />
                </div>
              </div>
            </Cell>
          </div>

          <div v-if="goldSponsors.length > 0">
            <Cell class="large-5 sponsor-group" style="align-self: center;  background-color: #9e8752; --tier-color: #2e2716;">
              <div>
                <h3 class="h5" style="margin: 0;">
                  Gold Sponsors
                </h3>
                <div style="display: flex; flex-direction: row;flex-wrap: wrap;">
                  <img class="sponsor-logo" v-for="sponsor in goldSponsors" :src="sponsor.logo" :alt="sponsor.name" />
                </div>
              </div>
            </Cell>
          </div>

          <div v-if="silverSponsors.length > 0">
            <Cell class="large-5 sponsor-group" style="align-self: center; background-color: #787c89; --tier-color: #22242a; " >
              <div>
                <h3 class="h5" style="margin: 0;">
                  Silver Sponsors
                </h3>
                <div style="display: flex; flex-direction: row;flex-wrap: wrap;">
                  <img class="sponsor-logo" v-for="sponsor in silverSponsors" :src="sponsor.logo" :alt="sponsor.name" />
                </div>
              </div>
            </Cell>
          </div>

          <div v-if="bronzeSponsors.length > 0">
            <Cell class="large-5 sponsor-group" style="align-self: center;  background-color: #8d6852; --tier-color: #2a1e17;">
              <div>
                <h3 class="h5" style="margin: 0;">
                  Bronze Sponsors
                </h3>
                <div style="display: flex; flex-direction: row;flex-wrap: wrap;">
                  <img class="sponsor-logo" v-for="sponsor in bronzeSponsors" :src="sponsor.logo" :alt="sponsor.name" />
                </div>
              </div>
            </Cell>
          </div>

          <div v-if="opalPlusSponsors.length > 0">
            <Cell class="large-5 sponsor-group" style="align-self: center;  background-color: #856f98; --tier-color: #261f2d;">
              <div>
                <h3 class="h5" style="margin: 0;">
                  Opal & Discounts Sponsors
                </h3>
                <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
                  <img class="sponsor-logo" v-for="sponsor in opalPlusSponsors" :src="sponsor.logo" :alt="sponsor.name" />
                </div>
              </div>
            </Cell>
          </div>
        </Grid>

        <Grid>
          <Cell class="large-4" id="become-sponsor" style="align-self: center;">
            <div>
              <h3 class="h5" style="margin: 0;">
                Become a sponsor
              </h3>
              <p style="margin: 0px 0px;">
                Support CSIT by becoming a sponsor by emailing us at
              </p>
              <div style="display: flex; flex-direction: row;">
                <p style="margin: 0px 0px;">
                
                </p>
                <p style="text-decoration: underline; margin: 0px 0px 30px 0px;">
                  csit.society@rmit.edu.au 
                </p>
                <p @click="copyEmail" id="email-copy" style="cursor: pointer; margin: 0px 0px 30px 8px; ">
                  ❐
                </p>
              </div>
            </div>
          </Cell>
        </Grid>
        <div id="bit-guy" style="position: absolute; bottom: 0vh; right: 0vw; z-index: 0; pointer-events: none;">
          <NuxtImg src="/img/pixelated-bit.png" style="height: 17em;" />
        </div>
      </Container>

      <div id="grid-bg">
        <Grid>
          <div class="extra-negative-space hoz top">
            <div v-for="n in 9" :class="'null'"></div>
          </div>
          <div class="extra-negative-space vert left">
            <div v-for="n in 5 * 6" class="null"></div>
          </div>
          <div class="extra-negative-space vert right">
            <div v-for="n in 5 * 6" class="null"></div>
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


async function handleFormSubmit () {
  const res = await $fetch('/api/submit', {
    method: 'POST',
    body: {
      // My form data
    },
  })
}

 
// CMS GET REQ FOR SPONSORS
const { data: sponsors } = await useFetch("/api/sponsors");
const diamondSponsors  = (sponsors.value || []).filter((hi) => hi.tier === "diamond");
const goldSponsors     = (sponsors.value || []).filter((hi) => hi.tier === "gold");
const silverSponsors   = (sponsors.value || []).filter((hi) => hi.tier === "silver");
const bronzeSponsors   = (sponsors.value || []).filter((hi) => hi.tier === "bronze");
const opalPlusSponsors = (sponsors.value || []).filter((hi) => hi.tier === "opal+");

const bio = ref(
  "A student-run club at RMIT University committed to engaging students with academic and social events that further their professional development."
);

useHead({
  title: "RMIT CSIT Society",
  meta: [
    {
      name: "description",
      content: bio,
    },
    {
      name: "og:image",
      content: "/img/home-thumb.jpg",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
  ],
});

const loaded = ref(false);
onMounted(() => {
  loaded.value = true;
});

const progress = ref(0);

// Copies email
const copied = ref(false);
function copyEmail() {
  navigator.clipboard.writeText("csit.society@rmit.edu.au");
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

</script>

<style lang="scss" scoped>
@use "sass:map";

@keyframes image-parallax {
  from {
    background-position: 50% 50%;
  }
  to {
    background-position: 50% calc(50% + 20vh);
  }
}

@keyframes become-sponsor {
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
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    translate: 0 60px;   // starts 60px lower
  }
  to {
    translate: 0 0;      // ends in place
  }
}

#sponsor-list > div:nth-child(odd) {
  align-self: flex-start;
}

#sponsor-list > div:nth-child(even) {
  align-self: flex-end;
}

#email-copy {
  border: 1px solid #ffffff;
  border-radius: 6px;
  font-size: 0.9em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1.3em;
  position: relative;
  vertical-align: middle;
  top: 6px;
  padding: 0.19em;
  background-color: #303030;

  transition: background-color 0.1s ease 0.01s;
  cursor: pointer;

  &:active {
    background-color: grey;
    transition: none;
  }
}

#header-title h1{
  font-size : 7em;
  color : rgb(39, 38, 38);
  padding-left: 0.7em;
}

.sponsor-logo {
  width: 200px;
  height: 120px;
  object-fit: contain;
  border: 3px solid #181818af;
  padding: 0.2em 0.5em;
  margin: 0 0.5em;
  border-radius: 8px;
  background-color: white;
}

.sponsor-group{
  min-width: 130vh;
  max-width: 200vh;
  padding: 5vh 40px;
  box-shadow: 6px 6px 0 var(--tier-color);

  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: invert(0) blur(12px);
   margin: 2vh 1.5em 0;
  transition: 0.25s cubic-bezier(0.93, 0.02, 0.69, 0.99) all;
  scale: 1;
  transform: translateZ(0);
  backface-visibility: hidden;
  pointer-events: auto;
  padding: 5vh 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  animation: slide-up 0.6s ease-out both;

  @media screen and (max-width: map.get($breakpoint, "medium")) {
    flex-direction: column;
    text-align: center;
    margin: 10vh 1.5em 10vh;
    padding-bottom: 4.5em;
  }
}

#become-sponsor {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: invert(0) blur(12px);
  margin: 10vh 1.5em 10vh;
  transition: 0.25s cubic-bezier(0.93, 0.02, 0.69, 0.99) all;
  scale: 1;
  transform: translateZ(0);
  backface-visibility: hidden;
  pointer-events: auto;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  translate: 0 100%;

  animation-name: become-sponsor;
  animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99);
  animation-fill-mode: both;
  animation-duration: 1ms;
  view-timeline-name: --become-sponsor;
  animation-timeline: --become-sponsor;
  animation-range: entry 0% entry 30%;

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



#index-page {
  position: relative;
  width: 100%;
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
    outline-color: #ffeaea;
  }
}

#events-section {
  background: #191925;
  min-height: 120lvh;
  position: relative;
  z-index: 11;
  overflow: clip;
  padding: 0vh 5em 0;
  color: #fff;

  .grid-container {
    pointer-events: none;
  }

  #grid-bg {
    padding-top: 2em;
  }
}

#past-events-header {
  padding: 2em;
}

header {
  background: #ffffff36;
  position: relative;
  width: 100%;
  padding: 2em;
  /* extra room so #events-section's 10em outline doesn't cover the blocks */
  padding-bottom: 0em;
  overflow-x: clip;

  .grid {
    gap: 0;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(9, 1fr);
    aspect-ratio: 9 / 3;
    margin: auto;
    position: relative;

    .extra-negative-space {
      z-index: 2;
      position: absolute;
      display: grid;

      &.vert {
        height: 100%;
        top: 0;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(3, 1fr);
        aspect-ratio: 5 / 3;
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
      grid-template-rows: repeat(6, 1fr);
      aspect-ratio: 9 / 6;
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
          grid-template-rows: repeat(6, 1fr);
          aspect-ratio: 5 / 6;
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
  }
}

@media screen and (max-width: map.get($breakpoint, "medium")) {
  .sponsor-group {
    min-width: 0;
    width: 100%;
    margin: 2vh 0 0;
    padding: 3vh 1em;
  }
  #sponsor-list > div:nth-child(odd),
  #sponsor-list > div:nth-child(even) {
    align-self: stretch;
  }
  #header-title {
    inset: 0 0 0 0 !important;
  }
  #header-title h1 {
    font-size: 3em;
    padding-left: 0.9em;
  }
  #events-section {
    padding: 0 1em;
  }
  #bit-guy {
    display: none;
  }
  header {
    padding-top: 0vw;
    padding-bottom: 0vw;
  }
  header .grid {
    width: 180%;
  }
  .sponsor-group > div {
    width: 100%;
  }
  .sponsor-group > div > div {
    justify-content: center;
    row-gap: 0.8em;
  }
  #become-sponsor h3 + p {
    margin-top: 1.2em !important;
  }
  #become-sponsor {
    padding-bottom: 1.5em;
  }
}
</style>