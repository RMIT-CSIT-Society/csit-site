<template>
  <section id="about-intro">
    <Container class="fluid">
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
            We bring together like-minded individuals to collaborate, learn, and
            connect with the tech industry.
          </p>
        </Cell>
      </Row>
      <Row id="about-intro-image-wrapper">
        <Cell class="large-3" id="intro-sub-info"></Cell>
        <Cell class="large-9" id="about-intro-image"> </Cell>
      </Row>
    </Container>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use "sass:map";

#about-intro {
  position: relative;
  color: #fff;
  padding: 7em 5em;
  margin-top: 5vh;
  z-index: 2;
  width: 100vw;
  overflow-x: clip;

  @media screen and (max-width: map.get($breakpoint, "medium")) {
    padding: 7em 3.5em;
  }

  .grid-container {
    position: relative;
  }
}

#about-intro-image-wrapper {
  @media screen and (max-width: map.get($breakpoint, "medium")) {
    padding-top: 30em;
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

#about-intro-image {
  background: url("/img/about-intro.jpg");
  background-size: 100%;
  aspect-ratio: 4/3;
  scale: 1.4;
  z-index: 0;
  translate: 0 3em;
  transform-origin: center left;
  background-repeat: no-repeat;

  background-position: center;
  animation-name: image-parallax-intro;
  animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99);
  animation-duration: 1ms;
  animation-timeline: --scrollTimeline;
  animation-range: cover 0% contain 80%;
  position: relative;

  #about-intro-image::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: 0;
    animation-name: image-in-blur;
    /* animation-timing-function: cubic-bezier(0.65, 0.44, 0, 0.98); */
    animation-duration: 1ms;
    animation-timeline: --scrollTimeline;
    animation-range: cover 0% contain 40%;
  }
}

@keyframes image-parallax-intro {
  from {
    background-position: 50% 40%;
    translate: 0 20em;
    background-size: 150%;
  }
  to {
    background-position: 50% 50%;
    translate: 0 0;
    background-size: 100%;
  }
}

@keyframes image-in-blur {
  from {
    backdrop-filter: blur(100px);
  }
  to {
    backdrop-filter: blur(0);
  }
}
</style>
