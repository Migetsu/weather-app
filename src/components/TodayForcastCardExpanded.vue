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
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: v-bind('isCompact ? "16px" : "12px"');
  border-right: 1px solid rgba($color-secondary, 0.2);
  padding: 0 12px;
  height: 100%;
  justify-content: center;

  @include respond(md) {
    min-width: 70px;
    padding: 0 8px;
    gap: 10px;
  }

  @include respond(sm) {
    min-width: 60px;
    padding: 0 6px;
    gap: 8px;
  }

  @include respond(xs) {
    min-width: 55px;
    padding: 0 4px;
    gap: 6px;
  }

  &:last-child {
    border-right: none;
  }

  &-time {
    font-size: v-bind('isCompact ? "14px" : "14px"');
    color: $color-primary;
    margin: 0;
    line-height: 1;

    @include respond(md) {
      font-size: 13px;
    }

    @include respond(sm) {
      font-size: 12px;
    }

    @include respond(xs) {
      font-size: 11px;
    }
  }

  &-icon {
    width: v-bind('isCompact ? "42px" : "44px"');
    height: v-bind('isCompact ? "42px" : "32px"');
    flex-shrink: 0;
    color: gold;

    @include respond(md) {
      width: 36px;
      height: 30px;
    }

    @include respond(sm) {
      width: 32px;
      height: 26px;
    }

    @include respond(xs) {
      width: 28px;
      height: 22px;
    }
  }

  &-temp {
    font-size: v-bind('isCompact ? "20px" : "20px"');
    font-weight: 600;
    color: $color-secondary;
    margin: 0;
    line-height: 1;

    @include respond(md) {
      font-size: 18px;
    }

    @include respond(sm) {
      font-size: 16px;
    }

    @include respond(xs) {
      font-size: 14px;
    }
  }
}
</style>
