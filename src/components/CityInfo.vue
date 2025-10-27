<template>
  <section class="cityinfo">
    <div class="cityinfo__left">
      <h2 class="cityinfo__left-title">{{ weather?.city || "Loading..." }}</h2>
      <p class="cityinfo__left-desc">
        Chance of rain: {{ weather?.chanceOfRain || 0 }}%
      </p>
      <p class="cityinfo__left-temp">
        {{ weather?.temp || "--" }}{{ weather?.tempUnit || "°C" }}
      </p>
    </div>
    <div class="cityinfo__right">
      <font-awesome-icon
        class="cityinfo__right-icon"
        :icon="weather?.icon || 'fa-solid fa-sun'"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useWeather } from "../composables/useWeather.js";

const { getCurrentWeather } = useWeather();

const weather = computed(() => getCurrentWeather());
</script>

<style lang="scss" scoped>
.cityinfo {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @include respond(md) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 24px;
  }

  &__left {
    display: flex;
    flex-direction: column;
    gap: 8px;

    @include respond(md) {
      align-items: center;
    }

    &-title {
      font-size: 40px;
      font-weight: 800;
      color: $color-secondary;

      @include respond(lg) {
        font-size: 32px;
      }

      @include respond(md) {
        font-size: 28px;
      }

      @include respond(sm) {
        font-size: 24px;
      }
    }

    &-desc {
      font-size: 16px;
      margin-bottom: 40px;

      @include respond(sm) {
        font-size: 14px;
        margin-bottom: 24px;
      }
    }

    &-temp {
      font-size: 64px;
      color: $color-secondary;

      @include respond(lg) {
        font-size: 56px;
      }

      @include respond(md) {
        font-size: 48px;
      }

      @include respond(sm) {
        font-size: 40px;
      }
    }
  }

  &__right {
    @include respond(md) {
      order: -1;
    }

    &-icon {
      width: 160px;
      height: 100%;
      color: gold;

      @include respond(lg) {
        width: 120px;
      }

      @include respond(md) {
        width: 100px;
      }

      @include respond(sm) {
        width: 80px;
      }
    }
  }
}
</style>
