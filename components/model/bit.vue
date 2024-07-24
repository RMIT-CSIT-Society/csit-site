<template>
  <primitive :object="model">
    <HolographicMaterial ref="holographicMaterialRef" />
  </primitive>
</template>

<script setup lang="ts">
const { scene: model, animations } = await useGLTF("/models/bit-model.glb");

const { actions } = useAnimations(animations, model);
console.log(actions);

const currentAction = ref(actions.CSIT_MascotAction);

currentAction.value.play();

/* const { onBeforeRender } = useLoop(); */

/* const { onLoop } = useRenderLoop();
onLoop(({ delta, elapsed }) => {
  if (bitModel.value) {
    bitModel.value.rotation.y += delta;
    bitModel.value.rotation.z = elapsed * 0.2;
  }
}); */

/* onBeforeRender(({ delta, elapsed }) => {
  console.log(bitModel.value);
  if (bitModel.value) {
    bitModel.value.rotation.y += delta;
    bitModel.value.rotation.z = elapsed * 0.1;
  }
});

const { onLoop, resume } = useRenderLoop();

onLoop(({ delta, elapsed, clock }) => {
  //console.log(delta, elapsed, clock);
  console.log(bitModel.value);
  if (bitModel.value) {
    bitModel.value.rotation.y += delta;
    bitModel.value.rotation.z = elapsed * 0.2;
  }
}); */
</script>

<style scoped></style>
