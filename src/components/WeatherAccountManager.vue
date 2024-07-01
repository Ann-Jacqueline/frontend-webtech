<template>
  <div class="weather-account">
    <div class="fog-animation"></div>
    <div class="header">
      <div class="user-info">
        <h3 class="user-name">{{ userName }}</h3>
        <button @click="logOut" class="logout-button">Log Out</button>
      </div>
      <nav class="navigation">
        <div class="settings-dropdown">
          <i class="bi bi-gear-fill" @click="toggleDropdown"></i> <!-- Bootstrap-Icon für Einstellungen -->
          <ul v-if="showDropdown">
            <li @click="toggleTempUnit('C')">Celsius</li>
            <li @click="toggleTempUnit('F')">Fahrenheit</li>
          </ul>
          <span class="settings-text">Settings</span>
        </div>
        <router-link to="/weather" class="nav-item-Search">Weather Search</router-link>
      </nav>
      <h2 class="dashboard-title">{{ userName }}'s Weather Dashboard</h2>
    </div>
    <div class="content">
      <div class="previously-searched">
        <ul v-if="cityHistory.length > 0">
          <li v-for="city in cityHistory" :key="city.id" :class="{'city-item': true}">
            <div class="pin-container">
              <button @click="setAsDefault(city.name)" :class="{'pin-button': true, 'is-default': city.name === defaultSearch}"></button>
              <span class="pin-text">Set as Default Search</span>
            </div>
            <span></span> <span></span>
            <span>|</span>  <span></span>
            <span class="city-name">{{ city.name }} - {{ city.country }}</span>
            <span>|</span>
            <span class="temperature">Temperature: {{ city.temp }}°</span>
            <span>|</span>
            <span class="date">Date: {{ city.date }}</span>
            <span>|</span>
            <span class="local-time">Local Time: {{ city.localTime }}h</span>
            <button @click="removeCity(city.id)" class="delete-button">Delete</button>
          </li>
        </ul>
        <p v-else class="no-cities">{{ noCitiesMessage }}</p> <!-- Zeigt die Nachricht an, wenn keine Städte gesucht wurden -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';

const store = useStore();
const router = useRouter();
const showDropdown = ref(false);

// Computed properties to retrieve state from the Vuex store
const userName = computed(() => store.getters.getUserName);
const tempUnit = computed(() => store.getters.getTempUnit);
const defaultSearch = computed(() => store.state.defaultSearch);
const noCitiesMessage = computed(() => typeof store.getters.getCityHistory === 'string' ? store.getters.getCityHistory : '');

// Convert temperature based on the selected unit
function convertTemperature(temp) {
  if (store.state.tempUnitStored === tempUnit.value) {
    return temp; // No conversion needed if already in the correct unit
  }
  // Conversion needed
  return tempUnit.value === 'C' ?
      Math.round((temp - 32) * 5 / 9) :
      Math.round(temp * 9 / 5 + 32);
}

// City history with dynamically converted temperatures
const cityHistory = computed(() => {
  const history = store.getters.getCityHistory;
  if (typeof history === 'string') {
    return [];
  }
  return history.map(city => ({
    ...city,
    temp: convertTemperature(city.temp)
  }));
});

// Toggle dropdown menu
function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

// Toggle temperature unit
function toggleTempUnit(unit) {
  store.commit('TOGGLE_TEMP_UNIT', unit);
  toggleDropdown();
}

// Logout function
function logOut() {
  store.dispatch('logOut').then(() => {
    router.push('/');
  });
}

// Set default city
function setAsDefault(cityName) {
  store.dispatch('pinCityAsDefault', cityName).then(() => {
    console.log("Default city set to:", cityName);
  });
}

// Remove a city from the history
function removeCity(id) {
  store.dispatch('removeCity', id);
}
function fetchUserName() {
  userName.value = store.getters.getUserName;
}

