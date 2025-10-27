`
<template>
  <main class="cities-page">
    <div class="cities-list">
      <div
        v-for="city in recentCities"
        :key="city.id"
        class="city-card"
        @click="handleCitySelect(city)"
      >
        <div class="city-card__header">
          <div class="city-card__icon">
            <font-awesome-icon :icon="city.icon" />
          </div>
          <div class="city-card__temp">{{ city.temp }}°</div>
        </div>
        <div class="city-card__name">{{ city.name }}</div>
        <div class="city-card__time">{{ city.time }}</div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useWeather } from "../composables/useWeather";

const router = useRouter();
const { fetchWeather } = useWeather();
const recentCities = ref([]);

const loadRecentCities = () => {
  const savedCities = localStorage.getItem("recentCities");
  if (savedCities) {
    recentCities.value = JSON.parse(savedCities);
  }
};

const handleCitySelect = async (city) => {
  try {
    // Сначала переходим на главную
    await router.push("/");
    // После перехода обновляем данные о погоде
    await fetchWeather(city.name);
  } catch (error) {
    console.error("Ошибка при загрузке данных города:", error);
  }
};

onMounted(() => {
  loadRecentCities();
});
</script>

<style scoped lang="scss">
.cities-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cities-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  overflow-y: auto;
  min-height: 0; // Важно для корректной работы flex и overflow
  margin: 0;

  // Стилизация скроллбара
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba($color-secondary, 0.2);
    border-radius: 3px;
  }
}

.city-card {
  background: $color-bg;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0; // Предотвращает сжатие карточек
  min-height: 100px; // Фиксированная минимальная высота для единообразия

  &:hover {
    background: lighten($color-bg, 3%);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  &__icon {
    font-size: 24px;
    color: gold;
  }

  &__temp {
    font-size: 24px;
    font-weight: 600;
    color: $color-secondary;
  }

  &__name {
    font-size: 18px;
    font-weight: 500;
    color: $color-secondary;
    margin-bottom: 4px;
  }

  &__time {
    font-size: 14px;
    color: rgba($color-secondary, 0.6);
  }
}
</style>
