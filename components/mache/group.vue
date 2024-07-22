<template>
  <template v-if="block.length > 0">
    <template v-for="(child, index) in block">
      <template v-if="child != null">
        <template v-if="child.type == 'group'">
          <div
            class="dropzone actual-group"
            :class="[
              {
                group: isGroup,
                first: isFirst,
              },
              child.classlist,
            ]"
            :key="child.type + '_' + index"
            :id="child.id"
          >
            <MacheGroup
              :key="child.id"
              v-model:block="child.children"
              :path="index"
              :isGroup="true"
              :grid="child.grid"
            >
            </MacheGroup>
          </div>
        </template>

        <template v-else>
          <MacheElement
            :key="child.id"
            :isGroup="isGroup"
            v-model:block="blockTemp[index]"
            :path="index"
            :grid="grid"
          >
          </MacheElement>

          <!-- <p :key="child.id_tdz"> {{index + 1}} | {{block.length}}</p> -->
        </template>
      </template>
    </template>
  </template>
</template>

<script setup>
/* import Dropzone from '~~/components/mache/element.vue'; */
</script>

<script>
export default {
  name: "MacheGroup",

  props: {
    isFirst: Boolean, // First ever dropzone in builder
    isGroup: Boolean, // Is inside of a dropzone

    path: Number,

    blockID: String,
    block: Array,

    // for xy grids
    grid: Boolean,
  },

  data() {
    return {
      // blocks temp
      blockTemp: this.block,

      imageLoading: true,

      deletingBlockTemp: null,

      maxBlockIndexTemp: this.maxBlockIndex,
    };
  },
};
</script>

<style lang="scss" scoped>
.isolatingGroups {
  background: rgba(96, 125, 139, 0.153);
  box-shadow: -1px -3px 5.5px rgb(0 0 0 / 3%), 0 8.6px 14.1px rgb(0 0 0 / 4%),
    0 22.9px 32.4px rgb(0 0 0 / 6%), 0 100px 98px rgb(0 0 0 / 7%);

  > .dropzone:not(.actual-group) {
    opacity: 0;
    pointer-events: none;
  }
}

img {
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  height: auto;
  -ms-interpolation-mode: bicubic;
}
</style>
