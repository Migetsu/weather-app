<template>
  <div class="app-container">
    <Navbar />
    <div class="page-content">
      <Search />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Search from "@/components/Search.vue";
</script>

<style scoped lang="scss">
.app-container {
  display: flex;
  gap: 48px;
  height: 100vh;
  padding: 32px;
  box-sizing: border-box;
  overflow: hidden;

  @include respond(md) {
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    overflow-y: auto;
  }

  @include respond(sm) {
    gap: 16px;
    padding: 16px;
  }
}

.page-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 0;

  @include respond(md) {
    gap: 16px;
  }

  @include respond(sm) {
    gap: 12px;
  }
}
</style>
