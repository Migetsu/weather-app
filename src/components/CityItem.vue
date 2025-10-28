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

  @include respond(md) {
    padding: 14px;
  }

  @include respond(sm) {
    padding: 12px;
  }

  &:hover {
    background: lighten($color-bg, 3%);
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 16px;

    @include respond(sm) {
      gap: 12px;
    }
  }

  &__icon {
    font-size: 24px;
    color: gold;

    @include respond(sm) {
      font-size: 20px;
    }
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

    @include respond(md) {
      font-size: 16px;
    }

    @include respond(sm) {
      font-size: 15px;
    }
  }

  &__time {
    font-size: 14px;
    color: rgba($color-secondary, 0.6);

    @include respond(sm) {
      font-size: 12px;
    }
  }

  &__temp {
    font-size: 24px;
    font-weight: 600;
    color: $color-secondary;

    @include respond(md) {
      font-size: 22px;
    }

    @include respond(sm) {
      font-size: 20px;
    }
  }
}
</style>

// ==================== ConditionInfo.vue ====================
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

  @include respond(lg) {
    flex: 0 0 auto;
    padding: 20px;
  }

  @include respond(md) {
    padding: 16px;
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    flex-shrink: 0;

    @include respond(md) {
      margin-bottom: 12px;
    }

    &-title {
      font-size: 16px;
      text-transform: uppercase;
      font-weight: 500;

      @include respond(md) {
        font-size: 14px;
      }

      @include respond(sm) {
        font-size: 13px;
      }
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

      @include respond(md) {
        font-size: 12px;
        padding: 6px 12px;
      }

      @include respond(sm) {
        font-size: 11px;
        padding: 6px 10px;
      }

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

    @include respond(lg) {
      flex: 0 0 auto;
      min-height: auto;
    }

    @include respond(md) {
      grid-template-columns: 1fr;
      gap: 12px;
    }
  }
}
</style>

