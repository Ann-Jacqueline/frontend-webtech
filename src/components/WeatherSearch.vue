/**
* Diese Vue-Komponente ermöglicht die Suche nach Wetterinformationen für eine bestimmte Stadt.
* Benutzer können den Stadtnamen eingeben und durch Drücken der Eingabetaste oder durch Klicken
* auf die Schaltfläche die Wetterdaten abrufen.
*
* Die Komponente verwendet Vuex für den Zustandsmanagement und die Datenspeicherung. Sobald der
* Benutzer eine Suche durchführt, werden die aktuellen Wetterdaten sowie das Land, das Datum und
* die lokale Uhrzeit angezeigt. Fehlermeldungen werden angezeigt, wenn die Suche keine Ergebnisse
* liefert.
*
* Die lokale Uhrzeit und das Datum werden basierend auf der Zeitzone der abgerufenen Wetterdaten
  * berechnet und angezeigt.
  */
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

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';


const store = useStore();
const search = ref(store.state.search);

const isSearched = computed(() => store.getters.isSearched);
const getWeatherCountry = computed(() => store.getters.getWeatherCountry);
const getError = computed(() => store.getters.getError);
const getTimezone = computed(() => store.getters.getTimezone);

const currentDate = computed(() => {
  const today = new Date();
  const timezoneOffset = getTimezone.value * 1000;
  const localTimeOffset = new Date().getTimezoneOffset() * 60000;
  const localDate = new Date(today.getTime() + timezoneOffset + localTimeOffset);
  return localDate.toLocaleDateString('en-EN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
});

const localTime = computed(() => {
  const today = new Date();
  const timezoneOffset = getTimezone.value * 1000;
  const localTimeOffset = new Date().getTimezoneOffset() * 60000;
  const localDate = new Date(today.getTime() + timezoneOffset + localTimeOffset);
  return "Local Time: " + localDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false }) + " Uhr";
});

const getData = () => {
  if (search.value) {
    store.dispatch('fetchWeatherData', search.value)
        .then(() => {
          console.log("Wetterdaten erfolgreich geladen für:", search.value);
        })
        .catch(error => {
          console.error("Fehler beim Laden der Wetterdaten für:", search.value, error);
        });
  }
};

defineExpose({
  search,
  getData
});
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