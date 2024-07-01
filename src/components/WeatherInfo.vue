/**
* Diese Vue-Komponente zeigt grundlegende Wetterinformationen wie Windgeschwindigkeit, Luftfeuchtigkeit
* und Bewölkung an. Jede Information wird mit einem entsprechenden Symbol und dem aktuellen Wert
* formatiert und angezeigt.
*
* Die Komponente verwendet Vuex-Getters, um die aktuellen Wetterinformationen abzurufen und in der
* Benutzeroberfläche anzuzeigen. Die Informationen werden in einem flexiblen Layout angeordnet, das
* Platz für jedes Wetterelement bietet.
*
* Bei der Montage der Komponente werden die geladenen Wetterinformationen in der Konsole protokolliert,
  * um die Aktualisierung der Benutzeroberfläche zu verfolgen und sicherzustellen, dass die richtigen
  * Informationen angezeigt werden.
  */
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
  },
  mounted() {
    console.log("Geladene Wetterinformationen:", this.weatherInfo);
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
    align-items: center;
    color: black;
    font-size: larger;
    background-color: rgba(176, 190, 197, 0.8); /* Leicht transparenter grüner Hintergrund */
    padding: 10px; /* Padding für bessere Optik */
    border-radius: 5px; /* Abgerundete Ecken */
    margin: 5px; /* Abstand zwischen den Elementen */

    .value {
      margin-left: 5px;
      font-weight: 600;
    }
    i {
      font-size: 30px; /* Größere Größe der Icons */
      font-weight: 800; /* Dickeres Aussehen der Icons */
    }
  }
}

</style>
