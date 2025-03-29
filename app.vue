<template>
  <div>
    <div id="index-loader" ref="indexIntroContainer" v-if="!completedLoaded"></div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import "~/assets/scss/grids.scss";
import "~/assets/scss/type.scss";

const mounted = ref(false);
const completedLoaded = ref(false);

onMounted(() => {
  mounted.value = true;

  //@ts-ignore
  const indexLoader = lottie.loadAnimation({
    container: document.querySelector("#index-loader"),
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: "lottie/index-intro.json",
    initialSegment: [0, 131],
  });

  indexLoader.addEventListener("complete", () => {
    completedLoaded.value = true;
  });
});

useHead({
  link: [
    { rel: "icon", type: "image/svg", href: "/favicon.svg" },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: true,
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap",
    },
  ],
  script: [
    {
      src: "/js/lottie.min.js",
    },
    {
      src: "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js",
    },
    {
      src: "https://kit.fontawesome.com/277693285f.js",
      crossorigin: "anonymous",
    },
  ],
});
</script>

<style lang="scss">
@use "sass:map";

html {
  scroll-timeline: --scrollTimeline y;
  scroll-timeline: --scrollTimeline vertical;
}

:root {
  interpolate-size: allow-keywords;
}

#index-loader {
  width: 100%;
  height: auto;
  aspect-ratio: 1920/1602;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  pointer-events: none;

  @media screen and (max-width: map.get($breakpoint, "medium")) {
    aspect-ratio: inherit;
    height: 100%;
    scale: 2.2;
    rotate: 270deg;
    z-index: -1;
  }
}

.os-enter-from {
  .action-bar {
    opacity: 1;
    transform: translateY(-10px);
  }

  /* #foreground-wrapper .video-wrapper {
        //transform: scale(1.5) !important;
    } */
}

.os-enter-active,
.os-leave-active {
  //transition-timing-function: cubic-bezier(0.85, 0.07, 0.04, 0.96);

  .action-bar {
    transition-timing-function: cubic-bezier(0.68, 0.16, 0.01, 0.96);
    transition: all 0.75s !important;
    transition-delay: 0.5s;
  }
}

.os-enter,
.os-leave-to {
  .action-bar {
    opacity: 0 !important;
    transform: translateY(150px) !important;
  }
}

@keyframes staggeredScroll {
  0% {
    scale: 0.2;
    translate: 0 20lvh;
    /* opacity: 0;
    filter: blur(1.5rem); */
  }

  100% {
    scale: 1;
    translate: 0 0;
    opacity: 1;
    filter: blur(0);
  }
}
</style>
