<template>
  <div v-for="(item, index) in forecastData" :key="index" class="item">
    <p class="item-time">{{ item.time }}</p>
    <font-awesome-icon class="item-icon" :icon="item.icon" />
    <p class="item-temp">{{ item.temp }}°</p>
  </div>
</template>

<script setup>
defineProps({
  forecastData: {
    type: Array,
    default: () => [],
  },
  isCompact: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: v-bind('isCompact ? "16px" : "12px"');
  border-right: 1px solid rgba($color-secondary, 0.2);
  padding: 0 12px;
  height: 100%;
  justify-content: center;

  &:last-child {
    border-right: none;
  }

  &-time {
    font-size: v-bind('isCompact ? "14px" : "14px"');
    color: $color-primary;
    margin: 0;
    line-height: 1;
  }

  &-icon {
    width: v-bind('isCompact ? "42px" : "44px"');
    height: v-bind('isCompact ? "42px" : "32px"');
    flex-shrink: 0;
    color: gold;
  }

  &-temp {
    font-size: v-bind('isCompact ? "20px" : "20px"');
    font-weight: 600;
    color: $color-secondary;
    margin: 0;
    line-height: 1;
  }
}

@media (max-width: 768px) {
  .item {
    &-time {
      font-size: 14px;
    }

    &-icon {
      width: 48px;
      height: 36px;
    }

    &-temp {
      font-size: 20px;
    }
  }
}
</style>
