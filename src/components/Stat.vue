<template>
  <div class="stat">
    <div class="stat-name">{{ props.label }}</div>
    <div class="stat-value">{{ props.stat }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
    label: String,
    stat: String
})
</script>

<style scoped lang="scss">
.stat {
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    gap: 16px;

    &-name {
        font-weight: 700;
        text-transform: uppercase;
    }

    &-value {
        font-weight: 500;
    }
}
</style>