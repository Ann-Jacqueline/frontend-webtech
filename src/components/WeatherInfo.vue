<template>
  <div class="weather-info">
    <div class="weather-item" title="Wind speed">
      <span class="value">{{ getWeatherInfo.wind }}</span>
    </div>
    <div class="weather-item" title="Humidity">
      <span class="value">%{{ getWeatherInfo.humidity }}</span>
    </div>
    <div class="weather-item" title="Cloudiness">
      <span class="value">%{{ getWeatherInfo.clouds }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed:{
    ...mapGetters(["getWeatherInfo"])
  }
};
</script>

<style lang="less" scoped>
.weather-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid #000;
  padding-top: 20px;
  .weather-item {
    display: flex;
    align-items:center;
    color: var(--darkColor);
    .value {
      margin-left: 5px;
      font-weight: 500;
    }
  }
}
</style>
