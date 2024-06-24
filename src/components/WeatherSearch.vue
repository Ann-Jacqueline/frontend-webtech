<template>
  <div class="weather-search">
    <input
      type="text"
      placeholder="Search City"
      class="search-control"
      v-model.trim="search"
      @keydown.enter="getData"
    />
    <span class="country" v-if="isSearched">({{ getWeatherCountry }}) - {{ currentDate }}</span>
    <span class="local-time" v-if="isSearched">{{ localTime }}</span>
    <div class="error" v-if="getError">No results found! Try again.</div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      search: this.$store.state.search
    };
  },
  computed: {
    ...mapGetters(["isSearched", "getWeatherCountry", "getError", "getTimezone"]),
    currentDate() {
      const today = new Date();
      const timezoneOffset = this.getTimezone * 1000; // Zeitverschiebung der API in Sekunden
      const localTimeOffset = new Date().getTimezoneOffset() * 60000; // Lokale Zeitverschiebung in Millisekunden
      const localDate = new Date(today.getTime() + timezoneOffset + localTimeOffset);
      return localDate.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    },
    localTime() {
      const today = new Date();
      const timezoneOffset = this.getTimezone * 1000; // API gibt Zeitzone in Sekunden zurück
      const localTimeOffset = new Date().getTimezoneOffset() * 60000; // Umrechnung der lokalen Zeitverschiebung in Millisekunden
      const localDate = new Date(today.getTime() + timezoneOffset + localTimeOffset);
      return "Lokale Zeit: " + localDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false }) + " Uhr";
    }
  },
  methods: {
    ...mapActions(["fetchWeatherData"]),
    getData() {
      this.fetchWeatherData(this.search);
    }
  }
};
</script>

<style lang="less" scoped>
.weather-search {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  .search-control {
    width: 60%;
    height: 50px;
    border: 2px solid #000;
    border-radius: 100px;
    outline: none;
    background-color: transparent;
    font-size: 20px;
    padding: 0 25px;
    transition: all 0.4s;
    font-weight: 600;


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
    margin-right: 100px;
    margin-left:20px;
    font-weight: 600;
  }

  .local-time {
    font-size: 20px;
    color:  black;
    margin-left: 50px;
    font-weight: 600;
  }

  .error {
    position: absolute;
    color: red;
    text-align: center;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 10px;
    font-size: 14px;
  }
}
</style>