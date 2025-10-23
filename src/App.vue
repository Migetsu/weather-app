<template>
  <main class="main">
    <div class="left">
      <PaneLeft :dayData="data" :activeIndex="activeIndex" />
    </div>
    <div class="right">
      <PaneRight 
      :data="data"
      :error="error"
      :active-index="activeIndex"
      @select-index="onSelectIndex" />
  </div>
  </main>
  
</template>

<script setup>
import PaneRight from "@/components/PaneRight.vue";
import PaneLeft from "@/components/PaneLeft.vue";
import { ref, provide, watch, onMounted } from "vue";
import { cityProvide, API_ENDPOINT } from "@/constants.js";

let data = ref()
let error = ref(null)
let activeIndex = ref(0)
let city = ref('Ташкент')

provide(cityProvide, city)

function onSelectIndex(i) {
  activeIndex.value = i
}

watch(city, () => {
  getCity(city.value)
})

onMounted(() => {
  getCity(city.value) 
})

async function getCity(city) {
  try {
    error.value = null;

    const params = new URLSearchParams({
      q: city,
      lang: "ru",
      key: "3077d7bf5b2846ab8e4174434252010",
      days: 3
    })
    const res = await fetch(`${API_ENDPOINT}/forecast.json?${params.toString()}`);

    if (!res.ok) {
      const errorData = await res.json();
      error.value = {
        code: errorData.error?.code,
        message: errorData.error?.message || `Ошибка ${res.status}: ${res.statusText}`
      };
      data.value = null
      return;
    }

    error.value = null;
    data.value = await res.json();
  } catch (err) {
    error.value = {
      code: 'NETWORK_ERROR',
      message: `Ошибка сети: ${err.message}`
    };
  }
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  align-items: center;
  justify-content: center;
}

.right {
  background: $color-bg-main;
  padding: 60px 50px;
  border-radius: 25px;
}

.left {
  width: 500px;
  height: 660px;
  border-radius: 30px;
  background-image: url('@/assets/images/bg-weather.svg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
