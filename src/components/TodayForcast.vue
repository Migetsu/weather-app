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

    &__title {
        text-transform: uppercase;
        margin-bottom: 24px;
    }

    &__content {
        display: flex;
    }
}
</style>