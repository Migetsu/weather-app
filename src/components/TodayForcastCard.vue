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
  min-width: 100px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-right: 1px solid $color-secondary;

  @include respond(md) {
    min-width: 80px;
    gap: 12px;
  }

  @include respond(sm) {
    min-width: 70px;
    gap: 10px;
  }

  @include respond(xs) {
    min-width: 60px;
    gap: 8px;
  }

  &:last-child {
    border-right: none;
  }

  &-time {
    font-size: 16px;
    margin: 0;

    @include respond(md) {
      font-size: 14px;
    }

    @include respond(sm) {
      font-size: 13px;
    }

    @include respond(xs) {
      font-size: 12px;
    }
  }

  &-icon {
    width: 62px;
    height: 44px;
    color: gold;

    @include respond(md) {
      width: 48px;
      height: 36px;
    }

    @include respond(sm) {
      width: 40px;
      height: 30px;
    }

    @include respond(xs) {
      width: 36px;
      height: 26px;
    }
  }

  &-temp {
    font-size: 24px;
    font-weight: 600;
    color: $color-secondary;
    margin: 0;

    @include respond(md) {
      font-size: 20px;
    }

    @include respond(sm) {
      font-size: 18px;
    }

    @include respond(xs) {
      font-size: 16px;
    }
  }
}
</style>