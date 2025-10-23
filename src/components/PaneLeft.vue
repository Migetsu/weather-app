<template>
  <div v-if="dayData" class="pane-left">
    <div class="pane-left__header">
      <h1 class="pane-left__day">{{ dayName }}</h1>
      <p class="pane-left__date">{{ formattedDate }}</p>
      <div class="pane-left__location">
        <font-awesome-icon icon="fa-solid fa-location-dot" />
        <span>{{ city }}</span>
      </div>
    </div>

    <div class="pane-left__weather">
      <div class="pane-left__weather-icon">
        <font-awesome-icon 
          v-if="weatherCode === 1000" 
          icon="fa-solid fa-sun" 
          class="weather-icon" />
        <font-awesome-icon 
          v-else-if="weatherCode === 1003" 
          icon="fa-solid fa-cloud-sun" 
          class="weather-icon" />
        <font-awesome-icon 
          v-else-if="weatherCode === 1006" 
          icon="fa-solid fa-cloud" 
          class="weather-icon" />
        <font-awesome-icon 
          v-else-if="weatherCode === 1009" 
          icon="fa-solid fa-cloud" 
          class="weather-icon" />
        <font-awesome-icon 
          v-else-if="weatherCode === 1030" 
          icon="fa-solid fa-smog" 
          class="weather-icon" />
        <font-awesome-icon 
          v-else-if="weatherCode === 1135" 
          icon="fa-solid fa-smog" 
          class="weather-icon" />
        <font-awesome-icon 
          v-else-if="weatherCode === 1063" 
          icon="fa-solid fa-cloud-rain" 
          class="weather-icon" />
        <font-awesome-icon 
          v-else-if="weatherCode === 1066" 
          icon="fa-solid fa-snowflake" 
          class="weather-icon" />
        <font-awesome-icon 
          v-else-if="weatherCode === 1069" 
          icon="fa-solid fa-cloud-rain" 
          class="weather-icon" />
        <font-awesome-icon 
          v-else-if="weatherCode === 1072" 
          icon="fa-solid fa-cloud-rain" 
          class="weather-icon" />
        <font-awesome-icon 
          v-else-if="weatherCode === 1189" 
          icon="fa-solid fa-cloud-rain" 
          class="weather-icon" />
        <font-awesome-icon 
          v-else-if="weatherCode === 1240" 
          icon="fa-solid fa-cloud-rain" 
          class="weather-icon" />
      </div>
      <div class="pane-left__temperature">{{ temperature }}°C</div>
      <div class="pane-left__description">{{ weatherDescription }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";
import { cityProvide } from "@/constants.js";

const props = defineProps({
  dayData: Object,
  activeIndex: {
    type: Number,
    default: 0
  }
});

const city = inject(cityProvide);

const dayName = computed(() => {
  if (!props.dayData?.forecast?.forecastday?.[props.activeIndex]) return '';
  const date = new Date(props.dayData.forecast.forecastday[props.activeIndex].date);
  return date.toLocaleDateString('ru-RU', { weekday: 'long' });
});

const formattedDate = computed(() => {
  if (!props.dayData?.forecast?.forecastday?.[props.activeIndex]) return '';
  const date = new Date(props.dayData.forecast.forecastday[props.activeIndex].date);
  return date.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
});

const temperature = computed(() => {
  if (!props.dayData?.forecast?.forecastday?.[props.activeIndex]) return '';
  return Math.round(props.dayData.forecast.forecastday[props.activeIndex].day.avgtemp_c);
});

const weatherCode = computed(() => {
  if (!props.dayData?.forecast?.forecastday?.[props.activeIndex]) return null;
  return props.dayData.forecast.forecastday[props.activeIndex].day.condition.code;
});

const weatherDescription = computed(() => {
  if (!props.dayData?.forecast?.forecastday?.[props.activeIndex]) return '';
  return props.dayData.forecast.forecastday[props.activeIndex].day.condition.text;
});
</script>

<style scoped lang="scss">
.pane-left {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px 40px;
  color: white;
  position: relative;
  z-index: 1;

  &__header {
    text-align: left;
    margin-bottom: 80px;
  }

  &__day {
    font-size: 36px;
    font-weight: 700;
    margin: 0 0 8px 0;
    text-transform: capitalize;
    line-height: 1.2;
  }

  &__date {
    font-size: 20px;
    margin: 0 0 16px 0;
    opacity: 0.9;
    font-weight: 400;
  }

  &__location {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    font-size: 18px;
    opacity: 0.85;
    font-weight: 500;
  }

  &__weather {
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: auto;
    padding-bottom: 20px;
  }

  &__weather-icon {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
  }

  &__temperature {
    font-size: 64px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 5px;
  }

  &__description {
    font-size: 20px;
    opacity: 0.9;
    text-align: left;
    font-weight: 400;
    line-height: 1.3;
    max-width: 280px;
  }
}

.weather-icon {
  width: 95px;
  height: 95px;
  color: white;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}
</style>