// store.ts
import { createStore } from 'vuex';
import axios from 'axios';

// Interface-Definitionen für den Zustand und Wetterdaten
interface WeatherData {
  name?: string;
  temp?: number;
  tempMin?: number;
  tempMax?: number;
  feelsLike?: number;
  description?: string;
  icon?: string;
  info?: string;
  wind?: { speed: number; deg?: number; gust?: number };
  humidity?: number;
  clouds?: { all: number };
  country?: string;
  pressure?: number;
  visibility?: number;
}

interface Coord {
  lon?: number;
  lat?: number;
}

interface Sys {
  type?: number;
  id?: number;
  country?: string;
  sunrise?: number;
  sunset?: number;
}

interface State {
  apiBase: string;
  apiKey: string;
  defaultSearch: string;
  search: string;
  weatherData: WeatherData;
  isError: boolean;
  coord: Coord;
  sys: Sys;
  timezone?: number;
}

// Vuex Store erstellen
const store = createStore<State>({
  state: {
    apiBase: "https://api.openweathermap.org/data/2.5/",
    apiKey: import.meta.env.VITE_APP_API_KEY,
    defaultSearch: "Berlin",
    search: "",
    weatherData: {},
    isError: false,
    coord: {},
    sys: {},
    timezone: 0
  },
  getters: {
    getWeatherMain: (state) => {
      const { temp, feelsLike, description, icon, info } = state.weatherData;
      return { temp, feelsLike, description, info, icon };
    },
    getWeatherInfo: (state) => {
      const { wind, clouds, humidity } = state.weatherData;
      return { wind, clouds, humidity };
    },
    getWeatherCountry: (state) => state.weatherData.country,
    isSearched: (state) => state.search !== "",
    getError: (state) => state.isError,
    getCoord: (state) => state.coord,
    getSys: (state) => state.sys,
    getTimezone: (state) => state.timezone
  },
  mutations: {
    SET_SEARCH: (state, search: string) => {
      state.search = search.toLowerCase();
    },
    SET_WEATHER_DATA: (state, data) => {
      state.weatherData = {
        name: data.name,
        temp: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        feelsLike: data.main.feels_like,
        description: data.weather[0].description,
        icon: data.weather[0].icon.substring(0, 2),
        info: data.weather[0].main,
        wind: data.wind,
        humidity: data.main.humidity,
        clouds: data.clouds,
        country: data.sys.country,
        pressure: data.main.pressure,
        visibility: data.visibility
      };
      state.coord = data.coord;
      state.sys = {
        type: data.sys.type,
        id: data.sys.id,
        country: data.sys.country,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset
      };
      state.timezone = data.timezone;
    },
    SET_ERROR: (state, value: boolean) => {
      state.isError = value;
    },
  },
  actions: {
    async fetchWeatherData({ commit, state }, search: string) {
      try {
        commit("SET_SEARCH", search);
        const url = `${state.apiBase}weather?q=${search}&appid=${state.apiKey}&units=metric`;
        const response = await axios.get(url);
        commit("SET_WEATHER_DATA", response.data);
        commit("SET_ERROR", false);
      } catch (error) {
        console.error("API request failed:", error);
        commit("SET_ERROR", true);
        commit("SET_WEATHER_DATA", {});
      }
    }
  }
});

export default store;
