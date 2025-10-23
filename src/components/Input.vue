<template>
  <input type="text" class="input" v-model="data">
</template>

<script setup>
const data = defineModel({type: String, required: true})
</script>

<style scoped lang="scss">
.input {
    color: $color-primary;
    width: 260px;
    border-radius: 10px;
    background: $color-bg-card;
    box-shadow: 1px 2px 4px 0px $color-bg-main;
    font-size: 18px;
    padding: 16px 20px;
    height: 53px;

    &::placeholder {
        color: $color-text-placeholder;
    }
}
</style>