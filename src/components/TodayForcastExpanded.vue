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

  &--compact {
    height: 202px !important;
    padding: 16px;
    flex: 0 0 202px !important;

    .todayforcast__title {
      font-size: 14px;
      margin-bottom: 16px;
      height: 16px;
    }

    .todayforcast__content {
      height: 154px !important; // Увеличили высоту контента
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      flex: 1 !important;

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
  }

  &__content {
    display: flex;
    flex: 1;
  }
}
</style>
