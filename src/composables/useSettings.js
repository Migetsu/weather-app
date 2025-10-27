import { ref, watchEffect } from 'vue'

const defaultSettings = {
  temperature: 'celsius',
  windSpeed: 'kmh',
  pressure: 'hpa',
  precipitation: 'mm',
  distance: 'km'
}

const settings = ref({ ...defaultSettings })

// Загрузка настроек из localStorage
const loadSettings = () => {
  const savedSettings = localStorage.getItem('weather-settings')
  if (savedSettings) {
    settings.value = { ...defaultSettings, ...JSON.parse(savedSettings) }
  }
}

// Обновление настроек
const updateSetting = (key, value) => {
  settings.value = {
    ...settings.value,
    [key]: value
  }
  localStorage.setItem('weather-settings', JSON.stringify(settings.value))
  
  // Перезагружаем данные о погоде после изменения настроек
  const event = new CustomEvent('settings-changed')
  window.dispatchEvent(event)
}

// Конвертеры единиц измерения
const convertTemperature = (celsius) => {
  if (settings.value.temperature === 'fahrenheit') {
    return Math.round((celsius * 9/5) + 32)
  }
  return Math.round(celsius)
}

const convertWindSpeed = (kmh) => {
  switch (settings.value.windSpeed) {
    case 'ms':
      return Math.round(kmh / 3.6)
    case 'knots':
      return Math.round(kmh / 1.852)
    default:
      return kmh
  }
}

const convertPressure = (hpa) => {
  switch (settings.value.pressure) {
    case 'inches':
      return Math.round(hpa * 0.02953 * 100) / 100
    case 'kpa':
      return Math.round(hpa / 10 * 100) / 100
    case 'mm':
      return Math.round(hpa * 0.75006)
    default:
      return hpa
  }
}

const convertDistance = (km) => {
  if (settings.value.distance === 'miles') {
    return Math.round(km * 0.621371 * 10) / 10
  }
  return km
}

const convertPrecipitation = (mm) => {
  if (settings.value.precipitation === 'inches') {
    return Math.round(mm * 0.0393701 * 100) / 100
  }
  return mm
}

const formatTime = (date) => {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: timeFormat.value === '12h'
  }
  return new Date(date).toLocaleTimeString('ru-RU', options)
}

// Получение единиц измерения
const getUnits = () => ({
  temperature: settings.value.temperature === 'fahrenheit' ? '°F' : '°C',
  windSpeed: settings.value.windSpeed,
  pressure: settings.value.pressure,
  precipitation: settings.value.precipitation === 'inches' ? 'in' : 'mm',
  distance: settings.value.distance === 'miles' ? 'mi' : 'km'
})

export function useSettings() {
  // Инициализация настроек при первом использовании
  loadSettings()

  return {
    settings,
    updateSetting,
    convertTemperature,
    convertWindSpeed,
    convertPressure,
    convertDistance,
    convertPrecipitation,
    getUnits
  }
}