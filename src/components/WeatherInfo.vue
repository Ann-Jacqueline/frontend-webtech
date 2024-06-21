<template>
  <div class="weather-info">
    <div class="weather-item" title="Wind speed">
      <i class="bi bi-wind"></i>
      <span class="value">{{ weatherInfo.windSpeed }}</span>
    </div>
    <div class="weather-item" title="Humidity">
      <i class="bi bi-moisture"></i>
      <span class="value">{{ weatherInfo.humidity }}</span>
    </div>
    <div class="weather-item" title="Cloudiness">
      <i class="bi bi-clouds"></i>
      <span class="value">{{ weatherInfo.clouds }}</span>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      weatherInfo: 'getWeatherInfo' // Nutzung des umbenannten Getters
    })
  }
};
</script>



<style lang="less" scoped>
.weather-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid #000;
  color: black;
  padding-top: 20px;


  .weather-item {
    display: flex;
    align-items:center;
    color:black;
    font-size: larger;

    .value {
      margin-left: 5px;
      font-weight: 600;
    }
    i {
      font-size: 24px; /* Größere Größe der Icons */
      font-weight: bolder; /* Dickeres Aussehen der Icons */
    }
  }
}
</style>
