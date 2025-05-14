<template>
  <div id="about-page" :class="{ 'loaded-home': loaded }">
    <section id="about-intro">
      <Container>
        <Row id="about-intro-heading">
          <Cell class="large-5" id="">
            <h2 class="h5">
              The CSIT Society is dedicated to fostering professional and
              technical growth for students in computing, software, and IT.
            </h2>
          </Cell>
          <Cell class="large-7" id=""></Cell>
          <Cell class="large-3" id="intro-sub-info">
            <p>
              We bring together like-minded individuals to collaborate, learn,
              and connect with the tech industry.
            </p>
          </Cell>
        </Row>
        <Row>
          <Cell class="large-3" id="intro-sub-info"></Cell>
          <Cell class="large-9" id="about-intro-image"></Cell>
        </Row>
      </Container>
    </section>

    <section id="collabs">
      <Container>
        <Row id="about-intro-heading">
          <Cell class="large-5" id="">
            <h2 class="h5">
              The CSIT Society is dedicated to fostering professional and
              technical growth for students in computing, software, and IT.
            </h2>
          </Cell>
          <Cell class="large-7" id=""></Cell>
          <Cell class="large-3" id="intro-sub-info">
            <p>
              We bring together like-minded individuals to collaborate, learn,
              and connect with the tech industry.
            </p>
          </Cell>
        </Row>
      </Container>
    </section>

    <SectionAboutFinalStatement />
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
</script>

<style scoped>
#about-page {
  background: #191925;
}
#collabs {
  position: relative;
  height: 120vh;
  padding: 0 5em;
  background: #191925;
  z-index: 0;

  .grid-container {
    width: 100%;
    height: 100%;
    background: firebrick;
    position: relative;

    &::after {
      content: "";
      left: 0;
      top: -5em;
      height: 5em;
      background: firebrick;
      width: 100%;
      position: absolute;
      z-index: 1;
    }
    &::before {
      content: "";
      right: -5em;
      top: -5em;
      height: 120vh;
      background: firebrick;
      width: 5em;
      position: absolute;
      z-index: 1;
    }
  }
}

#about-intro {
  position: relative;
  color: #fff;
  padding: 7em 5em;
  /*  margin-top: 2em; */
  z-index: 2;

  .grid-container {
    position: relative;
  }
}

#about-intro-heading {
  position: absolute;
  top: 2em;
  left: 0;
  z-index: 1;
}

#intro-sub-info {
  padding-right: 3em;
  text-wrap: balance;
}

@keyframes image-parallax {
  from {
    background-position: 50% 50%;
  }
  to {
    background-position: 50% calc(50% + 20vh);
  }
}

#about-intro-image {
  background: url("/img/about-intro.jpg");
  background-size: 100%;
  aspect-ratio: 4/3;
  scale: 1.2;
  z-index: 0;
  translate: 5em 3em;

  background-position: center;
  animation-name: image-parallax;
  /* animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99); */
  animation-duration: 1ms;
  animation-timeline: --scrollTimeline;
  animation-range: cover 0% contain 100%;
}
</style>

<style lang="scss" scoped>
@use "sass:map";

#index-page {
  position: relative;
  width: 100%;
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
