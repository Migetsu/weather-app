<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script setup>

</script>

<style scoped lang="scss">
.button {
  border: none;
  border-radius: 10px;
  background: $gradient;
  padding: 14px;
  font-family: $font;
  font-size: 20px;
  font-weight: 600;
  color: $color-primary;
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
  height: 53px;
  width: 100%;
  justify-content: center;

  &:hover {
      background: $gradient-inverted;
  }
}
</style>