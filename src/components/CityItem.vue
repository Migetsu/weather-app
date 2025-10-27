`
<template>
  <div class="city-item" @click="$emit('click')">
    <div class="city-item__left">
      <font-awesome-icon :icon="getWeatherIcon" class="city-item__icon" />
      <div class="city-item__info">
        <h3 class="city-item__name">{{ city.name }}</h3>
        <span class="city-item__time">{{ city.time }}</span>
      </div>
    </div>
    <div class="city-item__temp">{{ city.temp }}°</div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
});

const getWeatherIcon = computed(() => {
  return props.city.icon || "fa-solid fa-sun";
});
</script>

<style scoped lang="scss">
.city-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: $color-bg;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: lighten($color-bg, 3%);
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__icon {
    font-size: 24px;
    color: gold;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__name {
    font-size: 18px;
    font-weight: 500;
    color: $color-secondary;
    margin: 0;
  }

  &__time {
    font-size: 14px;
    color: rgba($color-secondary, 0.6);
  }

  &__temp {
    font-size: 24px;
    font-weight: 600;
    color: $color-secondary;
  }
}
</style>
