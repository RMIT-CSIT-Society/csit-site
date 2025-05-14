<template>
  <section>
    <div id="final-statement-grid">
      <div class="some-writing">
        <h2 class="h5">
          Together, we host shared events, networking nights, and technical
          challenges that bridge disciplines and bring students closer to
          industry leaders.
        </h2>
      </div>

      <div class="null-1"></div>
      <div class="image-caption-wrapper">
        <pre class="image-caption">
// ======
// SWITCH x CSIT Hackathon
// 2024
        </pre>
      </div>
      <div class="null-2"></div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
/* TODO: Move this over to another component */
.image-caption {
  background: rgba(25, 25, 37, 1);
  padding: 2em;
  color: #8c8c92;

  pre {
    line-height: 100%;
  }
}

#final-statement-grid {
  gap: 0;
  grid-template-areas:
    "a a a a a c b b d"
    "a a a a a c b b d";
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(9, 1fr);
  aspect-ratio: 9 / 2;
  width: 100%;
  display: grid;
  z-index: 4;
  position: absolute;
  bottom: 0;
  color: #fff;

  .null-1 {
    grid-area: c;

    &::after {
      animation-name: some-writing-in;
      /* animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99); */
      animation-duration: 1ms;
      animation-timeline: --scrollTimeline;
      animation-range: cover 0% contain 100%;
    }
  }
  .null-2 {
    grid-area: d;
  }

  .null-1,
  .null-2 {
    position: relative;

    &::after,
    &::before {
      content: "";
      height: 200vh;
      position: absolute;
      bottom: 0;
      width: 2px;
      background: #fff;
      opacity: 0.2;
    }

    &::after {
      left: 0;
    }
    &::before {
      right: 0;
    }
  }

  .some-writing {
    grid-area: a;
    background: rgba(25, 25, 37, 1);
    padding: 0 4em;
    display: flex;
    align-items: center;

    animation-name: some-writing-in;
    /* animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99); */
    animation-duration: 1ms;
    animation-timeline: --scrollTimeline;
    animation-range: cover 0% contain 100%;

    &::after {
      content: "";
      height: 2px;
      width: 150vw;
      position: absolute;
      top: -2px;
      left: 0;
      background: #fff;
      opacity: 0.2;
    }

    &::before {
      content: "";
      height: 20vh;
      width: 100%;
      bottom: -20vh;
      left: 0;
      position: absolute;
      background: rgba(25, 25, 37, 1);
    }
  }

  .image-caption-wrapper {
    grid-area: b;
    padding: 5em 2em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-caption {
    background: rgba(25, 25, 37, 1);
  }
}

@keyframes about-final-statement-bg-image {
  from {
    background-size: 300%;
  }
  to {
    background-size: 100%;
  }
}

@keyframes about-final-statement-bg-image-after {
  from {
    background: rgba(25, 25, 37, 1);
  }
  to {
    background: rgba(25, 25, 37, 0);
  }
}

@keyframes about-final-statement-bg-image-before {
  0% {
    backdrop-filter: blur(100px);
  }
  /* 20% {
    backdrop-filter: blur(100px);
  }
  50% {
    backdrop-filter: blur(0px);
  } */
  80%,
  100% {
    backdrop-filter: blur(0px);
  }
}

@keyframes some-writing-in {
  0%,
  30% {
    translate: -15em -40em;
  }
  100% {
    translate: 0;
  }
}

section {
  min-height: 120vh;
  background: url("/img/about-final.jpg");
  background-position: center;
  background-size: 100%;

  animation-name: about-final-statement-bg-image;
  animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99);
  animation-duration: 1ms;
  animation-timeline: --scrollTimeline;
  animation-range: cover 0% contain 100%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(25, 25, 37, 1);

    animation-name: about-final-statement-bg-image-after;
    /* animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99); */
    animation-duration: 1ms;
    animation-timeline: --scrollTimeline;
    animation-range: cover 50% contain 100%;

    z-index: 2;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    backdrop-filter: blur(100px);
    filter: blur(20px);

    animation-name: about-final-statement-bg-image-before;
    animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99);
    animation-duration: 1ms;
    animation-timeline: --scrollTimeline;
    animation-range: cover 0% contain 100%;

    z-index: 1;
  }
}
</style>
