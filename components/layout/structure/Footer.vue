<template>
  <footer>
    <Container class="fluid" v-show="hideCallToAction == false">
      <Row>
        <Cell id="cta" class="large-12">
          <h2>Do you like what you see?<br />Get in touch below!</h2>
          <p>
            You can hit me up on any social media, you can also hit me up via my
            email or using the form below.
          </p>
          <NuxtLink class="button" to="/contact">Get in Touch</NuxtLink>
        </Cell>
      </Row>
    </Container>
    <div class="footer-bottom">
      <Container class="narrow">
        <Row>
          <Cell class="large-8">
            <div id="socials-row">
              <div id="socials">
                <template v-for="platform in socials">
                  <a :href="platform.url">
                    <i class="fa-brands" :class="`fa-${platform.name}`"></i>
                  </a>
                </template>
              </div>
            </div>
          </Cell>
          <Cell class="large-4" style="text-align: right">
            <p>Kanny Esterkin © 2024</p>
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

const socials = ref([
  {
    name: "youtube",
    url: "https://www.youtube.com/c/kanny",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/kannyesterkin/",
  },
  {
    name: "x-twitter",
    url: "https://twitter.com/kannyesterkin",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/kanny-esterkin-9535911a3/",
  },
  {
    name: "behance",
    url: "https://www.behance.net/kannyesterkin2",
  },
]);
</script>

<style lang="scss" scoped>
@use "sass:map";

footer {
  background: #ff7683;
  position: relative;
  padding: 8em 2em 2em;
  text-align: center;
  margin-top: -8em;
  z-index: 99999;

  #cta {
    p {
      margin: 0 auto;
      margin-block-start: 2em;
      margin-block-end: 3.5em;
      max-width: 600px;
    }
  }
}

.footer-bottom {
  margin-top: 12em;
}

#socials-row {
  display: flex;
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
    color: #edc3c7;
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
