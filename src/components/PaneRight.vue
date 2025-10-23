<template>
  <Error v-if="error" :error="errorDisplay" />
    <div v-if="data" class="stat-data">
      <div class="stat-list">
        <Stat v-for="item in statData" :key="item.label" v-bind="item" />
      </div>
      <div class="daycard-list">
        <DayCard 
        v-for="(item, i) in data.forecast.forecastday" 
        :key="item.date" 
        :weatherCode="item.day.condition.code" 
        :temp="item.day.avgtemp_c" 
        :date="new Date(item.date)"
        :is-active="activeIndex == i" 
        @click="() => emit('select-index', i)" />
      </div>
    </div>
    <CitySelect />
</template>

<script setup>
import { computed } from "vue";
import CitySelect from "./CitySelect.vue";
import Stat from "./Stat.vue";
import Error from "./Error.vue";
import DayCard from "./DayCard.vue";
import { errorMap } from "@/constants.js";

const { data, error, activeIndex } = defineProps({
  data: Object,
  error: Object,
  activeIndex: Number
})

const emit = defineEmits(['select-index'])

const statData = computed(() => {
  if (!data || !data.forecast.forecastday[activeIndex]) return [];
  
  return [
    {
      label: "Влажность",
      stat: data.forecast.forecastday[activeIndex].day.avghumidity + "%",
    },
    {
      label: "Вероятность дождя",
      stat: data.forecast.forecastday[activeIndex].day.daily_chance_of_rain + "%",
    },
    {
      label: "Ветер",
      stat: data.forecast.forecastday[activeIndex].day.maxwind_kph + "км/ч",
    },
  ];
});

const errorDisplay = computed(() => {
  if (!error) return '';
  return errorMap.get(error.code) || error.message;
})
</script>

<style scoped lang="scss">
.daycard-list {
  display: flex;
  gap: 16px;
}

.stat-data {
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin-bottom: 70px;
}

.stat-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>