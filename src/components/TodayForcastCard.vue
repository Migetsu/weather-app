<template>
  <div v-for="(item, index) in forecastData" :key="index" class="item">
    <p class="item-time">{{ item.time }}</p>
    <font-awesome-icon class="item-icon" :icon="item.icon" />
    <p class="item-temp">{{ item.temp }}{{ item.tempUnit }}</p>
  </div>
</template>

<script setup>
defineProps({
  forecastData: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped lang="scss">
.item {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-right: 1px solid $color-secondary;

  &:last-child {
    border-right: none;
  }

  &-time {
    font-size: 16px;
  }

  &-icon {
    width: 62px;
    height: 44px;
  }

  &-temp {
    font-size: 24px;
    font-weight: 600;
    color: $color-secondary;
  }
}
</style>
