<template>
  <div ref="container" class="three-container">
    <canvas ref="canvas" class="three-canvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from "vue";
import * as THREE from "three";

const container = ref<HTMLElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);

const URL_STUB = "img/about/";

const imageUrls = [
  "IMG_0813.png",
  "IMG_9340.png",
  "IMG_9351.png",
  "IMG_9362.png",
  "IMG_9391.png",
  ///
  "IMG_0813.png",
  "IMG_9340.png",
  "IMG_9351.png",
  "IMG_9362.png",
  "IMG_9391.png",
  ///
  "IMG_0813.png",
  "IMG_9340.png",
  "IMG_9351.png",
  "IMG_9362.png",
  "IMG_9391.png",
  ///
  "IMG_0813.png",
  "IMG_9340.png",
  "IMG_9351.png",
  "IMG_9362.png",
  "IMG_9391.png",
  ///
].map((url) => URL_STUB + url);

let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let imagePlanes: THREE.Mesh[] = [];

let scrollY = 0;
let mouseX = 0;
let mouseY = 0;

const MAX_TRIES = 30;
const overlapThresholdFactor = 1.2;
const inFrameRatio = 0.75;
const minZ = -10;
const maxZ = -100; // increased depth range

onMounted(() => {
  if (!canvas.value || !container.value) return;

  // Scene & Camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 40;

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Load Textures
  const loader = new THREE.TextureLoader();
  imageUrls.forEach((url) => {
    loader.load(url, (texture) => {
      const img = texture.image as HTMLImageElement;

      const cameraZ = camera.position.z;
      const visibleHeight =
        2 * Math.tan((camera.fov * 0.5 * Math.PI) / 180) * cameraZ;
      const visibleWidth = visibleHeight * camera.aspect;

      const baseVhHeight = visibleHeight * 0.6;
      const aspect = img.width / img.height;
      const baseVhWidth = baseVhHeight * aspect;

      const geometry = new THREE.PlaneGeometry(baseVhWidth, baseVhHeight);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
      });
      const mesh = new THREE.Mesh(geometry, material);

      function isOverlapping(
        pos: THREE.Vector3,
        size: { w: number; h: number }
      ) {
        for (const other of imagePlanes) {
          const dx = pos.x - other.position.x;
          const dy = pos.y - other.position.y;
          const dz = pos.z - other.position.z;

          const otherWidth = other.geometry.parameters.width * other.scale.x;
          const otherHeight = other.geometry.parameters.height * other.scale.y;
          const combinedX = (size.w + otherWidth) * overlapThresholdFactor;
          const combinedY = (size.h + otherHeight) * overlapThresholdFactor;
          const combinedZ = 5;

          if (
            Math.abs(dx) < combinedX &&
            Math.abs(dy) < combinedY &&
            Math.abs(dz) < combinedZ
          ) {
            return true;
          }
        }
        return false;
      }

      let tries = 0;
      let position = new THREE.Vector3();
      let zPos: number;
      let scaleFactor: number;
      let marginX: number;
      let marginY: number;
      let validPos = false;

      while (tries < MAX_TRIES && !validPos) {
        zPos = minZ + Math.random() * (maxZ - minZ);
        scaleFactor = (cameraZ / (cameraZ - zPos)) * 1.3; // exaggerate scale difference

        // Wider margins to spread images more
        marginX = ((visibleWidth * 2 - baseVhWidth) / 2) * scaleFactor;
        const verticalSpreadWorld = visibleHeight * 3;
        marginY = ((verticalSpreadWorld - baseVhHeight) / 2) * scaleFactor;

        const inFrame = Math.random() < inFrameRatio;

        const posXRange = inFrame ? marginX : marginX * 1.5;
        const posYRange = inFrame ? marginY : marginY * 1.5;

        position.set(
          (Math.random() - 0.5) * 2 * posXRange,
          (Math.random() - 0.5) * 2 * posYRange,
          zPos
        );

        const size = {
          w: baseVhWidth * scaleFactor,
          h: baseVhHeight * scaleFactor,
        };

        if (!isOverlapping(position, size)) {
          validPos = true;
        } else {
          tries++;
        }
      }

      if (!validPos) {
        console.warn("Could not find non-overlapping position after max tries");
      }

      mesh.position.copy(position);
      mesh.scale.set(scaleFactor, scaleFactor, 1);

      scene.add(mesh);
      imagePlanes.push(mesh);
    });
  });

  // Resize
  window.addEventListener("resize", onResize);
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Scroll
  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
  });

  // Mouse move
  window.addEventListener("mousemove", (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    mouseX = x;
    mouseY = y;
  });

  // Animate
  function animate() {
    requestAnimationFrame(animate);
    camera.position.y = -scrollY * 0.01;
    camera.rotation.x = mouseY * 0.05;
    camera.rotation.y = mouseX * 0.2 + 0.5;
    renderer.render(scene, camera);
  }

  animate();
});

onUnmounted(() => {
  window.removeEventListener("resize", () => {});
  window.removeEventListener("scroll", () => {});
  window.removeEventListener("mousemove", () => {});
});
</script>

<style scoped>
.three-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
}

.three-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
