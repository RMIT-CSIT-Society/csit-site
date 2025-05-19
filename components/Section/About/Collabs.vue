<template>
  <section id="collabs">
    <Container>
      <Row>
        <Cell class="large-5" id="collabs-statement">
          <h2 class="h1">Collabs</h2>
          <p>
            We collaborate with leading student organizations to create
            inclusive and diverse opportunities:
          </p>

          <div class="collabs-row">
            <NuxtImg src="/img/white-logo.svg" id="footer-logo" />
            <p></p>
          </div>
        </Cell>
        <Cell class="large-7" id="collabs-images">
          <div id="collabs-first-image"></div>
          <div id="collabs-second-image"></div>
        </Cell>
      </Row>
    </Container>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
#collabs {
  position: relative;
  height: 120vh;
  margin-bottom: 10em;
  padding: 0 5em;
  background: #191925;
  z-index: 1;

  #collabs-statement {
    margin-top: 5em;
    p {
      max-width: 420px;
    }
  }

  #collabs-images {
    margin-top: 5em;
    position: relative;

    #collabs-first-image {
      background: url("/img/about-collabs-1.jpg");
      background-size: 100%;
      aspect-ratio: 1/1;
      z-index: 0;
      translate: 10em 0em;
      background-repeat: no-repeat;

      background-position: center;
      animation-name: image-parallax-collabs-1;
      /* animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99); */
      animation-duration: 1ms;
      animation-timeline: --scrollTimeline;
      animation-range: cover 0% contain 100%;
    }

    #collabs-second-image {
      background: url("/img/about-collabs-2.jpg");
      background-size: 100%;
      aspect-ratio: 8/9;
      z-index: 0;
      translate: 10em 0em;
      background-repeat: no-repeat;

      background-position: center;
      animation-name: image-parallax-collabs-2;
      /* animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99); */
      animation-duration: 1ms;
      animation-timeline: --scrollTimeline;
      animation-range: cover 0% contain 100%;
      position: absolute;
      top: 25em;
      z-index: 1;
      left: -10em;
      width: 100%;
      outline-width: 5em;
      outline-style: solid;
      outline-color: firebrick;
      outline-offset: 0em;
    }
  }

  .grid-container {
    width: 100%;
    height: 100%;
    background: firebrick;
    color: #fff;
    position: relative;
    padding: 5em;

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
      z-index: -1;
    }
  }
}

@keyframes image-parallax-collabs-1 {
  from {
    background-position: 100% 100%;
    background-size: 110%;
  }
  to {
    background-position: 100% calc(50% - 15vh);
    background-size: 110%;
  }
}
@keyframes image-parallax-collabs-2 {
  0% {
    background-position: 50% -100%;
    background-size: 110%;
    outline-offset: 0;
  }
  100% {
    background-position: 50% 100%;
    background-size: 100%;
    outline-offset: -5em;
  }
}
</style>
