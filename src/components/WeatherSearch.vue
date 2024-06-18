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
      return today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    },
    localTime() {
      const timezoneOffset = this.getTimezone * 1000; // API returns timezone in seconds
      const localTimeOffset = new Date().getTimezoneOffset() * 60000; // Convert local timezone offset to milliseconds
      const localDate = new Date(new Date().getTime() + timezoneOffset + localTimeOffset);
      return "Local Time: " + localDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })+"h";
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
    font-size: 16px;
    padding: 0 25px;
    transition: all 0.4s;

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
    color: var(--grayColor);
  }

  .local-time {
    color: var(--grayColor);
    margin-left: 20px;
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
