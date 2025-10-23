<template>
  <div v-if="props.error" class="error">
    <p>{{ props.error }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
    error: [String, Object]
})
</script>

<style scoped lang="scss">
.error {
    font-size: 18px;
    padding: 15px;
    text-align: center;
    background: $color-bg-card;
    border-radius: 0px 0px 25px 25px;
    margin-top: -60px;
    margin-bottom: 60px;
}
</style>