<template>
  <div id="app" class="app">
    <nav id="nav" class="nav">
      <router-link class="Tab" to="/settings">Settings</router-link>
      <router-link class="Tab" to="/account">Your Account</router-link>
      <router-link class="Tab" to="/recommendations">Weather Recommendations</router-link>
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
    ...mapGetters(["isSearched", "getUserName"]),

  },
  methods: {
    ...mapActions(["fetchWeatherData"]),
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
  --cardWidth: 100vw; // Reduzierte Breite für größere Präsenz
  --darkColor: #666;
  --cardHeight: 75vh;
  --grayColor: #999;
  --cardBgColor: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0)); // Transparenter Gradient
  --cloudAnimateTime: 150s;
  --clearAnimationTime: 120s;
  --snowAnimateTime: 15s;
  --rainAnimateTime: 70s;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Jost", sans-serif;
}

body {
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
  margin-top: 200px; // Zentriert die Karte in der App
  margin-bottom: 100px;
  border-radius: 20px;
  box-shadow: 0 0 70px #000;
  z-index: 999;
  background: var(--cardBgColor); // Verwendet den definierten Gradienten
  color: black; // Textfarbe innerhalb der Karte
}


.nav {
  z-index: 1000; // Stellen Sie sicher, dass Text und Navigation oberhalb der anderen Elemente sind
  color: black; // Schwarze Schriftfarbe für bessere Lesbarkeit
  position: fixed;
  width: 100%;
  text-align: center;
  top: 100px;
  margin-top: 0;
}


.footer-text {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  z-index: 1000;

  .link {
    color: #fff;
    font-weight: 500;
    text-shadow: 0 2px 3px #000;

    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: 480px) {
  .card {
    padding: 30px;
  }
}
</style>