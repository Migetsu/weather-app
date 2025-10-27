<template>
  <main class="main">
    <div class="main__left">
      <CityInfo />
      <TodayForcast v-if="!isConditionExpanded" />
      <ConditionInfo @toggle-expanded="handleConditionToggle" />
    </div>
    <div class="main__right">
      <TodayForcastExpanded v-if="isConditionExpanded" :is-compact="true" />
      <WeekForecast />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CityInfo from "../components/CityInfo.vue";
import TodayForcast from "../components/TodayForcast.vue";
import TodayForcastExpanded from "../components/TodayForcastExpanded.vue";
import ConditionInfo from "../components/ConditionInfo.vue";
import WeekForecast from "../components/WeekForecast.vue";
import { useWeather } from "../composables/useWeather.js";

const { fetchWeather, weatherData } = useWeather();

const isConditionExpanded = ref(false);

const handleConditionToggle = (expanded) => {
  isConditionExpanded.value = expanded;
};

onMounted(async () => {
  // Если нет данных о погоде, загружаем для Лондона по умолчанию
  if (!weatherData.value) {
    await fetchWeather("London");
  }
});
</script>

<style scoped lang="scss">
.main {
  display: flex;
  gap: 20px;
  flex: 1;
  min-height: 0; // Важно для корректной работы flex
  overflow: hidden;

  &__left {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 0; // Важно для корректной работы flex
    overflow: hidden;

    > * {
      flex-shrink: 0; // Предотвращает сжатие компонентов
    }

    > :last-child {
      flex: 1; // Последний элемент растягивается на оставшееся пространство
      min-height: 0; // Позволяет компоненту сжиматься
    }
  }

  &__right {
    flex: 1;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 0;
    overflow: hidden;

    // Стили для режима с развернутым ConditionInfo (когда нажата кнопка See More)
    &:has(.todayforcast--compact) {
      .weekforecast {
        flex: 1;
        height: calc(100% - 202px - 20px); // Вычитаем высоту TodayForcast и gap
      }
    }

    // Стили для обычного режима
    &:not(:has(.todayforcast--compact)) {
      .weekforecast {
        flex: 1;
      }
    }
  }
}

@media (max-width: 1024px) {
  .main {
    flex-direction: column;

    &__right {
      min-width: auto;
    }
  }
}
</style>
