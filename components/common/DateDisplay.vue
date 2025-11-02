<template>
  <template v-if="startDate && finishDate">
    <template v-if="dayjs(startDate).isSame(dayjs(finishDate), 'day')">
      <div class="date-range-wrapper-same-day">
        <p>
          {{ dayjs(startDate).format("D MMM YY") }}
        </p>
        <div class="date-range-wrapper">
          <p>
            {{ dayjs(startDate).format("h:mm A") }}
          </p>
          <p>
            {{ dayjs(finishDate).format("h:mm A") }}
          </p>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="date-range-wrapper">
        <p>
          {{ dayjs(startDate).format("D MMM YY • h:mm A") }}
        </p>
        <p>
          {{ dayjs(finishDate).format("D MMM YY • h:mm A") }}
        </p>
      </div>
    </template>
  </template>

  <template v-else-if="startDate">
    {{ dayjs(startDate).format("D MMM YY • h:mm A") }}
  </template>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

defineProps<{
  startDate?: Date | string | null;
  finishDate?: Date | string | null;
}>();
</script>

<style scoped>
.date-range-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 1em 0;
  margin-left: 0.5em;

  p {
    margin: 0;
    position: relative;
    border-left: 4px solid rgba(255, 255, 255, 0.4);
    padding-left: 1em;

    &::before {
      content: "";
      position: absolute;
      top: 25%;
      left: calc(-0.5em - 1px);
      height: 50%;
      aspect-ratio: 1 / 1;
      background: rgba(255, 255, 255, 1);
      border-radius: 50%;
    }
  }
}

.date-range-wrapper-same-day {
  display: flex;
  flex-direction: row;
  gap: 0;
  justify-content: space-between;
}
</style>
