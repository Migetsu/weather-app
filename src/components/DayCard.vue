<template>
    <button class="day-card" :class="{ active: isActive }">
        <font-awesome-icon class="day-card__icon" v-if="weatherCode === 1000" icon="fa-solid fa-sun" />
        <font-awesome-icon class="day-card__icon" v-else-if="weatherCode === 1003" icon="fa-solid fa-cloud-sun" />
        <font-awesome-icon class="day-card__icon" v-else-if="weatherCode === 1006" icon="fa-solid fa-cloud" />
        <font-awesome-icon class="day-card__icon" v-else-if="weatherCode === 1009" icon="fa-solid fa-cloud" />
        <font-awesome-icon class="day-card__icon" v-else-if="weatherCode === 1030" icon="fa-solid fa-smog" />
        <font-awesome-icon class="day-card__icon" v-else-if="weatherCode === 1135" icon="fa-solid fa-smog" />
        <font-awesome-icon class="day-card__icon" v-else-if="weatherCode === 1063" icon="fa-solid fa-cloud-rain" />
        <font-awesome-icon class="day-card__icon" v-else-if="weatherCode === 1066" icon="fa-solid fa-snowflake" />
        <font-awesome-icon class="day-card__icon" v-else-if="weatherCode === 1069" icon="fa-solid fa-cloud-rain" />
        <font-awesome-icon class="day-card__icon" v-else-if="weatherCode === 1072" icon="fa-solid fa-cloud-rain" />
        <font-awesome-icon class="day-card__icon" v-else-if="weatherCode === 1189" icon="fa-solid fa-cloud-rain" />
        <font-awesome-icon class="day-card__icon" v-else-if="weatherCode === 1240" icon="fa-solid fa-cloud-rain" />
         <div class="day-card__day">
            {{ date.toLocaleDateString('ru-RU', { weekday: 'short' }) }}
         </div>
         <div class="day-card__temperature">
            {{ temp }} °C
         </div>
    </button>
</template>

<script setup>
const { weatherCode, temp, date, isActive } = defineProps({
    weatherCode: Number,
    temp: Number,
    date: Date,
    isActive: Boolean
})
</script>

<style scoped lang="scss">
.day-card {
    color: $color-primary;
    padding: 20px 24px;
    background-color: $color-bg-card;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    border-radius: 10px;
    box-shadow: 1px 2px 4px 0px #222831;
    cursor: pointer;
    transition: all .3s ease;
    width: 100%;

    &:not(.active):hover {
        background-color: #3A434F;
    }

    &__day {
        font-size: 20px;
    }

    &__temperature {
        font-size: 20px;
        font-weight: 700;
    }

    &__icon {
        width: 44px;
        height: 44px;
    }
}

.active {
    background-color: $color-primary;
    color: $color-primary-inverted;
}
</style>