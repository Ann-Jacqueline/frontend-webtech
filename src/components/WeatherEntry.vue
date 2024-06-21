<script>
import WeatherSearch from "@/components/WeatherSearch.vue";
import WeatherMain from "@/components/WeatherMain.vue";
import WeatherInfo from "@/components/WeatherInfo.vue";
import WeatherAnimate from "@/components/WeatherAnimate.vue";
import { mapGetters, mapActions } from "vuex";


export default {
  name: "WeatherEntry",
  components: {
    WeatherSearch,
    WeatherMain,
    WeatherInfo,
    WeatherAnimate
  },
  computed: {
    ...mapGetters(["isSearched", "getUserName", "getWeatherMain"]),
    userName() {
      return this.getUserName;
    },
    weatherInfo() {
      return this.getWeatherMain.info; // Zugriff auf den Wetterzustand
    },
    weatherClass() {
      return {
        'weather-clear': this.weatherInfo === 'Clear' || this.weatherInfo === 'Mist',
        'weather-clouds': this.weatherInfo === 'Clouds' || this.weatherInfo === 'Haze',
        'weather-rain': this.weatherInfo === 'Rain',
        'weather-snow': this.weatherInfo === 'Snow',
      };
    }
  },
  methods: {
    ...mapActions(["fetchWeatherData"]),
    initData() {
      this.fetchWeatherData(this.$store.state.defaultSearch);
    }
  },
  created() {
    this.initData();
  },
};
</script>
<template>
  <div id="app" class="app">
    <nav id="nav" class="nav" :class="weatherClass">
      <img src="@/assets/images/weatherworks ohne backround.png" alt="Logo" class="logo">
      <div class="nav-links">
        <router-link class="Tab" to="/settings">Settings</router-link>
        <router-link class="Tab" to="/account">Your Account</router-link>
        <router-link class="Tab" to="/recommendations">Weather Recommendations</router-link>
      </div>
      <div class="user-profile">
        <span class="user-name">{{ userName }}</span>
        <img src="@/assets/images/profile-pic.png" alt="User" class="user-pic">
      </div>
    </nav>
    <transition name="fade" mode="out-in" appear>
      <div class="card">
        <WeatherSearch />
        <WeatherMain />
        <WeatherInfo />
      </div>
    </transition>
    <WeatherAnimate />
  </div>
</template>

<style lang="less">
@import url("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,700;0,800;0,900;1,300;1,500&display=swap");

:root {
  --cardWidth: 100vw;
  --darkColor: #666;
  --cardHeight: 75vh;
  --grayColor: #999;
  --cardBgColor: linear-gradient(to bottom, rgba(33, 110, 139, 0), rgba(0, 0, 255, 0));
  --cloudAnimateTime: 150s;
  --clearAnimationTime: 120s;
  --snowAnimateTime: 15s;
  --rainAnimateTime: 70s;
  --header-height: 3rem;
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
  background-color: var(--dark-color);
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 1.5rem;
  z-index: 999;
}

.weather-clear {
  background-color: rgba(255, 235, 59, 0.8); /* Gelb für klares Wetter */
}

.weather-clouds {
  background-color: rgba(176, 190, 197, 0.8); /* Grau für bewölktes Wetter */
}

.weather-rain {
  background-color: rgba(33, 150, 243, 0.8); /* Blau für Regen */
}

.weather-snow {
  background-color: rgba(200, 230, 255, 0.8); /* Helles Blau für Schnee */
}

.logo {
  height: 50px;
  width: auto;
}

.nav-links {
  display: flex;
  gap: 15px;
}

.Tab {
  padding: 10px 20px;
  background-color: #eee;
  border-radius: 5px;
  font-size: larger;
  color: #333;
  &:hover {
    background-color: #ddd;
  }
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  .user-name {
    color: var(--white-color);
  }
  .user-pic {
    height: 40px;
    width: 40px;
    border-radius: 50%;
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
