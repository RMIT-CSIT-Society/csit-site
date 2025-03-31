<template>
  <div id="navigation-hamburger">
    <div
      id="hamburger-button"
      class="pseudo-button"
      @click="toggleMenu"
      :class="{ opened: opened }"
    >
      <span v-if="!opened" class="material-symbols-outlined size-40">menu</span>
      <span v-else class="material-symbols-outlined size-40">close</span>
    </div>
  </div>

  <div id="navigation-wrapper" :class="{ opened: opened }">
    <div class="nav-container">
      <div class="nav-container-wrapper">
        <NuxtLink to="/" id="logo-link">
          <p>RMIT Computer Science and Information Technology Society</p>
        </NuxtLink>

        <nav>
          <!-- Convert this into components -->
          <NavigationLink
            :activeSection="activeSection"
            sectionName="about"
            to="/"
            >Home</NavigationLink
          >

          <NavigationLink
            :activeSection="activeSection"
            sectionName="about-page"
            to="/about"
            >About Us</NavigationLink
          >

          <NavigationLink
            :activeSection="activeSection"
            sectionName="team"
            to="/team"
            >The Team</NavigationLink
          >

          <NavigationLink
            :activeSection="activeSection"
            sectionName="events"
            to="/#events"
            >What’s on</NavigationLink
          >

          <NavigationLink
            :activeSection="activeSection"
            sectionName="sponsor-us"
            to="/sponsor-us"
            >Sponsor us</NavigationLink
          >
        </nav>
      </div>
    </div>

    <!-- menu line thing -->
    <div class="menu-indicator"></div>
  </div>
</template>

<script setup lang="ts">
const activeSection = ref("");
const hide = ref(false);
const opened = ref(false);
const route = useRoute();

const isIndex = ref(false);

watch(
  () => route.fullPath,
  (newRoute) => {
    console.log("routed:", newRoute);
    isIndex.value = newRoute == "/";

    nextTick(() => {
      setTimeout(() => {
        isOnWorkPages();
        opened.value = false;
      }, 300);
    });
  }
);

const isOnWorkPages = () => {
  if (route.fullPath.includes("/work")) {
    console.log("Work page horray");
    hide.value = true;
  } else {
    hide.value = false;
  }
};

const toggleMenu = () => {
  console.log("toggled:", opened.value);
  opened.value = !opened.value;
};

onMounted(() =>
  nextTick(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("ENTER");
          activeSection.value = entry.target.id;
          return;
        }
        console.log("LEAVE");
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
      }
    );

    const sections = document.querySelectorAll("header, section");
    sections.forEach((el) => {
      observer.observe(el);
    });

    isOnWorkPages();
  })
);
</script>

<style lang="scss" scoped>
@use "sass:map";

#navigation-hamburger {
  display: none;
}

#hamburger-button {
  background: #e8effa;
  position: fixed;
  z-index: 9999;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 60px;
  width: 60px;
  left: 2em;
  top: 2em;
  display: hidden;

  .size-40 {
    font-size: 24px;
  }

  &.opened,
  &:active {
    background: #cddaf2;
  }
}

.noHover {
  pointer-events: none;
}

.nav-container {
  width: 100%;
  border-radius: 2em;
  transition: 0.5s cubic-bezier(0.61, 0.01, 0.03, 0.99) all;
  position: relative;
  display: flex;
  justify-content: center;
}

.menu-indicator {
  background: rgba(72, 84, 106, 0.4);
  position: absolute;
  right: 2.25em;
  height: 1em;
  width: calc(0.75em / 2);
  border-radius: calc(0.75em / 2);
  opacity: 0;
  transition: 0.5s cubic-bezier(0.61, 0.01, 0.03, 0.99) all;
}

.nav-container-wrapper {
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  max-width: 1600px;
}

nav {
  display: flex;
  gap: 1.5em;
  z-index: 1;
}

@keyframes headerScrollAnimation {
  0% {
    scale: 1;
    translate: 0 0;
  }

  50% {
    scale: 1.2;
    translate: 0 -200px;
  }

  100% {
    scale: 1.2;
    translate: 0 -200px;
  }
}

#navigation-wrapper {
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  position: absolute;
  top: calc(100dvh - 87px - 1em);
  padding: 0 2em;
  left: 0;
  z-index: 999;
  transform: translateX(0);
  transition: 0.75s cubic-bezier(0.61, 0.01, 0.03, 0.99) all;
  view-transition-name: navigation;

  //xlarge screens
  @media screen and (min-width: map.get($breakpoint, "large")) {
    pointer-events: none;
  }
}

#logo {
  height: 80px;
  aspect-ratio: 1;
  translate: -16px 0;
}

#logo-link {
  text-decoration: none;
  color: firebrick;
  font-weight: 700;
  line-height: 1.2;
  max-width: 325px;
}

// Mobile only
@media screen and (max-width: map.get($breakpoint, "medium")) {
  #logo {
    opacity: 0;
  }

  #navigation-wrapper {
    transform: translateX(-100%);
    left: 0;
    background: #6985b3;
    margin: 0;
    position: fixed;
    height: 100vh;
    font-size: 2.369rem;
    align-items: center;
    top: 0;

    #logo-link {
      display: none;
    }

    .nav-container-wrapper {
      display: block;
    }

    .nav-container {
      max-height: 100%;
    }

    nav {
      flex-direction: column;
    }

    &.opened {
      transform: translateX(0);
    }
  }

  #navigation-hamburger {
    display: block;
  }
}
</style>
