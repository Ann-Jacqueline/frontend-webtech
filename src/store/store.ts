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
  wind?: { speed: number};
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
interface CityHistoryEntry {
  id: number;
  name: string;
  description: string;
  country: string;  // Hinzufügen des Landes
  temp: number; // Aktuelle Temperatur
  date: string; // Aktuelles Datum
  localTime: string; // Lokale Zeit basierend auf der Zeitzone
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
  cityHistory: CityHistoryEntry[];
  userName?: string;
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
    timezone: 0,
    cityHistory: JSON.parse(localStorage.getItem('cityHistory') || '[]'),
  },
  getters: {
    getWeatherMain: (state) => {
      const { temp, feelsLike, description, icon, info } = state.weatherData;
      return { temp, feelsLike, description, info, icon };
    },
    getWeatherInfo: (state) => {
      return {
        windSpeed: state.weatherData.wind ? state.weatherData.wind.speed.toFixed(2) + ' m/s' : 'N/A',
        clouds: state.weatherData.clouds ? state.weatherData.clouds.all + '%' : 'N/A',
        humidity: state.weatherData.humidity ? state.weatherData.humidity + '%' : 'N/A'
      };
    },
    getWeatherCountry: (state) => state.weatherData.country,
    isSearched: (state) => state.search !== "",
    getError: (state) => state.isError,
    getCoord: (state) => state.coord,
    getSys: (state) => state.sys,
    getTimezone: (state) => state.timezone,
    getUserName: (state) => state.userName,
    getCityHistory: (state) => state.cityHistory

  },
  mutations: {
    SET_SEARCH: (state, search) => {
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
      state.sys = data.sys;
      state.timezone = data.timezone;

      const currentDate = new Date();
      const timezoneOffset = (state.timezone || 0) * 1000;
      const localTimeOffset = new Date().getTimezoneOffset() * 60000;
      const localDate = new Date(new Date().getTime() + timezoneOffset + localTimeOffset);

      state.cityHistory.push({
        id: Date.now(),
        name: data.name,
        description: data.weather[0].description,
        country: data.sys.country,
        temp: data.main.temp,
        date: currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        localTime: localDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) + "h"
      });

      // Speichern der aktualisierten Stadtgeschichte im localStorage
      localStorage.setItem('cityHistory', JSON.stringify(state.cityHistory));
    },
    SET_USER_NAME: (state, userName) => { // Mutation to set userName
      state.userName = userName;
    },
    // Weitere Mutationen
    SET_ERROR: (state, value) => {
      state.isError = value;
    },
    REMOVE_CITY_HISTORY: (state, id) => {
      const index = state.cityHistory.findIndex(city => city.id === id);
      if (index !== -1) {
        state.cityHistory.splice(index, 1);
        localStorage.setItem('cityHistory', JSON.stringify(state.cityHistory));  // Update localStorage sofort
      }
    }
  },
  actions: {
    async fetchWeatherData({ commit, state }, search) {
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
    },
    setUser({ commit }, userName) { // Action to set userName
      commit("SET_USER_NAME", userName);
    },
    removeCity({ commit }, id) {
      commit('REMOVE_CITY_HISTORY', id);
    }
  }
});

export default store;
