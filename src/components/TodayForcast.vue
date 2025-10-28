<template>
  <section class="todayforcast">
    <h3 class="todayforcast__title">Today's Forcast</h3>
    <div class="todayforcast__content">
        <TodayForcastCard :forecast-data="forecastData" />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import TodayForcastCard from "./TodayForcastCard.vue"
import { useWeather } from '../composables/useWeather.js'

const { getTodayForecast } = useWeather()

const forecastData = computed(() => getTodayForecast())
</script>

<style scoped lang="scss">
.todayforcast {
    background: $color-bg;
    border-radius: 12px;
    padding: 32px;

    @include respond(lg) {
        padding: 24px;
    }

    @include respond(md) {
        padding: 20px;
    }

    @include respond(sm) {
        padding: 16px;
    }

    &__title {
        text-transform: uppercase;
        margin-bottom: 24px;
        font-size: 16px;

        @include respond(md) {
            margin-bottom: 16px;
            font-size: 14px;
        }

        @include respond(sm) {
            margin-bottom: 12px;
            font-size: 13px;
        }
    }

    &__content {
        display: flex;
        overflow-x: auto;
        gap: 8px;

        @include respond(md) {
            gap: 4px;
        }

        &::-webkit-scrollbar {
            height: 6px;
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