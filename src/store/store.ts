import { createStore } from 'vuex';
import axios from 'axios';
import router from '@/router';

axios.defaults.withCredentials = false;

interface WeatherData {
  name?: string;
  temp?: number;
  tempMin?: number;
  tempMax?: number;
  feelsLike?: number;
  description?: string;
  icon?: string;
  info?: string;
  wind?: { speed: number };
  humidity?: number;
  clouds?: { all: number };
  country?: string;
  pressure?: number;
  visibility?: number;
  timezone?: number;
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
  description?: string;
  country?: string;
  temp?: number;
  date: string;
  localTime: string;
}

interface State {
  apiBase: string;
  apiKey: string;
  backendUrl: string;
  defaultSearch: string;
  search: string;
  weatherData: WeatherData;
  isError: boolean;
  coord: Coord;
  sys: Sys;
  timezone?: number;
  cityHistory: CityHistoryEntry[];
  userName?: string;
  tempUnit: string;
  tempUnitStored?: string;
}

const store = createStore<State>({
  state: {
    apiBase: "https://api.openweathermap.org/data/2.5/",
    apiKey: import.meta.env.VITE_APP_API_KEY,
    backendUrl: import.meta.env.VITE_APP_BACKEND_BASE_URL,
    defaultSearch: "Berlin",
    search: "",
    weatherData: {},
    isError: false,
    coord: {},
    sys: {},
    timezone: 0,
    cityHistory: [],
    userName: "",
    tempUnit: 'C',
    tempUnitStored: 'C'
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
    getTimezone: (state) => state.timezone,
    getUserName: (state) => state.userName,
    getTempUnit: (state) => state.tempUnit,
    getCityHistory: (state) => {
      if (state.cityHistory.length === 0) {
        return "You haven't searched any cities yet.";
      }
      return Array.isArray(state.cityHistory) ? state.cityHistory : [];
    }
  },
  mutations: {
    RECALCULATE_TEMPERATURES(state) {
      const convertTemp = (temp: number | undefined): number | undefined => {
        if (temp !== undefined) {
          const factor = state.tempUnit === 'C' ? 5 / 9 : 9 / 5;
          const offset = state.tempUnit === 'C' ? -32 : 32;
          return Math.round((temp + offset) * factor);
        }
        return temp;
      };

      state.weatherData.temp = convertTemp(state.weatherData.temp);
      state.weatherData.tempMin = convertTemp(state.weatherData.tempMin);
      state.weatherData.tempMax = convertTemp(state.weatherData.tempMax);
      state.weatherData.feelsLike = convertTemp(state.weatherData.feelsLike);
    },
    TOGGLE_TEMP_UNIT(state, newUnit) {
      if (state.tempUnit !== newUnit) {
        state.tempUnit = newUnit;
        this.RECALCULATE_TEMPERATURES(state);
      }
    },
    SET_DEFAULT_SEARCH(state, cityName: string) {
      const existingIndex = state.cityHistory.findIndex(city => city.name === cityName);
      if (existingIndex !== -1) {
        const existingCity = state.cityHistory[existingIndex];
        state.cityHistory.splice(existingIndex, 1);
        state.cityHistory.unshift(existingCity);
      } else {
        state.cityHistory.unshift({
          id: Date.now(),
          name: cityName,
          temp: state.weatherData.temp,
          description: state.weatherData.description,
          country: state.weatherData.country,
          date: new Date().toLocaleDateString(),
          localTime: new Date().toLocaleTimeString(),
        });
      }
      state.defaultSearch = cityName;
    },
    ADD_CITY_HISTORY(state, newCity) {
      const existingCity = state.cityHistory.find(city => city.name === newCity.name);
      if (!existingCity) {
        state.cityHistory.unshift(newCity);
        if (state.cityHistory.length > 5) {
          state.cityHistory.pop();
        }
      }
    },
    SET_SEARCH(state, search) {
      state.search = search.toLowerCase();
    },
    SET_CITY_HISTORY(state, history) {
      state.cityHistory = history;
    },
    SET_WEATHER_DATA(state, data) {
      const convertTemp = (temp: number, from: string, to: string): number => {
        if (from === to) {
          return temp;
        }
        return to === 'C' ? Math.round((temp - 32) * 5 / 9) : Math.round(temp * 9 / 5 + 32);
      };

      state.weatherData = {
        name: data.name,
        temp: convertTemp(data.main.temp, 'C', state.tempUnit),
        tempMin: convertTemp(data.main.temp_min, 'C', state.tempUnit),
        tempMax: convertTemp(data.main.temp_max, 'C', state.tempUnit),
        feelsLike: convertTemp(data.main.feels_like, 'C', state.tempUnit),
        description: data.weather[0].description,
        icon: data.weather[0].icon.substring(0, 2),
        info: data.weather[0].main,
        wind: data.wind,
        humidity: data.main.humidity,
        clouds: data.clouds,
        country: data.sys.country,
        pressure: data.main.pressure,
        visibility: data.visibility,
        timezone: data.timezone
      };
      state.tempUnitStored = state.tempUnit;
      state.coord = data.coord;
      state.sys = data.sys;
      state.timezone = data.timezone;
    },
    SET_USER_NAME(state, userName: string) {
      state.userName = userName;
    },
    REMOVE_USER_NAME(state) {
      state.userName = "";
    },
    CLEAR_CITY_HISTORY(state) {
      state.cityHistory = [];
    },
    SET_ERROR(state, value) {
      state.isError = value;
    },
    REMOVE_CITY_HISTORY(state, id: number) {
      state.cityHistory = state.cityHistory.filter(city => city.id !== id);
    },
    RESET_ERROR_STATE(state) {
      state.isError = false;
    },
  },
  actions: {
    async fetchWeatherData({ commit, state }, search) {
      commit('SET_SEARCH', search);
      try {
        const response = await axios.get(`${state.apiBase}/weather?q=${search}&appid=${state.apiKey}&units=metric`);
        const roundedData = {
          ...response.data,
          main: {
            ...response.data.main,
            temp: Math.round(response.data.main.temp),
            tempMin: Math.round(response.data.main.temp_min),
            tempMax: Math.round(response.data.main.temp_max),
            feelsLike: Math.round(response.data.main.feels_like),
          }
        };
        commit('SET_WEATHER_DATA', roundedData);
        if (search !== state.defaultSearch) {
          const localTimeOffset = new Date().getTimezoneOffset() * 60000;
          const timezoneOffset = roundedData.timezone * 1000;
          const currentDate = new Date(Date.now() + timezoneOffset + localTimeOffset);
          commit('RESET_ERROR_STATE');
          commit('ADD_CITY_HISTORY', {
            id: Date.now(),
            name: roundedData.name,
            temp: roundedData.main.temp,
            description: roundedData.weather[0].description,
            country: roundedData.sys.country,
            date: currentDate.toLocaleDateString('de-DE'),
            localTime: currentDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false })
          });
        }
      } catch (error) {
        console.error("API request failed:", error);
        commit('SET_ERROR', true);
      }
    },
    async addCityHistory({ commit, state }, cityData) {
      try {
        const response = await axios.post(`${state.backendUrl}/history`, cityData);
        commit('ADD_CITY_HISTORY', response.data);
      } catch (error) {
        console.error("Failed to add city history:", error);
      }
    },
    async loginUser({ commit }, credentials) {
      commit('SET_USER_NAME', credentials.userName);
    },
    async fetchCityHistory({ commit, state }) {
      try {
        const response = await axios.get(`${state.backendUrl}/history`);
        commit('SET_CITY_HISTORY', response.data);
      } catch (error) {
        console.error("Failed to fetch city history:", error);
      }
    },
    logOut({ commit }) {
      commit('REMOVE_USER_NAME');
      commit('CLEAR_CITY_HISTORY');
      router.push('/').then(() => {
        console.log('User logged out and redirected to home page.');
      });
    },
    pinCityAsDefault({ commit }, cityName) {
      commit('SET_DEFAULT_SEARCH', cityName);
    },
    removeCity({ commit }, id) {
      commit('REMOVE_CITY_HISTORY', id);
    },
    setUser({ commit }, userName) {
      commit('SET_USER_NAME', userName);
    }
  }
})

export default store;
