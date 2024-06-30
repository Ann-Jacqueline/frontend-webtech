<template>
  <div id="app" class="app">
    <nav id="nav" class="nav" :class="weatherClass">
      <div class="user-profile">
        <div class="profile-pic-container">
          <img src="@/assets/images/profile-pic.png" alt="User" class="user-pic">
          <button class="invisible-button" @click="navigateToWeather"></button>
        </div>
        <span class="user-name">{{ userName }}</span>
      </div>
      <img src="@/assets/images/weatherworks ohne backround.png" alt="Logo" class="logo">
    </nav>
    <transition name="fade" mode="out-in" appear>
      <div class="card">
        <WeatherSearch  @city-searched="logCitySearch" />
        <WeatherMain />
        <WeatherInfo />
      </div>
    </transition>
    <WeatherAnimate />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore, mapGetters, mapActions } from 'vuex';
import WeatherSearch from "@/components/WeatherSearch.vue";
import WeatherMain from "@/components/WeatherMain.vue";
import WeatherInfo from "@/components/WeatherInfo.vue";
import WeatherAnimate from "@/components/WeatherAnimate.vue";
import axios from 'axios';

export default {
  name: "WeatherEntry",
  components: {
    WeatherSearch,
    WeatherMain,
    WeatherInfo,
    WeatherAnimate
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const userName = ref('');

    const backendUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL;
    axios.defaults.withCredentials = false; // Globale Konfiguration für alle Anfragen

    async function fetchUserName() {
      try {
        const response = await axios.get(`${backendUrl}/users/current`, {
          withCredentials: true
        });
        if (response.status === 200) {
          userName.value = response.data.userName;
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error);
      }
    }

    onMounted(fetchUserName);

    function navigateToWeather() {
      router.push('/account');
    }

    async function logCitySearch(cityName, cityData) {
      try {
        const cityPayload = {
          name: cityName,
          country: cityData.country,
          temperature: cityData.temp,
          localtime: cityData.localtime,
        };

        // Send to backend
        await axios.post(`${backendUrl}/city`, cityPayload);

        // Log in store
        await store.dispatch('addCityHistory', cityPayload);
        console.log('City search logged successfully');
      } catch (error) {
        console.error('Error logging city search:', error);
      }
    }

    return {
      userName,
      navigateToWeather,
      logCitySearch
    };
  },
  computed: {
    ...mapGetters({
      isSearched: 'isSearched',
      getUserName: 'getUserName',
      getWeatherMain: 'getWeatherMain',
      weatherInfo: 'getWeatherMain' // Stellt sicher, dass dies korrekt aus dem Store abgerufen wird
    }),
    weatherClass() {
      return {
        'weather-clear': this.weatherInfo === 'Clear',
        'weather-clouds': this.weatherInfo === 'Clouds',
        'weather-rain': this.weatherInfo === 'Rain',
        'weather-snow': this.weatherInfo === 'Snow',
        'weather-thunder': this.weatherInfo === 'Thunder',
        'weather-mist': this.weatherInfo && ['Mist', 'Haze', 'Smoke', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado'].includes(this.weatherInfo)
      };
    }
  },
  methods: {
    ...mapActions({
      fetchWeatherData: 'fetchWeatherData',
      logOut: 'logOut'
    }),
    initData() {
      this.fetchWeatherData(this.$store.state.defaultSearch);
    }
  },
  created() {
    this.initData();
  }
};
</script>



<style lang="less">
@import url("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,700;0,800;0,900;1,300;1,500&display=swap");

:root {
  --cardWidth: 100vw;
  --darkColor: #666;
  --cardHeight: 85vh;
  --grayColor: #999;
  --cardBgColor: linear-gradient(to bottom, rgba(33, 110, 139, 0), rgba(0, 0, 255, 0));
  --cloudAnimateTime: 150s;
  --clearAnimationTime: 120s;
  --snowAnimateTime: 15s;
  --rainAnimateTime: 70s;
  --header-height: 4.5rem;
  --first-color: #3664F4;
  --dark-color: rgb(47, 66, 69);
  --white-color: #E6E7E9;
  --body-font: 'Poppins', sans-serif;
  --normal-font-size: .938rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Jost", sans-serif;
}

body {
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
  background-color: #000;
  overflow: hidden;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.card {
  max-width: var(--cardWidth);
  height: var(--cardHeight);
  padding: 40px;
  margin-top: 200px;
  margin-bottom: 150px;
  border-radius: 20px;
  box-shadow: 0 0 70px #000;
  z-index: 999;
  background: var(--cardBgColor);
  color: black;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: var(--header-height);
  background-color: rgba(207, 196, 196, 0.31);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 1.5rem;
  z-index: 999;
  flex-direction: row; /* Erzwingt eine Standard-Reihenfolge von links nach rechts */
}

.logo {
  order: 3; /* Logo ganz rechts */
  height: 70px;
  width: auto;
}

.nav-links {
  display: flex;
  gap: 15px;
  order: 2; /* Navigation in der Mitte */
  .Tab {
    padding: 10px 20px;
    border-radius: 5px;
    font-size: larger;
    font-weight:bolder;
    color: #000000;
    text-decoration: none;
    &:hover {
      background-color: #ddd;
      text-decoration: none;
    }
  }
}
.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  order: 1; /* Profilbild und Benutzername zuerst */
  .user-name {
    color: black;
    font-size: larger;
    font-weight:bolder;
    background-color: rgba(207, 196, 196, 0.31);
    padding:10px;
    border-radius: 5px;
  }
  .profile-pic-container {
    position: relative;
    .user-pic {
      height: 60px;
      width: 60px;
      border-radius: 50%;
    }
    .invisible-button {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      border: none;
      cursor: pointer;
    }
  }
}

@media (max-width: 768px) {
  .nav {
    justify-content: space-between;
    .nav-links {
      display: none;
    }
    .user-profile {
      position:absolute;
      right: 10px;
    }
  }
}

@media (max-width: 480px) {
  .card {
    padding: 30px;
  }
}
</style>