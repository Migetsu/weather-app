const API_KEY = '3077d7bf5b2846ab8e4174434252010'
const BASE_URL = 'https://api.weatherapi.com/v1'

export class WeatherAPI {
  static async searchCities(query) {
    if (!query || query.length < 2) return []
    
    try {
      const response = await fetch(
        `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error searching cities:', error)
      return []
    }
  }

  static async getCurrentWeather(city = 'London') {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=7&aqi=yes&alerts=no`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching weather data:', error)
      throw error
    }
  }

  static getWeatherIcon(conditionCode) {
    const iconMap = {
      '1000': 'fa-solid fa-sun', // Sunny
      '1003': 'fa-solid fa-cloud-sun', // Partly cloudy
      '1006': 'fa-solid fa-cloud', // Cloudy
      '1009': 'fa-solid fa-cloud', // Overcast
      '1030': 'fa-solid fa-smog', // Mist
      '1063': 'fa-solid fa-cloud-rain', // Patchy rain
      '1066': 'fa-solid fa-snowflake', // Patchy snow
      '1069': 'fa-solid fa-cloud-rain', // Patchy sleet
      '1072': 'fa-solid fa-cloud-rain', // Patchy freezing drizzle
      '1087': 'fa-solid fa-bolt', // Thundery outbreaks
      '1114': 'fa-solid fa-snowflake', // Blowing snow
      '1117': 'fa-solid fa-snowflake', // Blizzard
      '1135': 'fa-solid fa-smog', // Fog
      '1147': 'fa-solid fa-smog', // Freezing fog
      '1150': 'fa-solid fa-cloud-rain', // Patchy light drizzle
      '1153': 'fa-solid fa-cloud-rain', // Light drizzle
      '1168': 'fa-solid fa-cloud-rain', // Freezing drizzle
      '1171': 'fa-solid fa-cloud-rain', // Heavy freezing drizzle
      '1180': 'fa-solid fa-cloud-rain', // Patchy light rain
      '1183': 'fa-solid fa-cloud-rain', // Light rain
      '1186': 'fa-solid fa-cloud-rain', // Moderate rain
      '1189': 'fa-solid fa-cloud-rain', // Moderate rain
      '1192': 'fa-solid fa-cloud-rain', // Heavy rain
      '1195': 'fa-solid fa-cloud-rain', // Heavy rain
      '1198': 'fa-solid fa-cloud-rain', // Light freezing rain
      '1201': 'fa-solid fa-cloud-rain', // Moderate freezing rain
      '1204': 'fa-solid fa-cloud-rain', // Light sleet
      '1207': 'fa-solid fa-cloud-rain', // Moderate sleet
      '1210': 'fa-solid fa-snowflake', // Patchy light snow
      '1213': 'fa-solid fa-snowflake', // Light snow
      '1216': 'fa-solid fa-snowflake', // Patchy moderate snow
      '1219': 'fa-solid fa-snowflake', // Moderate snow
      '1222': 'fa-solid fa-snowflake', // Patchy heavy snow
      '1225': 'fa-solid fa-snowflake', // Heavy snow
      '1237': 'fa-solid fa-snowflake', // Ice pellets
      '1240': 'fa-solid fa-cloud-rain', // Light rain shower
      '1243': 'fa-solid fa-cloud-rain', // Moderate rain shower
      '1246': 'fa-solid fa-cloud-rain', // Heavy rain shower
      '1249': 'fa-solid fa-cloud-rain', // Light sleet shower
      '1252': 'fa-solid fa-cloud-rain', // Moderate sleet shower
      '1255': 'fa-solid fa-snowflake', // Light snow shower
      '1258': 'fa-solid fa-snowflake', // Moderate snow shower
      '1261': 'fa-solid fa-snowflake', // Heavy snow shower
      '1264': 'fa-solid fa-snowflake', // Light shower of ice pellets
      '1273': 'fa-solid fa-bolt', // Moderate shower of ice pellets
      '1276': 'fa-solid fa-bolt', // Heavy shower of ice pellets
      '1279': 'fa-solid fa-snowflake', // Patchy light snow with thunder
      '1282': 'fa-solid fa-snowflake' // Moderate snow with thunder
    }
    
    return iconMap[conditionCode] || 'fa-solid fa-sun'
  }

  static getWeatherCondition(conditionCode) {
    const conditionMap = {
      '1000': 'Солнечно',
      '1003': 'Переменная облачность',
      '1006': 'Облачно',
      '1009': 'Пасмурно',
      '1030': 'Туман',
      '1063': 'Дождь',
      '1066': 'Снег',
      '1069': 'Мокрый снег',
      '1072': 'Морось',
      '1087': 'Гроза',
      '1114': 'Снегопад',
      '1117': 'Метель',
      '1135': 'Туман',
      '1147': 'Туман',
      '1150': 'Морось',
      '1153': 'Морось',
      '1168': 'Морозная морось',
      '1171': 'Сильная морозная морось',
      '1180': 'Легкий дождь',
      '1183': 'Легкий дождь',
      '1186': 'Умеренный дождь',
      '1189': 'Умеренный дождь',
      '1192': 'Сильный дождь',
      '1195': 'Сильный дождь',
      '1198': 'Легкий ледяной дождь',
      '1201': 'Умеренный ледяной дождь',
      '1204': 'Легкий мокрый снег',
      '1207': 'Умеренный мокрый снег',
      '1210': 'Легкий снег',
      '1213': 'Легкий снег',
      '1216': 'Умеренный снег',
      '1219': 'Умеренный снег',
      '1222': 'Сильный снег',
      '1225': 'Сильный снег',
      '1237': 'Ледяная крупа',
      '1240': 'Легкий ливень',
      '1243': 'Умеренный ливень',
      '1246': 'Сильный ливень',
      '1249': 'Легкий мокрый снег',
      '1252': 'Умеренный мокрый снег',
      '1255': 'Легкий снегопад',
      '1258': 'Умеренный снегопад',
      '1261': 'Сильный снегопад',
      '1264': 'Легкая ледяная крупа',
      '1273': 'Умеренная ледяная крупа',
      '1276': 'Сильная ледяная крупа',
      '1279': 'Легкий снег с грозой',
      '1282': 'Умеренный снег с грозой'
    }
    
    return conditionMap[conditionCode] || 'Солнечно'
  }
}

