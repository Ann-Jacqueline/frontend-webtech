<script>
import axios from 'axios';
export default {
  data() {
    return {
      api_key: import.meta.env.VITE_APP_API_KEY,  // Using Vite to import the API key
      url_base: 'https://api.openweathermap.org/data/2.5/',
      weather_icon: 'https://openweathermap.org/img/wn/',
      query: '',  // Bound to the user input
      weather: {},  // Stores the fetched weather data
    };
  },
  methods: {
    async fetchWeather(e) {
      if (e.key === "Enter" && this.query.trim() !== "") {
        const url = `${this.url_base}weather?q=${this.query}&appid=${this.api_key}&units=metric`;
        console.log("Constructed URL:", url);  // Log the full URL being requested
        // Log the state before fetching data
        console.log("Starting API request with query:", this.query);
        try {
          const response = await axios.get(url);
          console.log("API response received:", response.data);  // Log the raw response data
          this.weather = response.data;  // Update the weather state with the new data
          console.log("Weather data updated in Vue data object:", this.weather);  // Log the updated state
        } catch (error) {
          console.error("Error fetching weather data:", error);  // Log errors
          console.log("Failed request URL:", url);  // Log the URL of the failed request
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("Error response data:", error.response.data);
            console.log("Error response status:", error.response.status);
            console.log("Error response headers:", error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log("No response received:", error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        }
      } else {
        console.log("Enter key pressed but no query entered.");
      }
    },
    todaysDate() {
      const d = new Date();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const formattedDate = `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
      console.log("Current date formatted:", formattedDate);
      return formattedDate;
    },
  }
};
</script>

<template>
  <div id="app">
    <div class="weather-wrap">
      <!-- Search Box -->
      <div class="search-box">
        <input type="text" placeholder="Search..." class="search-bar"
               v-model="query" @keyup.enter="fetchWeather" />
      </div>

      <!-- Weather Info -->
      <div class="weather-info" v-if="weather.main">
        <div class="location-box">
          <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
          <div class="date">{{ todaysDate() }}</div>
        </div>
        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.main.temp) }}°C</div>
          <div class="weather">{{ weather.weather[0].main }}</div>
          <div class="icon">
            <img :src="`${weather_icon}${weather.weather[0].icon}@2x.png`" alt="Weather Icon">
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700;900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}
html, body {
  height: 100%; /* Ensure the full height */
  margin: 0; /* Remove default margin */
}
#app {
  background-image: url("../assets/images/Main Backround.jpg"); /* Ensure this path is correct */
  background-size: cover;
  background-position: center;
  position: absolute; /* Absolute positioning relative to the nearest positioned ancestor */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.4);
}
.weather-wrap {
  width: 100%; /* Adjust width to match viewport */
  max-width: 375px; /* Keep the max width as before */
  height: 600px;
  padding: 25px;
  border-radius: 25px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.4)
  );
}
.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  transition: 0.4s;
}
.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
}
.location-box .location {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  font-style: italic;
  text-align: center;
  margin-top: 30px;
}
.location-box .date {
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  text-align: center;
}
.weather-box {
  text-align: center;
}
.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #fff;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  font-style: italic;
}
.weather-box .weather {
  color: #fff;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>