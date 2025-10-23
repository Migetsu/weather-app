export const API_ENDPOINT = "https://api.weatherapi.com/v1";
export const cityProvide = Symbol('city')
export const errorMap = new Map([
  [1006, "Указанный город не найден"],
  [1003, "Параметр запроса не указан"],
  [1005, "API ключ недействителен"],
  [2006, "API ключ исчерпал лимит запросов"],
  [2007, "API ключ заблокирован"],
  [2008, "Превышен лимит запросов"],
  [2009, "API ключ не активен"],
  [9999, "Неизвестная ошибка"]
])