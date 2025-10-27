<template>
  <div v-for="(item, index) in visibleItems" :key="index" class="content">
    <font-awesome-icon class="content-icon" :icon="item.icon" />
    <div class="content-wrapper">
      <p class="content-desc">{{ item.desc }}</p>
      <p class="content-temp">{{ item.value }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  isExpanded: {
    type: Boolean,
    default: false,
  },
  airConditions: {
    type: Array,
    default: () => [],
  },
});

const visibleItems = computed(() => {
  return props.isExpanded
    ? props.airConditions
    : props.airConditions.slice(0, 4);
});
</script>

<style scoped lang="scss">
.content {
  display: flex;
  gap: 12px;
  padding: v-bind('isExpanded ? "16px" : "14px"');
  align-items: flex-start;
  background: $color-bg-card;
  border-radius: 12px;
  height: v-bind('isExpanded ? "100%" : "85px"');

  &-icon {
    font-size: v-bind('isExpanded ? "16px" : "16px"');
    flex-shrink: 0;
    color: $color-secondary;
    margin-top: v-bind('isExpanded ? "0" : "2px"');
  }

  &-wrapper {
    flex: 1;
    min-width: 0;
  }

  &-desc {
    font-size: 14px;
    margin-bottom: 4px;
    color: $color-primary;
    margin-top: 0;
    line-height: 1.2;
  }

  &-temp {
    font-size: 24px;
    color: $color-secondary;
    font-weight: 600;
    margin: 0;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media (max-width: 768px) {
  .content {
    &-desc {
      font-size: 14px;
    }

    &-temp {
      font-size: 24px;
    }
  }

  :deep(.conditioninfo__bottom) {
    grid-template-columns: 1fr;
  }
}
</style>
