
<script>
import WeatherSearch from "@/components/WeatherSearch.vue";
import WeatherMain from "@/components/WeatherMain.vue";
import WeatherAnimate from "@/components/WeatherAnimate.vue";
import { mapGetters, mapActions, useStore } from "vuex";
import { useRouter } from 'vue-router';

export default {
  name: "Weather Recommendations",
  components: {
    WeatherSearch,
    WeatherMain,
    WeatherAnimate
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    return {
      router,
      store
    };
  },
  data() {
    return {
      search: this.$store.state.search
    };
  },
  computed: {
    ...mapGetters(["isSearched", "getUserName", "getWeatherMain","getWeatherCountry", "getError"]),
    userName() {
      // Using Vuex getter or localStorage as fallback
      return this.getUserName || localStorage.getItem('userName');
    },
    weatherInfo() {
      return this.getWeatherMain.info;
    },
    placeholder() {
      return this.defaultSearch;
    },
    weatherClass() {
      return {
        'weather-clear': this.weatherInfo === 'Clear',
        'weather-clouds': this.weatherInfo === 'Clouds',
        'weather-rain': this.weatherInfo === 'Rain',
        'weather-snow': this.weatherInfo === 'Snow',
        'weather-thunder': this.weatherInfo === 'Thunder',
        'weather-mist': this.weatherInfo === 'Mist' || this.weatherInfo === 'Haze',

      };
    }
  },
  methods: {
    ...mapActions(["fetchWeatherData", "logOut"]),
    getData() {
      this.fetchWeatherData(this.search);
    },
    initData() {
      this.fetchWeatherData(this.$store.state.defaultSearch);
    },
  },
  created() {
    if (!this.userName && localStorage.getItem('userName')) {
      this.$store.dispatch('setUser', localStorage.getItem('userName'));
    }
    this.initData();
  }
};
</script>

<template>
  <div class="weather-recommendations">
    <hr class="line">
    <nav id="nav" class="nav" :class="weatherClass">
      <div class="user-profile">
        <img src="../../assets/images/profile-pic.png" alt="User" class="user-pic">
        <span class="user-name">{{ userName }}</span>
      </div>
      <img src="../../assets/images/weatherworks%20ohne%20backround.png" alt="Logo" class="logo">
      <div class="nav-links">
        <router-link class="Tab" to="/account">Your Account</router-link>
        <router-link class="Tab" to="/weather">Weather Search</router-link>
      </div>
    </nav>
    <div class="card">
      <!-- Card Search zuerst platzieren -->
      <div class="card-search">
        <input
          type="text"
          :placeholder="placeholder"
          class="search-control"
          v-model.trim="search"
          @keydown.enter="getData"
        />
        <span class="country" v-if="isSearched">({{ getWeatherCountry }})</span>
        <div class="error" v-if="getError">No results found! Try again.</div>
        <WeatherMain />
      </div>

      <!-- Weather Animate folgt -->
      <WeatherAnimate />
    </div>
  </div>
</template>


<style lang="less" scoped>
.weather-recommendations {
  position: relative; /* Stelle sicher, dass diese Klasse relativ positioniert ist */
  background-color: green; /* Grüner Hintergrund */
  width: 100vw; /* Vollständige Ansichtsbreite */
  height: 100vh; /* Vollständige Ansichtshöhe */
  z-index: 1; /* Niedriger z-index */
}

.line {
  border-color: #133E4D; /* Setze die Farbe des Rahmens */
  border-style: solid; /* Stelle sicher, dass der Stil des Rahmens festgelegt ist */
  border-width: 1px 0 0 0; /* Nur die obere Kante des hr ist sichtbar */
  z-index: 2;
  top: 40%;
  position: relative;
}


  .card-search {
    z-index: 999;
    position: fixed;
    right: 14vw;
    top: 30vh;
  }

  .search-control {
    width: 30%;
    height: 50px;
    border: 2px solid #000;
    border-radius: 100px;
    outline: none;
    background-color: transparent;
    font-size: 20px;
    padding: 0 25px;
    transition: all 0.4s;
    font-weight: 600;
    position: fixed;
    right: 10vh;
    top: 25vh;

    &::placeholder {
      color: #000;
    }

    &:focus {
      background-color: #fff;
      box-shadow: 0 8px 16px #000;
      border-color: #000;
      font-weight: 600;

      &::placeholder {
        font-weight: 400;
      }
    }
  }

  .country {
    flex-grow: 1;
    text-align: right;
    color: black;
    font-size: 20px;
    padding-right: 80px;
    position: relative;
    right: -28vh;
    font-weight: 600;
    bottom: 3.5vh;
  }

  .weather-recommendations .card {
    position: fixed;
    width: 90vw; /* Anpassbar nach Bedarf */
    max-width: 600px; /* Anpassbar nach Bedarf */
    background: rgba(30, 30, 30, 0); /* Hintergrund der Karte */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgb(0, 0, 0);
    margin: 20px auto;
    overflow: hidden; /* Wichtig, damit die Animationen innerhalb der Karte bleiben */
    right: 0;
    top: 9.5vh;
    z-index: 2;
    order: 2;
  }
.weather-animate {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 0; /* Niedriger als die Karte */
  opacity: 0.5; /* Teilweise transparent, um grünen Hintergrund durchscheinen zu lassen */
}

  @media (max-width: 768px) {
    .nav {
      justify-content: space-between;

      .nav-links {
        display: none;
      }

      .user-profile {
        position: absolute;
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