// Fetch city history data
async function fetchCityHistory() {
  try {
    const history = store.getters.getCityHistory.map(city => ({
      ...city,
      temp: convertTemperature(city.temp)
    }));
    if (history.length === 0) {
      console.log("Fetching city history...");
      store.dispatch('fetchCityHistory');
    }
  } catch (error) {
    console.error('Failed to fetch city history:', error);
  }
}

// Post city history data
async function postCityHistory(city) {
  const payload = {
    cityName: store.state.search, // Get city name from the search state
    country: store.getters.getWeatherCountry, // Get country from the store
    temperature: store.getters.getWeatherMain.temp, // Get temperature from the store
    localTime: city.localTime,
    owner: store.getters.getUserName // Get owner from the state userName
  };

  try {
    await axios.post(`${store.state.backendUrl}/history`, payload);
    console.log("City history posted:", payload);
  } catch (error) {
    console.error('Failed to post city history:', error);
  }
}

onMounted(async () => {
  store.commit('TOGGLE_TEMP_UNIT', 'C');
  await fetchCityHistory();
  fetchUserName();
  const history = store.getters.getCityHistory;
  if (typeof history !== 'string') {
    for (const city of history) {
      await postCityHistory(city);
    }
  }
});

onBeforeUnmount(() => {
  store.commit('TOGGLE_TEMP_UNIT', 'C');
});
</script>







<style scoped>
.weather-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: url('@/assets/images/AccoutLayout.jpg') no-repeat center center;
  background-size: cover;
  position: relative;
}
.pin-button.is-default {
  background-color: #ddc490; /* Setzt den Hintergrund des Standard-Stadt-li auf Gelb */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding:20px;
}
.nav-item-Search {
  padding: 1vw 8.6vh;
  background-color: rgba(255, 255, 255, 0.32);
  color: rgb(21, 20, 20);
  text-decoration: none;
  border-radius: 5px;
  position: fixed;
  margin-right: 415px;
  margin-top:10px;/* Abstand zwischen den Navigationspunkten */
  left:0;
  top:20vh;
  z-index:101;
  font-size:larger;
  &:hover {
    background-color: rgba(102, 102, 102, 0.3);
  }
}

.delete-button {
  margin-left: auto; /* Pushes the button to the right */
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index:101;
}
.pin-container {
  display: flex;
  align-items: center; /* Zentriert den Button und Text vertikal */
  z-index:101;
}

.pin-button {
  background: url('@/assets/images/pin.png') no-repeat center center; /* Pfad zu Ihrem Pin-Bild */
  background-size: contain;
  width: 30px; /* Breite des Buttons */
  height: 30px; /* Höhe des Buttons */
  border: none;
  cursor: pointer;
  color: transparent; /* Hintergrund transparent machen */
}

.no-cities{
  position: fixed;
  margin-right: 415px;
  margin-top:10px;/* Abstand zwischen den Navigationspunkten */
  left:33vw;
  top:45vh;
  z-index:101;
  font-weight:bolder;
  font-size:larger;
  color: #0f333e;

}

.pin-text {
  margin-left: 10px; /* Abstand zwischen Button und Text */
  color: #000; /* Textfarbe */
  margin-right:20px;
}
.li-text{
  background-color:#ffff;
  z-index:5;
}
.fog-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/fog.png');
  background-repeat: repeat-x;
  animation: animateFog 150s linear infinite;
  z-index:10;

}
@keyframes animateFog {
  0% { background-position: 0 0; }
  100% { background-position: 10000px 0; }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1vw;
  position: relative;
  width: 100%;
  top: 5vh; /* Position von oben abhängig von der Bildschirmhöhe */
  z-index:10;
}
.user-info, .navigation, .dashboard-title {
  position: relative;  /* Stellt sicher, dass alle Kinder relativ positioniert sind */
}
.user-info {
  position: absolute;
  top: 10vh; /* Veränderter vertikaler Abstand */
  left: 5vw; /* Links bündig mit Abstand vom Rand */
}
.user-name {
  color: #333;
  font-size: 2.5vh; /* Schriftgröße abhängig von der Bildschirmhöhe */
  position: fixed;
  top: 13vh;
  left:6vw;
}


