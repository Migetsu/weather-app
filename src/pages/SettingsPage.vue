<template>
  <main class="settings-page">
    <h1 class="settings-title">Settings</h1>

    <section class="settings-section">
      <!-- <h2 class="settings-section__title">Units</h2> -->

      <div class="setting-group">
        <h3 class="setting-group__title">TEMPERATURE</h3>
        <div class="setting-group__options">
          <button
            :class="[
              'setting-btn',
              { active: settings.temperature === 'celsius' },
            ]"
            @click="updateSetting('temperature', 'celsius')"
          >
            Celsius
          </button>
          <button
            :class="[
              'setting-btn',
              { active: settings.temperature === 'fahrenheit' },
            ]"
            @click="updateSetting('temperature', 'fahrenheit')"
          >
            Fahrenheit
          </button>
        </div>
      </div>

      <div class="setting-group">
        <h3 class="setting-group__title">WIND SPEED</h3>
        <div class="setting-group__options">
          <button
            :class="['setting-btn', { active: settings.windSpeed === 'kmh' }]"
            @click="updateSetting('windSpeed', 'kmh')"
          >
            km/h
          </button>
          <button
            :class="['setting-btn', { active: settings.windSpeed === 'ms' }]"
            @click="updateSetting('windSpeed', 'ms')"
          >
            m/s
          </button>
          <button
            :class="['setting-btn', { active: settings.windSpeed === 'knots' }]"
            @click="updateSetting('windSpeed', 'knots')"
          >
            Knots
          </button>
        </div>
      </div>

      <div class="setting-group">
        <h3 class="setting-group__title">PRESSURE</h3>
        <div class="setting-group__options">
          <button
            :class="['setting-btn', { active: settings.pressure === 'hpa' }]"
            @click="updateSetting('pressure', 'hpa')"
          >
            hPa
          </button>
          <button
            :class="['setting-btn', { active: settings.pressure === 'inches' }]"
            @click="updateSetting('pressure', 'inches')"
          >
            Inches
          </button>
          <button
            :class="['setting-btn', { active: settings.pressure === 'kpa' }]"
            @click="updateSetting('pressure', 'kpa')"
          >
            kPa
          </button>
          <button
            :class="['setting-btn', { active: settings.pressure === 'mm' }]"
            @click="updateSetting('pressure', 'mm')"
          >
            mm
          </button>
        </div>
      </div>

      <div class="setting-group">
        <h3 class="setting-group__title">PRECIPITATION</h3>
        <div class="setting-group__options">
          <button
            :class="[
              'setting-btn',
              { active: settings.precipitation === 'mm' },
            ]"
            @click="updateSetting('precipitation', 'mm')"
          >
            Milimeters
          </button>
          <button
            :class="[
              'setting-btn',
              { active: settings.precipitation === 'inches' },
            ]"
            @click="updateSetting('precipitation', 'inches')"
          >
            Inches
          </button>
        </div>
      </div>

      <div class="setting-group">
        <h3 class="setting-group__title">DISTANCE</h3>
        <div class="setting-group__options">
          <button
            :class="['setting-btn', { active: settings.distance === 'km' }]"
            @click="updateSetting('distance', 'km')"
          >
            Kilometers
          </button>
          <button
            :class="['setting-btn', { active: settings.distance === 'miles' }]"
            @click="updateSetting('distance', 'miles')"
          >
            Miles
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useSettings } from "../composables/useSettings";

const { settings, updateSetting } = useSettings();
</script>

<style scoped lang="scss">
.settings-page {
  width: 100%;
  height: 100%;
  color: $color-secondary;
}

.settings-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 32px;
}

.settings-section {
  margin-bottom: 40px;

  &__title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 24px;
    color: rgba($color-secondary, 0.7);
  }
}

.setting-group {
  margin-bottom: 24px;

  &__title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 12px;
    color: rgba($color-secondary, 0.5);
  }

  &__options {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
}

.setting-btn {
  padding: 8px 16px;
  background: $color-bg;
  border: none;
  border-radius: 8px;
  color: $color-secondary;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: lighten($color-bg, 3%);
  }

  &.active {
    background: rgb(0, 149, 255);
    color: white;
  }
}

.setting-toggle {
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  &__label {
    flex: 1;
    font-size: 16px;
  }

  &__desc {
    font-size: 14px;
    color: rgba($color-secondary, 0.5);
    margin-left: 16px;
  }
}

// Switch стили
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin: 0 16px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
      background-color: rgb(0, 149, 255);
    }

    &:checked + .slider:before {
      transform: translateX(26px);
    }
  }
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color-secondary, 0.2);
  transition: 0.4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
}
</style>
