// store.ts
import { createStore } from 'vuex';
import axios from 'axios';
import router from '@/router'

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
  country?: string;  // Hinzufügen des Landes
  temp?: number; // Aktuelle Temperatur
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
  showNav: boolean;
  tempUnit: string; // 'C' für Celsius, 'F' für Fahrenheit
  tempUnitStored: string; // Die Einheit, in der die aktuellen Daten gespeichert sind.
}


// Vuex Store erstellen
const store = createStore<State>({
  state: {
    apiBase: "https://api.openweathermap.org/data/2.5/",
    apiKey: import.meta.env.VITE_APP_API_KEY,
    defaultSearch: localStorage.getItem('defaultSearch') || "Berlin",
    search: "",
    weatherData: {},
    isError: false,
    coord: {},
    sys: {},
    timezone: 0,
    cityHistory: JSON.parse(localStorage.getItem('cityHistory') || '[]'),
    userName: localStorage.getItem('userName') || "",
    showNav: true,
    tempUnit: 'C', // Standardmäßig Celsius
    tempUnitStored: 'C' // Die Einheit, in der die aktuellen Daten gespeichert sind.
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
    getTempUnit: (state) => state.tempUnit,
    getCityHistory: (state) => {
      if (state.cityHistory.length === 0) {
        return "You haven't searched any cities yet.";
      }
      return state.cityHistory;
    }

  },
  mutations: {
    RECALCULATE_TEMPERATURES(state) {
      // Definiere die Funktion mit expliziter Typangabe für den Parameter temp
      const convertTemp = (temp: number | undefined): number | undefined => {
        if (temp !== undefined) {
          const factor = state.tempUnit === 'C' ? 5 / 9 : 9 / 5;
          const offset = state.tempUnit === 'C' ? -32 : 32;
          return Math.round((temp + offset) * factor);
        }
        return temp; // Rückgabe des unveränderten Werts, falls undefined
      };

      // Anwenden der Umrechnungsfunktion auf alle Temperaturwerte
      state.weatherData.temp = convertTemp(state.weatherData.temp);
      state.weatherData.tempMin = convertTemp(state.weatherData.tempMin);
      state.weatherData.tempMax = convertTemp(state.weatherData.tempMax);
      state.weatherData.feelsLike = convertTemp(state.weatherData.feelsLike);
    },

    // Umschalten der Temperatureinheit und Auslösen der Temperaturumrechnung
    TOGGLE_TEMP_UNIT(state, newUnit) {
      if (state.tempUnit !== newUnit) {
        state.tempUnit = newUnit;
        // Trigger a re-calculation of temperatures
        this.RECALCULATE_TEMPERATURES(state);
      }
    },
    SET_DEFAULT_SEARCH(state, cityName) {
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
      localStorage.setItem('defaultSearch', cityName);
      localStorage.setItem('cityHistory', JSON.stringify(state.cityHistory));
    },
    ADD_CITY_HISTORY(state, newCity) {
      const existingIndex = state.cityHistory.findIndex(city => city.name === newCity.name);
      if (existingIndex !== -1) {
        state.cityHistory.splice(existingIndex, 1);
      }
      if (state.cityHistory.length >= 5) {
        state.cityHistory.pop();
      }
      state.cityHistory.unshift(newCity);
      localStorage.setItem('cityHistory', JSON.stringify(state.cityHistory));
    },
    SET_SEARCH(state, search) {
      state.search = search.toLowerCase();
    },
    SET_WEATHER_DATA(state, data) {
      const convertTemp = (temp: number, from: string, to: string): number => {
        if (from === to) {
          return temp; // Keine Umrechnung notwendig
        }
        return to === 'C' ? Math.round((temp - 32) * 5 / 9) : Math.round(temp * 9 / 5 + 32);
      };

      // Stelle sicher, dass die Temperaturen in der gespeicherten Einheit konvertiert werden
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
      state.tempUnitStored = state.tempUnit; // Aktualisiere die gespeicherte Einheit
      // Save coordination and time data
      state.coord = data.coord;
      state.sys = data.sys;
      state.timezone = data.timezone;
    },
    SET_USER_NAME(state, userName) {
      state.userName = userName;
      localStorage.setItem('userName', userName);
    },
    REMOVE_USER_NAME(state) {
      // Remove Username from state and local storage
      state.userName = "";
      localStorage.removeItem('userName');
    },
    CLEAR_CITY_HISTORY(state) {
      state.cityHistory = [];
    },
    SET_ERROR(state, value) {
      // Set error state
      state.isError = value;
    },
    REMOVE_CITY_HISTORY(state, id) {
      // Remove a city from the history by ID
      const index = state.cityHistory.findIndex(city => city.id === id);
      if (index !== -1) {
        state.cityHistory.splice(index, 1);
        localStorage.setItem('cityHistory', JSON.stringify(state.cityHistory));
      }
    },
    RESET_ERROR_STATE(state) {
      state.isError = false;
    },
    setShowNav(state, value) {
      // Toggle navigation visibility
      state.showNav = value;
    }
  },
    actions: {
      async fetchWeatherData({ commit, state }, search) {
        commit('SET_SEARCH', search);
        try {
          const response = await axios.get(`${state.apiBase}weather?q=${search}&appid=${state.apiKey}&units=metric`);
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
            // Die lokale Systemzeitzone in Millisekunden umwandeln und subtrahieren
            const localTimeOffset = new Date().getTimezoneOffset() * 60000;

            // Zeitzone der API in Millisekunden umrechnen
            const timezoneOffset = roundedData.timezone * 1000;

            // Berechnung des korrekten Datums und der korrekten Uhrzeit für die spezifische Zeitzone
            const currentDate = new Date(Date.now() + timezoneOffset + localTimeOffset);
            commit('RESET_ERROR_STATE'); // Reset error state after successful fetch

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
      pinCityAsDefault({ commit }, cityName) {
        commit('SET_DEFAULT_SEARCH', cityName);
      },
      logOut({ commit }) {
        commit('REMOVE_USER_NAME');
        commit('CLEAR_CITY_HISTORY'); // Stellt sicher, dass du diese Mutation in deinen Mutationen definiert hast

        // Entferne spezifische Einträge aus dem localStorage
        localStorage.removeItem('userName');
        localStorage.removeItem('cityHistory');
        localStorage.removeItem('defaultSearch');

        // Leite den Benutzer zur Startseite weiter
        router.push('/').then(() => {
          console.log('User logged out and redirected to home page.');
        });
      },

      removeCity({ commit }, id) {
        commit('REMOVE_CITY_HISTORY', id);
      },
      resetErrorState({ commit }) {
        commit('RESET_ERROR_STATE');
      },
      setUser({ commit }, userName) {
        commit('SET_USER_NAME', userName);
      }
    }
})

export default store