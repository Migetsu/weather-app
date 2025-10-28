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
    padding: 12px;
  }

  @include respond(sm) {
    padding: 10px;
    margin-bottom: 12px;
  }

  &-logo {
    width: 64px;
    height: 64px;

    @include respond(md) {
      display: none;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
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

    @include respond(sm) {
      gap: 12px;
    }

    &-icon {
      width: 24px;
      height: 24px;

      @include respond(sm) {
        width: 20px;
        height: 20px;
      }

      @include respond(xs) {
        width: 18px;
        height: 18px;
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

      @include respond(xs) {
        font-size: 12px;
        gap: 3px;
      }

      &:hover {
        color: $color-secondary;
      }
    }
  }
}
</style>
