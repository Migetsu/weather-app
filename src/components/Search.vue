<template>
  <div class="search-container">
    <div class="search-wrapper" :class="{ active: isDropdownVisible }">
      <form @submit.prevent="handleSubmit" class="search-form">
        <input
          class="search"
          type="text"
          placeholder="Поиск городов..."
          v-model="searchQuery"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown.down.prevent="handleArrowDown"
          @keydown.up.prevent="handleArrowUp"
          autocomplete="off"
        />
      </form>
      <div
        class="search-dropdown"
        v-show="isDropdownVisible && cities.length > 0"
      >
        <div
          v-for="(city, index) in cities"
          :key="city.id"
          class="search-dropdown-item"
          :class="{ active: selectedIndex === index }"
          @mousedown.prevent="selectCity(city)"
          @mouseover="selectedIndex = index"
        >
          <span class="city-name">{{ city.name }}</span>
          <span class="city-region">{{ city.country }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onUnmounted } from "vue";
import { WeatherAPI } from "../services/weatherApi.js";
import { useWeather } from "../composables/useWeather";

const { fetchWeather } = useWeather();

const searchQuery = ref("");
const cities = ref([]);
const isDropdownVisible = ref(false);
const selectedIndex = ref(-1);
const isLoading = ref(false);
let debounceTimer = null;

onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
});

watch(searchQuery, () => {
  handleInput();
});

const handleInput = () => {
  if (debounceTimer) clearTimeout(debounceTimer);

  debounceTimer = setTimeout(async () => {
    if (searchQuery.value.length >= 2) {
      isLoading.value = true;
      try {
        const results = await WeatherAPI.searchCities(searchQuery.value);
        cities.value = results;
        isDropdownVisible.value = results.length > 0;
        selectedIndex.value = -1;
      } catch (error) {
        console.error("Ошибка при поиске городов:", error);
        cities.value = [];
      } finally {
        isLoading.value = false;
      }
    } else {
      cities.value = [];
      isDropdownVisible.value = false;
    }
  }, 300);
};

const handleSubmit = async () => {
  if (selectedIndex.value >= 0 && cities.value[selectedIndex.value]) {
    await selectCity(cities.value[selectedIndex.value]);
  } else if (searchQuery.value.length >= 2) {
    const cityToSearch = cities.value[0]
      ? cities.value[0].name
      : searchQuery.value;
    await fetchWeather(cityToSearch);
    resetDropdown();
  }
};

const handleFocus = () => {
  if (searchQuery.value.length >= 2 && cities.value.length > 0) {
    isDropdownVisible.value = true;
  }
};

const handleBlur = () => {
  setTimeout(() => {
    resetDropdown();
  }, 200);
};

const handleArrowDown = () => {
  if (cities.value.length > 0) {
    isDropdownVisible.value = true;
    selectedIndex.value = (selectedIndex.value + 1) % cities.value.length;
    scrollSelectedIntoView();
  }
};

const handleArrowUp = () => {
  if (cities.value.length > 0) {
    isDropdownVisible.value = true;
    selectedIndex.value =
      selectedIndex.value <= 0
        ? cities.value.length - 1
        : selectedIndex.value - 1;
    scrollSelectedIntoView();
  }
};

const scrollSelectedIntoView = () => {
  nextTick(() => {
    const activeItem = document.querySelector(".search-dropdown-item.active");
    if (activeItem) {
      activeItem.scrollIntoView({ block: "nearest" });
    }
  });
};

const selectCity = async (city) => {
  searchQuery.value = city.name;
  await fetchWeather(city.name);
  resetDropdown();
};

const resetDropdown = () => {
  isDropdownVisible.value = false;
  selectedIndex.value = -1;
};
</script>

<style scoped lang="scss">
.search-container {
  width: 100%;
  max-width: 1980px;
  margin-bottom: 32px;

  @include respond(lg) {
    margin-bottom: 24px;
  }

  @include respond(md) {
    margin-bottom: 16px;
  }
}

.search-wrapper {
  position: relative;
  width: 100%;

  &.active .search {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.search-form {
  width: 100%;
}

.search {
  padding: 8px 16px;
  background: $color-bg;
  border-radius: 12px;
  max-width: 840px;
  width: 100%;
  height: 48px;
  color: $color-secondary;
  border: 2px solid transparent;
  transition: all 0.2s ease;

  @include respond(md) {
    height: 44px;
    padding: 8px 14px;
  }

  @include respond(sm) {
    height: 40px;
    padding: 6px 12px;
    font-size: 14px;
  }

  &:focus {
    outline: none;
    border-color: rgba($color-secondary, 0.3);
  }

  &::placeholder {
    color: rgba($color-secondary, 0.6);
  }
}

.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: $color-bg;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;

  @include respond(md) {
    max-height: 250px;
  }

  @include respond(sm) {
    max-height: 200px;
  }

  &-item {
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s ease;

    @include respond(md) {
      padding: 10px 14px;
    }

    @include respond(sm) {
      padding: 8px 12px;
    }

    &:hover {
      background-color: rgba($color-secondary, 0.1);
    }

    .city-name {
      font-weight: 500;
      color: $color-secondary;

      @include respond(sm) {
        font-size: 14px;
      }
    }

    .city-region {
      font-size: 14px;
      color: rgba($color-secondary, 0.6);

      @include respond(sm) {
        font-size: 12px;
      }
    }

    &.active {
      background-color: rgba($color-secondary, 0.1);
    }
  }

  &::-webkit-scrollbar {
    width: 8px;

    @include respond(sm) {
      width: 6px;
    }
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba($color-secondary, 0.2);
    border-radius: 4px;
  }
}
</style>
