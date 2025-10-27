<script setup></script>

<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__list-item navbar-logo">
        <img src="@/assets/images/logo.png" alt="" />
      </li>
      <li class="navbar__list-item">
        <router-link to="/" class="navbar__list-link">
          <font-awesome-icon
            class="navbar__list-icon"
            icon="fa-solid fa-cloud-sun-rain"
          />
          Weather
        </router-link>
      </li>
      <li class="navbar__list-item">
        <router-link to="/cities" class="navbar__list-link">
          <font-awesome-icon
            class="navbar__list-icon"
            icon="fa-solid fa-bars"
          />
          Cities
        </router-link>
      </li>
      <li class="navbar__list-item">
        <router-link to="/settings" class="navbar__list-link">
          <font-awesome-icon
            class="navbar__list-icon"
            icon="fa-solid fa-sliders"
          />
          Settings
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.navbar {
  padding: 16px;
  background: $color-bg;
  border-radius: 16px;
  height: calc(100vh - 64px);

  @include respond(md) {
    height: auto;
    margin-bottom: 16px;
  }

  &-logo {
    width: 64px;
    height: 64px;

    @include respond(md) {
      display: none;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;

    @include respond(md) {
      flex-direction: row;
      justify-content: space-around;
      gap: 16px;
    }

    &-icon {
      width: 24px;
      height: 24px;

      @include respond(sm) {
        width: 20px;
        height: 20px;
      }
    }

    &-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      color: $color-primary;
      font-size: 16px;
      transition: all 0.3s ease;

      @include respond(md) {
        flex-direction: row;
        gap: 4px;
      }

      @include respond(sm) {
        font-size: 14px;
      }

      &:hover {
        color: $color-secondary;
      }
    }
  }
}
</style>
