import { ref, reactive } from 'vue'
import { WeatherAPI } from '../services/weatherApi.js'
import { useSettings } from './useSettings'

// Создаем состояние на уровне приложения
const weatherData = ref(null)
const loading = ref(false)
const error = ref(null)
const currentCity = ref('London')
const { settings } = useSettings()

export function useWeather() {
  // Обновляем данные при изменении настроек
  window.addEventListener('settings-changed', () => {
    if (currentCity.value) {
      fetchWeather(currentCity.value)
    }
  })

  const addToRecentCities = (cityData) => {
    const recentCities = JSON.parse(localStorage.getItem('recentCities') || '[]')
    
    // Удаляем город если он уже есть в истории
    const cityIndex = recentCities.findIndex(c => c.name === cityData.name)
    if (cityIndex !== -1) {
      recentCities.splice(cityIndex, 1)
    }
    
    // Добавляем город в начало массива
    recentCities.unshift(cityData)
    
    // Оставляем только последние 5 городов
    const updatedCities = recentCities.slice(0, 5)
    
    localStorage.setItem('recentCities', JSON.stringify(updatedCities))
  }

  const fetchWeather = async (city = 'London') => {
    loading.value = true
    error.value = null
    
    try {
      const data = await WeatherAPI.getCurrentWeather(city)
      // Сначала убедимся, что данные получены корректно
      if (!data || !data.location) {
        throw new Error('Некорректные данные о погоде')
      }
      // Обновляем состояние только после успешного получения данных
      weatherData.value = data
      currentCity.value = data.location.name // Используем точное название города из ответа API

      // Добавляем город в историю
      const cityData = {
        id: Date.now(),
        name: data.location.name,
        temp: Math.round(settings.value.temperature === 'fahrenheit' ? data.current.temp_f : data.current.temp_c),
        icon: WeatherAPI.getWeatherIcon(data.current.condition.code),
        time: new Date(data.location.localtime).toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }
      addToRecentCities(cityData)
    } catch (err) {
      error.value = err.message
      console.error('Error fetching weather:', err)
    } finally {
      loading.value = false
    }
  }

  const getCurrentWeather = () => {
    if (!weatherData.value) return null
    
    const data = weatherData.value
    return {
      city: data.location.name,
      country: data.location.country,
      temp: Math.round(settings.value.temperature === 'fahrenheit' ? data.current.temp_f : data.current.temp_c),
      tempUnit: settings.value.temperature === 'fahrenheit' ? '°F' : '°C',
      condition: data.current.condition.text,
      conditionCode: data.current.condition.code,
      icon: WeatherAPI.getWeatherIcon(data.current.condition.code),
      conditionText: WeatherAPI.getWeatherCondition(data.current.condition.code),
      chanceOfRain: data.forecast.forecastday[0].day.daily_chance_of_rain,
      humidity: data.current.humidity,
      windSpeed: settings.value.windSpeed === 'ms' ? data.current.wind_kph / 3.6 :
                settings.value.windSpeed === 'knots' ? data.current.wind_kph / 1.852 :
                data.current.wind_kph,
      windDir: data.current.wind_dir,
      pressure: settings.value.pressure === 'inches' ? data.current.pressure_in :
               settings.value.pressure === 'kpa' ? data.current.pressure_mb / 10 :
               settings.value.pressure === 'mm' ? data.current.pressure_mb * 0.75006 :
               data.current.pressure_mb,
      uv: data.current.uv,
      feelsLike: settings.value.temperature === 'fahrenheit' ? Math.round(data.current.feelslike_f) : Math.round(data.current.feelslike_c),
      visibility: settings.value.distance === 'miles' ? data.current.vis_miles : data.current.vis_km,
      sunset: data.forecast.forecastday[0].astro.sunset
    }
  }

  const getTodayForecast = () => {
    if (!weatherData.value) return []
    
    const hours = ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00']
    const today = weatherData.value.forecast.forecastday[0]
    
    return hours.map(targetHour => {
      const hour = today.hour.find(h => {
        const time = new Date(h.time)
        const hourStr = time.getHours().toString().padStart(2, '0') + ':00'
        return hourStr === targetHour
      })
      
      if (hour) {
        return {
          time: targetHour,
          temp: Math.round(settings.value.temperature === 'fahrenheit' ? hour.temp_f : hour.temp_c),
          tempUnit: settings.value.temperature === 'fahrenheit' ? '°F' : '°C',
          icon: WeatherAPI.getWeatherIcon(hour.condition.code),
          condition: WeatherAPI.getWeatherCondition(hour.condition.code)
        }
      }
      
      // Если час не найден, берем ближайший
      const defaultHour = today.hour[0]
      return {
        time: targetHour,
        temp: Math.round(settings.value.temperature === 'fahrenheit' ? defaultHour.temp_f : defaultHour.temp_c),
        tempUnit: settings.value.temperature === 'fahrenheit' ? '°F' : '°C',
        icon: WeatherAPI.getWeatherIcon(defaultHour.condition.code),
        condition: WeatherAPI.getWeatherCondition(defaultHour.condition.code)
      }
    })
  }

  const getWeekForecast = () => {
    if (!weatherData.value) return []
    
    return weatherData.value.forecast.forecastday.map((day, index) => {
      const date = new Date(day.date)
      const isToday = index === 0
      
      return {
        date: date,
        day: isToday ? 'Сегодня' : date.toLocaleDateString('ru-RU', { weekday: 'short' }),
        maxTemp: Math.round(settings.value.temperature === 'fahrenheit' ? day.day.maxtemp_f : day.day.maxtemp_c),
        minTemp: Math.round(settings.value.temperature === 'fahrenheit' ? day.day.mintemp_f : day.day.mintemp_c),
        tempUnit: settings.value.temperature === 'fahrenheit' ? '°F' : '°C',
        icon: WeatherAPI.getWeatherIcon(day.day.condition.code),
        condition: WeatherAPI.getWeatherCondition(day.day.condition.code),
        chanceOfRain: day.day.daily_chance_of_rain
      }
    })
  }

  const getAirConditions = () => {
    if (!weatherData.value) return []
    
    const current = weatherData.value.current
    const today = weatherData.value.forecast.forecastday[0]
    
    const getWindSpeedFormatted = () => {
      const speed = settings.value.windSpeed === 'ms' ? current.wind_kph / 3.6 :
                   settings.value.windSpeed === 'knots' ? current.wind_kph / 1.852 :
                   current.wind_kph
      const unit = settings.value.windSpeed === 'ms' ? 'м/с' :
                  settings.value.windSpeed === 'knots' ? 'узл' :
                  'км/ч'
      return `${Math.round(speed)} ${unit}`
    }

    const getPressureFormatted = () => {
      const pressure = settings.value.pressure === 'inches' ? current.pressure_in :
                      settings.value.pressure === 'kpa' ? current.pressure_mb / 10 :
                      settings.value.pressure === 'mm' ? current.pressure_mb * 0.75006 :
                      current.pressure_mb
      const unit = settings.value.pressure === 'inches' ? 'дюйм рт.ст.' :
                  settings.value.pressure === 'kpa' ? 'кПа' :
                  settings.value.pressure === 'mm' ? 'мм рт.ст.' :
                  'гПа'
      return `${Math.round(pressure)} ${unit}`
    }
    
    return [
      {
        icon: 'fa-solid fa-thermometer-half',
        desc: 'Ощущается как',
        value: settings.value.temperature === 'fahrenheit' ? 
          `${Math.round(current.feelslike_f)}°F` :
          `${Math.round(current.feelslike_c)}°C`
      },
      {
        icon: 'fa-solid fa-wind',
        desc: 'Ветер',
        value: getWindSpeedFormatted()
      },
      {
        icon: 'fa-solid fa-droplet',
        desc: 'Вероятность дождя',
        value: `${today.day.daily_chance_of_rain}%`
      },
      {
        icon: 'fa-solid fa-sun',
        desc: 'УФ индекс',
        value: current.uv.toString()
      },
      {
        icon: 'fa-solid fa-droplet',
        desc: 'Влажность',
        value: `${current.humidity}%`
      },
      {
        icon: 'fa-solid fa-thermometer-half',
        desc: 'По ощущениям',
        value: settings.value.temperature === 'fahrenheit' ?
          `${Math.round(current.feelslike_f)}°F` :
          `${Math.round(current.feelslike_c)}°C`
      },
      {
        icon: 'fa-solid fa-sun',
        desc: 'Закат',
        value: today.astro.sunset
      },
      {
        icon: 'fa-solid fa-gauge',
        desc: 'Давление',
        value: getPressureFormatted()
      }
    ]
  }

  return {
    weatherData,
    loading,
    error,
    currentCity,
    fetchWeather,
    getCurrentWeather,
    getTodayForecast,
    getWeekForecast,
    getAirConditions
  }
}

