<template>
  <section class="weekforecast">
    <div class="weekforecast__top">
      <h3 class="weekforecast__title">7-Day Forecast</h3>
    </div>
    <div class="weekforecast__content">
      <div
        v-for="(day, index) in weekData"
        :key="index"
        class="weekforecast__card"
      >
        <div class="weekforecast__card-day">
          {{ day.day }}
        </div>
        <div class="weekforecast__card-middle">
          <font-awesome-icon :icon="day.icon" class="weekforecast__card-icon" />
          <span class="weekforecast__card-condition">{{ day.condition }}</span>
        </div>
        <div class="weekforecast__card-temp">
          {{ day.maxTemp }}{{ day.tempUnit }} / {{ day.minTemp
          }}{{ day.tempUnit }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useWeather } from "../composables/useWeather.js";

const { getWeekForecast } = useWeather();

const weekData = computed(() => getWeekForecast());
</script>

<style scoped lang="scss">
.weekforecast {
  background: $color-bg;
  border-radius: 12px;
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;

  @include respond(md) {
    margin-top: 20px;
    padding: 16px;
  }

  @include respond(sm) {
    padding: 12px;
  }

  &__top {
    margin-bottom: 16px;
    flex-shrink: 0;

    &-title {
      text-transform: uppercase;
      font-size: 18px;
      font-weight: 600;

      @include respond(md) {
        font-size: 16px;
      }

      @include respond(sm) {
        font-size: 14px;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 0;
    flex: 1;
  }

  &__card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid rgba($color-secondary, 0.1);
    height: calc((100% - 96px) / 7);

    @include respond(md) {
      padding: 8px 0;
      height: auto;
      margin-bottom: 8px;
    }

    @include respond(sm) {
      padding: 6px 0;
      margin-bottom: 6px;
    }

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }

    &-day {
      font-size: 14px;
      font-weight: 500;
      min-width: 70px;
      color: $color-secondary;

      @include respond(md) {
        font-size: 13px;
        min-width: 60px;
      }

      @include respond(sm) {
        font-size: 12px;
        min-width: 50px;
      }
    }

    &-middle {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
      justify-content: center;

      @include respond(md) {
        gap: 8px;
      }

      @include respond(sm) {
        gap: 6px;
      }
    }

    &-icon {
      width: 20px;
      height: 20px;
      color: gold;

      @include respond(sm) {
        width: 16px;
        height: 16px;
      }
    }

    &-condition {
      font-size: 14px;
      color: $color-primary;

      @include respond(lg) {
        display: none;
      }
    }

    &-temp {
      font-size: 14px;
      font-weight: 600;
      color: $color-secondary;
      min-width: 70px;
      text-align: right;

      @include respond(md) {
        font-size: 13px;
        min-width: 60px;
      }

      @include respond(sm) {
        font-size: 12px;
        min-width: 50px;
      }
    }
  }
}
</style>
