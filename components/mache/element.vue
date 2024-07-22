<template>
  <template
    v-if="block != null && block.type != 'none' && block.type != 'group'"
  >
    <div class="dropzone" :class="[{ group: isGroup }, block.classlist]">
      <template v-if="block.type == 'p'">
        <component :is="block.typescale" :id="block.id">
          {{ block.html }}
        </component>
      </template>

      <template v-else-if="block.type == 'img'">
        <img
          :id="block.id"
          :src="block.src"
          :alt="block.alt"
          height="1080"
          width="1920"
          :class="{ loading: imageLoading }"
          ref="image"
        />
      </template>

      <template v-else>
        <p>empty</p>
      </template>
    </div>
  </template>
</template>

<script>
export default {
  name: "MacheElement",

  props: {
    isGroup: Boolean, // Is inside of a dropzone
    path: Number,
    block: Object, // object passed through
    // for xy grid
    grid: Boolean,
  },

  data() {
    return {
      imageLoading: true,

      blockTemp: this.block,
    };
  },

  mounted() {
    try {
      if (this.block == null && this.block.type == "img") {
        this.$refs.image.onload = () => {
          if (
            this.$refs.image.complete &&
            this.$refs.image.naturalHeight !== 0
          ) {
            console.log("loaded");
            this.imageLoading = false;

            this.$refs.image.removeAttribute("onload");
          }
        };
      }
    } catch (error) {
      console.log("Cant access block.type");
    }

    this.$nextTick(() => {
      if (this.block.classlist[0] != "cell" && this.grid == true) {
        this.blockTemp.classlist.unshift("cell");
      }
    });
  },
};
</script>

<style lang="scss" scoped>
img {
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  height: auto;
  -ms-interpolation-mode: bicubic;
}
</style>
