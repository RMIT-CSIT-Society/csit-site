<template>
  <div id="index-page">
    <header id="home-header">
      <Grid>
        <Navigation></Navigation>

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

        <div v-for="n in 9" :class="'logo-part-' + n"></div>
        <div v-for="n in 27" :class="'null null-part-' + (n - 1)"></div>
      </Grid>
    </header>
    <section id="intro">
      <Container>
        <h2>Test</h2>
      </Container>
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

import type { ProjectSummary } from "~/server/types";
const worksPage = ref("media");
const reel = ref("post-production");
const workSection = ref<HTMLElement | null>(null);
const indexIntroContainer = ref<HTMLElement | null>(null);

const { data, pending } = await useFetch(`/api/work`, {
  params: {
    category: worksPage,
  },
  cache: "reload",
});
const actualData = ref<ProjectSummary[]>(
  JSON.parse(JSON.stringify(data))._rawValue
);

watch(data, async () => {
  actualData.value = JSON.parse(JSON.stringify(data))._rawValue;
  workSection.value?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});
</script>

<style lang="scss">
@use "sass:map";

* {
  box-sizing: border-box;
}

#works {
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
}

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
  gap: 0.45em;
  position: absolute;
  top: 0.75em;
  left: 0.75em;
}

.button-outline {
  text-decoration: none;
  gap: 0.85em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  color: #6985b3;
  border: solid 4px;
  padding: 0.5em 1em;
  border-radius: 0.5em;

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
  border-radius: 15px;
  border: 0;
  background: #edc3c7;
  color: #48546a;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: rgba(237, 195, 199, 0.5);
  }

  &.active {
    background: #ff5565;
    color: #fff;
  }
  &.invert {
    background: #48546a;
    color: #fff;
  }
}
</style>

<style lang="scss" scoped>
@use "sass:map";
section {
  &#intro {
    padding: 2em;

    > div {
      background: firebrick;
    }
  }

  .grid-container {
    max-width: 2048px;
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

    @for $i from 0 through 9 {
      > .logo-part-#{$i} {
        grid-area: c#{$i};
        background: firebrick;
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
</style>
