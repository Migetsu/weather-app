<template>
  <div class="city-select">
    <div v-if="isEdited" class="city-input">
      <Input v-focus placeholder="Введите город" v-model="inputValue" @keyup.enter="select()" />
      <Button @click="select()"> Сохранить </Button>
    </div>
    <Button v-else @click="edit()">
      <font-awesome-icon class="button-icon" icon="fa-solid fa-location-dot" />
      Изменить город
    </Button>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import Button from "./Button.vue";
import Input from "./Input.vue";
import { cityProvide } from "@/constants.js";

let isEdited = ref(false);
const city = inject(cityProvide);
const inputValue = ref(city.value);

const vFocus = {
  mounted: (el) => {
    el.focus();
  },
}

function select() {
  isEdited.value = false;
  city.value = inputValue.value;
}

function edit() {
  isEdited.value = true;
}
</script>

<style scoped lang="scss">
.city-select {
  width: 420px;
}
.city-input {
  display: flex;
  gap: 12px;
  align-items: center;
}

.button-icon {
  width: 24px;
  height: 24px;
}
</style>