.logout-button {
  padding: 1vw 12.7vh;
  background-color: #D73434;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  position: relative;
  margin-right: 415px;
  margin-top:10px;/* Abstand zwischen den Navigationspunkten */
  left:-5vw;
  top:58.5vh;
  z-index:101;
  font-size:larger;
  &:hover {
    background-color: #841d1d;
  }
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Justiert alle Navigations-Elemente links */
  position: relative;
  width: 100%;
  padding: 1vw;
}

.settings-dropdown {
  position: relative; /* Setzt die Position relativ zum Navigationsbereich */
  display: inline-block; /* Ermöglicht die Inline-Positionierung des Icons und des Textes */
  cursor: pointer;
  margin-right: 20px; /* Abstand zum nächsten Navigationslink */
}

.settings-text {
  padding: 1vw 12.7vh;
  background-color: rgba(255, 255, 255, 0.32);
  color: rgb(21, 20, 20);
  text-decoration: none;
  border-radius: 5px;
  display: inline-block;
  margin-left: 0;
  vertical-align: middle; /* Zentriert den Text vertikal zum Icon */
  font-size: larger; /* Einstellung der Textgröße */
  position: fixed;
  top:35vh;
  left:0;

}

.settings-dropdown i {
  font-size: 24px; /* Größeres Icon */
  color: #151414;
  position: fixed;
  top:35vh;
  left:12vw;
}

.settings-dropdown ul {
  display: none; /* Versteckt das Dropdown-Menü zunächst */
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  padding: 10px 0;
  position: fixed;
  top:35vh;
  left:12vw; /* Direkt unter dem Icon */
  z-index: 150; /* Stellt sicher, dass das Dropdown über anderen Elementen schwebt */
}

.settings-dropdown ul li {
  padding: 12px 16px;
  text-decoration: none;
  display: block; /* Stellt sicher, dass jedes Element die volle Breite des Dropdowns einnimmt */
  color: black;

}

.settings-dropdown ul li:hover {
  background-color: #ddd;
}

.settings-dropdown i {
  cursor: pointer;
  display: inline-block;
  color: #151414;
  padding: 10px;
  z-index:102;
}

.settings-dropdown:hover ul {
  display: block; /* Zeigt das Dropdown-Menü beim Hover über das Zahnrad-Icon */
}

/* Optional: Hinzufügen einer einfachen Fade-In Animation für das Dropdown */
@keyframes dropdownFade {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.settings-dropdown ul {
  animation: dropdownFade 0.3s ease-out forwards;
}
.dashboard-title {
  font-size: 5vh; /* Größere Schrift abhängig von der Bildschirmhöhe */
  color: #0f333e;
  position: fixed;
  top: 10vh;
  left: 42%;
  transform: translateX(-50%); /* Zentriert den Titel */
}

.content {
  flex-grow: 1;
  padding: 2vh;
  overflow-y: auto;
  margin-top: 10vh; /* Abstand von der oberen Leiste */

}
.previously-searched ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center; /* Zentriert die Liste */
  width: 62vw; /* Breite abhängig von der Bildschirmbreite */
  margin-left: 31%; /* Horizontal zentriert */
  margin-top: 11.5%; /* Vertikaler Abstand vom oberen Rand, abhängig von der Bildschirmhöhe */
}

.previously-searched li {
  background-color: #eee;
  padding: 2vh;
  border-radius: 20px;
  margin-bottom: 2vh;
  display: flex;
  font-weight:bolder;
  justify-content: space-between; /* Ensures items are spaced evenly */
  align-items: center;
  width: 100%; /* Ensures all items are the same width */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  order:2;
  .city-item {
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px; /* Space between items */
    display: flex;
    flex: 1;
    align-items: center;
    gap: 10px; /* Space between inline elements */
    justify-content: space-between;

  }

  .city-name, .temperature, .date,.local-time,.pin-text {
    margin-right: 15px; /* Consistent spacing between text */
    white-space: nowrap;
    margin-left:20px;

  }


}

</style>