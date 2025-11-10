<template>
  <footer>
    <Container class="fluid" v-show="hideCallToAction == false">
      <Row>
        <Cell id="cta" class="large-12">
          <h2>Join us</h2>
          <p>
            It's free to become a member. As a
            {{ new Date().getFullYear() }} RMIT CSIT Member, you’ll be invited
            to attend our events.
          </p>

          <div class="button-row">
            <NuxtLink class="button" to="https://join.csitsociety.club/"
              >Become a member</NuxtLink
            >
            <NuxtLink class="button" to="/contact">Join our committee</NuxtLink>
          </div>
        </Cell>
      </Row>
    </Container>
    <div class="footer-bottom">
      <Container class="fluid">
        <Row>
          <Cell class="large-8">
            <div id="socials-row">
              <NuxtImg src="/img/white-logo.svg" id="footer-logo" />

              <div id="socials">
                <template v-for="platform in socials">
                  <a :href="platform.url">
                    <i
                      class="fa-brands"
                      :class="`fa-${platform.icon_name}`"
                    ></i>
                  </a>
                </template>
              </div>
            </div>
          </Cell>
          <Cell class="large-4" id="copyright-shit">
            <small
              >RMIT Computer Science and Information Technology Society</small
            >
            <small>ABN: 62 597 445 914</small>
          </Cell>
        </Row>
      </Container>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{
  hideCallToAction?: boolean;
}>();

const { data: socials } = await useFetch("/api/socials");
</script>

<style lang="scss" scoped>
@use "sass:map";

#footer-logo {
  max-width: 118px;
}

#copyright-shit {
  text-align: right;
  display: flex;
  flex-direction: column;
  color: rgba(255, 255, 255, 0.4);
}

footer {
  background: firebrick;
  position: relative;
  padding: 8em 2em 3em;
  z-index: 99999;

  .footer-bg-grid {
    background: url("/img/footer-grid-bg.svg");
    height: 100%;
    width: 40%;
    position: absolute;
    top: 0;
    right: 0;

    background-size: 150%;
    animation-name: footer-grid;
    animation-timing-function: cubic-bezier(0.64, 0.01, 0.16, 0.99);
    animation-fill-mode: both;
    animation-duration: 1ms;
    view-timeline-name: --footer-bg-grid;
    animation-timeline: --footer-bg-grid;
    animation-range: contain 0% contain 100%;
  }

  #cta {
    max-width: 800px;

    p,
    h2 {
      color: #fff;
    }

    p {
      margin-block-start: 2em;
      margin-block-end: 3.5em;
    }
  }
}

.footer-bottom {
  margin-top: 12em;
}

#socials-row {
  display: flex;
  gap: 1em;
}

#socials {
  $gap: 0.5em;

  display: flex;

  flex-shrink: 1;
  padding: $gap;

  i {
    font-size: 28px;
    padding: $gap;
    z-index: 99;
    position: relative;
    transition: 0.15s cubic-bezier(0.39, 0, 0, 1.26) scale;

    @media screen and (max-width: map.get($breakpoint, "medium")) {
      font-size: 28px;
    }
  }

  a {
    color: #e0a7a7;
    position: relative;
    transition: 0.3s cubic-bezier(0.39, 0, 0, 1.26) all;

    &::after {
      content: "";
      height: 100%;
      width: 100%;
      position: absolute;
      background: #6985b3;
      top: 0;
      left: 0;
      border-radius: 0.5em;
      scale: 0;
      z-index: 0;
      transition: 0.3s cubic-bezier(0.39, 0, 0, 1.26) all;
    }

    &:hover {
      color: #e9effb;

      &::after {
        scale: 1;
      }
    }

    &:active {
      &::after {
        scale: 0.7;
        transition-duration: 0.1s;
      }

      i {
        scale: 0.7;
      }
    }
  }
}
</style>
