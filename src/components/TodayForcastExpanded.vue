<template>
  <section class="todayforcast" :class="{ 'todayforcast--compact': isCompact }">
    <h3 class="todayforcast__title">Прогноз на сегодня</h3>
    <div class="todayforcast__content">
      <TodayForcastCardExpanded
        :forecast-data="forecastData"
        :is-compact="isCompact"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import TodayForcastCardExpanded from "./TodayForcastCardExpanded.vue";
import { useWeather } from "../composables/useWeather.js";

const props = defineProps({
  isCompact: {
    type: Boolean,
    default: false,
  },
});

const { getTodayForecast } = useWeather();

const forecastData = computed(() => getTodayForecast().slice(0, 7));
</script>

<style scoped lang="scss">
.todayforcast {
  background: $color-bg;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 280px;

  @include respond(lg) {
    height: auto;
    min-height: 220px;
    padding: 20px;
  }

  @include respond(md) {
    padding: 16px;
    min-height: 200px;
  }

  @include respond(sm) {
    padding: 14px;
    min-height: 180px;
  }

  &--compact {
    height: 202px !important;
    padding: 16px;
    flex: 0 0 202px !important;

    @include respond(lg) {
      height: auto !important;
      min-height: 180px;
      flex: 0 0 auto !important;
      padding: 16px;
    }

    @include respond(md) {
      min-height: 160px;
      padding: 12px;
    }

    @include respond(sm) {
      min-height: 150px;
      padding: 10px;
    }

    .todayforcast__title {
      font-size: 14px;
      margin-bottom: 16px;
      height: 16px;

      @include respond(md) {
        font-size: 13px;
        margin-bottom: 12px;
        height: 14px;
      }

      @include respond(sm) {
        font-size: 12px;
        margin-bottom: 10px;
        height: 12px;
      }
    }

    .todayforcast__content {
      height: 154px !important;
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      flex: 1 !important;

      @include respond(lg) {
        height: auto !important;
        min-height: 130px;
      }

      @include respond(md) {
        overflow-x: auto;
        gap: 8px;
        min-height: 120px;
      }

      @include respond(sm) {
        gap: 4px;
        min-height: 110px;
      }

      > * {
        display: flex;
        width: 100%;
      }
    }
  }

  &__title {
    text-transform: uppercase;
    font-size: 16px;
    flex-shrink: 0;
    margin-bottom: 20px;

    @include respond(md) {
      font-size: 14px;
      margin-bottom: 16px;
    }

    @include respond(sm) {
      font-size: 13px;
      margin-bottom: 12px;
    }
  }

  &__content {
    display: flex;
    flex: 1;
    overflow-x: auto;

    @include respond(md) {
      gap: 4px;
    }

    &::-webkit-scrollbar {
      height: 6px;

      @include respond(sm) {
        height: 4px;
      }
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba($color-secondary, 0.2);
      border-radius: 3px;
    }
  }
}
</style>

