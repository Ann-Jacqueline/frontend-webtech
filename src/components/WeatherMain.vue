
/**
* Diese Vue-Komponente zeigt die Hauptwetterinformationen an, einschließlich der aktuellen Temperatur,
* gefühlten Temperatur, Wetterbeschreibung und bietet eine Einstellungsoption für die Temperaturskala
* (Celsius oder Fahrenheit). Die Komponente verwendet Vuex zur Verwaltung des Zustands und der Getter
* zum Abrufen der aktuellen Wetterdaten.
*
* Die Temperatureinheit kann umgeschaltet werden, wobei die Temperaturen automatisch in die
* entsprechende Einheit umgerechnet werden. Die Einstellungsoptionen werden über ein Dropdown-Menü
* bereitgestellt, das durch Klicken auf das Zahnrad-Symbol aktiviert wird.
*
* Die Hauptwetterinformationen wie gefühlte Temperatur, aktuelle Temperatur und Wetterbeschreibung
  * werden in einem zentrierten Layout angezeigt. Die Temperatur wird gerundet und mit der entsprechenden
  * Einheit angezeigt.
  *
  * Bei der Montage der Komponente werden die geladenen Hauptwetterinformationen in der Konsole
    * protokolliert, um die Aktualisierung der Benutzeroberfläche zu verfolgen und sicherzustellen, dass
    * die richtigen Informationen angezeigt werden.
    */<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { round } from '@popperjs/core/lib/utils/math.js'

const store = useStore();
const showDropdown = ref(false);

const weatherMain = computed(() => {
  let main = store.getters.getWeatherMain;
  console.log("Aktuelle Wetterdaten:", main);
  return {
    ...main,
    temp: convertTemperature(main.temp),
    feelsLike: convertTemperature(main.feelsLike)
  };
});
const tempUnit = computed(() => store.getters.getTempUnit);

function convertTemperature(temp) {
  if (store.state.tempUnitStored === store.state.tempUnit) {
    return temp; // Keine Umrechnung nötig, bereits in der richtigen Einheit
  }
  // Umrechnung erforderlich
  return store.state.tempUnit === 'C' ?
    Math.round((temp - 32) * 5 / 9) :
    Math.round(temp * 9 / 5 + 32);
}
function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
  console.log("Dropdown-Status:", showDropdown.value);
}

function toggleTempUnit(unit) {
  console.log("Umschalten der Temperatureinheit auf:", unit);
  store.commit('TOGGLE_TEMP_UNIT', unit);
  toggleDropdown();
}
</script>
<template>
  <div class="weather-main">
    <div class="settings-dropdown">
      <i class="bi bi-gear-fill" @click="toggleDropdown"></i>
      <ul v-if="showDropdown">
        <li @click="toggleTempUnit('C')">Celsius</li>
        <li @click="toggleTempUnit('F')">Fahrenheit</li>
      </ul>
      <span class="settings-text">Settings</span>
    </div>
    <div class="weather-feelsLike">
      Feels like <strong>{{ round(weatherMain.feelsLike) }}<sup>°</sup></strong>
    </div>
    <div class="weather-temp">
      <div
        class="weather-icon"
        :style="weatherMain.icon ? {'background-image': 'url(https://openweathermap.org/img/wn/'+ weatherMain.icon +'d@2x.png)'} : {}"
      ></div>
      <span>{{ round(weatherMain.temp) }}</span><sup>°{{ tempUnit }}</sup>
    </div>
    <div class="weather-description">{{ weatherMain.description }}</div>
  </div>
</template>

<style lang="less" scoped>
.weather {
  &-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
    .weather {
      &-temp {
        position: relative;
        width: 150px;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        box-shadow: 0 0 40px #000;
        background-color: #fff;
        margin: 40px 0;
        span {
          font-size: 80px;
          font-weight: 800;
          letter-spacing: -2px;
          position: relative;
        }
        sup {
          position:relative;
          top: -21px;
          font-size: 40px;
        }
      }
      &-icon {
        position: absolute;
        top: -35px;
        left: -35px;
        width: 110px;
        height: 110px;
        background-repeat: no-repeat;
        background-size: 100%;
        filter: drop-shadow(1px 1px 0 #000)
        drop-shadow(-5px -5px 0 #000);
      }
      &-feelsLike,
      &-description {
        font-size: 20px;
        font-weight: bolder;
        color: black;
        text-transform: capitalize;
        sup {
          position: relative;
          top: 5px;
          left: -2px;
          font-size: 18px;
        }
      }
    }
  }
}
@media (max-height: 767px) {
  .weather-main {
    margin-top: 30px;
    margin-bottom: 30px;
    .weather-temp {
      width: 125px;
      height: 125px;
      margin: 30px 0;
    }
  }
  .settings-dropdown {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .settings-dropdown i {
    cursor: pointer;
    display: inline-block;
    padding: 10px;
    font-size: 24px; /* Größeres Icon */
    color: #151414;
    position: fixed;
    top:1.5vh;
    right:9vw;
  }
  .settings-text {
    display: inline-block;
    margin-left: 10px;
    vertical-align: middle; /* Zentriert den Text vertikal zum Icon */
    font-size: 2.5vh; /* Einstellung der Textgröße */
    color: #151414; /* Textfarbe */
    position: fixed;
    top:3.5vh;
    right:12vw;
    font-weight:bolder;
  }
  .settings-dropdown ul {
    display: none; /* Versteckt das Dropdown-Menü zunächst */
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    padding: 10px 0;
    position: fixed;
    top:3vh;
    right:9vw; /* Direkt unter dem Icon */
    z-index: 150; /* Stellt sicher, dass das Dropdown über anderen Elementen schwebt */
  }
  .settings-dropdown ul li {
    cursor: pointer;
    padding: 12px 16px;
    text-decoration: none;
    display: block; /* Stellt sicher, dass jedes Element die volle Breite des Dropdowns einnimmt */
    color: black;
    &:hover {
      background-color: #ddd; // Ändert die Hintergrundfarbe beim Hover
    }
  }
  .settings-dropdown:hover ul {
    display: block;
  }
  @keyframes dropdownFade {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .settings-dropdown ul {
    animation: dropdownFade 0.3s ease-out forwards;}
}
</style>
