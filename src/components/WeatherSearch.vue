<template>
  <div class="weather-search">
    <input
        type="text"
        placeholder="Search City"
        class="search-control"
        v-model.trim="search"
        @keydown.enter="getData"
    />
    <div class="info-container" v-if="isSearched">
      <span class="country">({{ getWeatherCountry }})</span>
      <span class="date">{{ currentDate }}</span>
      <span class="local-time">{{ localTime }}</span>
      <div class="error" v-if="getError">No results found! Try again.</div>
    </div>
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
      const timezoneOffset = this.getTimezone * 1000;
      const localTimeOffset = new Date().getTimezoneOffset() * 60000;
      const localDate = new Date(today.getTime() + timezoneOffset + localTimeOffset);
      return localDate.toLocaleDateString('en-EN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    },
    localTime() {
      const today = new Date();
      const timezoneOffset = this.getTimezone * 1000;
      const localTimeOffset = new Date().getTimezoneOffset() * 60000;
      const localDate = new Date(today.getTime() + timezoneOffset + localTimeOffset);
      return "Local Time: " + localDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false }) + " Uhr";
    }
  },
  methods: {
    ...mapActions(["fetchWeatherData"]),
    getData() {
      if (this.search) {
        this.fetchWeatherData(this.search).then(() => {
          console.log("Wetterdaten erfolgreich geladen für:", this.search);
        }).catch(error => {
          console.error("Fehler beim Laden der Wetterdaten für:", this.search, error);
        });
      }
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
    width: 80%;
    height: 50px;
    border: 2px solid #000;
    border-radius: 100px;
    outline: none;
    background-color: transparent;
    font-size: 20px;
    padding: 0 45px;
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

  .info-container {
    display: flex;
    align-items: center;
    margin-left: auto; // Positioniert die Container rechts von der Suchleiste
    white-space: nowrap;

    .country {
      font-size: 20px;
      color: black;
      font-weight: 600;
      padding-right: 20px;
      left: -70px;
      position:relative;

    }

    .date {
      font-size: 20px;
      color: black;
      font-weight: 600;
      padding-right: 40px;
    }

    .local-time {
      font-size: 20px;
      color: black;
      font-weight: 600;
    }
  }

  .error {
    position: absolute;
    color: #d50606;
    text-align: center;
    font-weight:bold;
    font-size:larger;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 10px;
  }
}


</style>