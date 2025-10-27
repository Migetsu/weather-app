<template>
  <section class="conditioninfo">
    <div class="conditioninfo__top">
      <h3 class="conditioninfo__top-title">Air Conditions</h3>
      <button class="conditioninfo__top-btn" @click="toggleExpanded">
        {{ isExpanded ? "Show Less" : "See More" }}
      </button>
    </div>
    <div class="conditioninfo__bottom">
      <ConditionInfoContent
        :is-expanded="isExpanded"
        :air-conditions="airConditions"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import ConditionInfoContent from "./ConditionInfoContent.vue";
import { useWeather } from "../composables/useWeather.js";

const emit = defineEmits(["toggle-expanded"]);

const { getAirConditions } = useWeather();

const isExpanded = ref(false);

const airConditions = computed(() => getAirConditions());

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
  emit("toggle-expanded", isExpanded.value);
};
</script>

<style scoped lang="scss">
.conditioninfo {
  background: $color-bg;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    flex-shrink: 0;

    &-title {
      font-size: 16px;
      text-transform: uppercase;
      font-weight: 500;
    }

    &-btn {
      background: rgb(0, 149, 255);
      border-radius: 12px;
      padding: 8px 16px;
      color: #fff;
      font-size: 14px;
      border: none;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: rgb(0, 132, 255);
      }
    }
  }

  &__bottom {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: v-bind('isExpanded ? "16px" : "12px"');
    flex: 1;
    min-height: 0;
  }
}
</style>
