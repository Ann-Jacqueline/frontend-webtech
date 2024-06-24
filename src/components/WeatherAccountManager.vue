<template>
  <div class="weather-account">
    <div class="fog-animation"></div>
    <div class="header">
      <div class="user-info">
        <h3 class="user-name">{{ userName }}</h3>
        <button @click="logOut" class="logout-button">Log Out</button>
      </div>
      <nav class="navigation">
        <router-link to="/weather" class="nav-item-Search">Weather Search</router-link>
        <router-link to="/recommendations" class="nav-item-Rec">Recommendations</router-link>
      </nav>
      <h2 class="dashboard-title">{{ userName }}'s Weather Dashboard</h2>
    </div>
    <div class="content">
      <div class="previously-searched">
        <ul v-if="cityHistory.length > 0">
          <li v-for="city in cityHistory" :key="city.id" :class="{'city-item': true}">
            <div class="pin-container">
              <button @click="setAsDefault(city.name)" :class="{'pin-button': true, 'is-default': city.name === defaultSearch}"></button>
              <span class="pin-text">Set as Default Search City</span>
            </div>
            <span></span> <span></span>
           <span>|</span>  <span></span>
            <span class="city-name">{{ city.name }} - {{ city.country }}</span>
            <span>|</span>
            <span class="temperature">Temperature: {{ city.temp }}°</span>
            <span>|</span>
            <span class="date">Date: {{ city.date }}</span>
            <span>|</span>
            <span class="local-time">Localtime: {{ city.localTime }}h</span>
            <button @click="removeCity(city.id)" class="delete-button">Delete</button>
          </li>
        </ul>
          <p v-else class="no-cities">{{ noCitiesMessage }}</p> <!-- Zeigt die Nachricht an, wenn keine Städte gesucht wurden -->
        </div>
      </div>
    </div>
</template>

<script setup>
import { computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const userName = computed(() => store.getters.getUserName);
const cityHistory = computed(() => {
  const history = store.getters.getCityHistory;
  return typeof history === 'string' ? [] : history;
});
const noCitiesMessage = computed(() => typeof store.getters.getCityHistory === 'string' ? store.getters.getCityHistory : '');
const defaultSearch = computed(() => store.state.defaultSearch);

// Debugging: Überwache Änderungen an defaultSearch und logge sie
watchEffect(() => {
  console.log('Default Search Changed:', defaultSearch.value);
});

function logOut() {
  store.dispatch('logOut').then(() => {
    router.push('/');
  });
}

const setAsDefault = (cityName) => {
  store.dispatch('pinCityAsDefault', cityName).then(() => {
    console.log("Default city set to:", cityName);
  });
}

const removeCity = (id) => {
  store.dispatch('removeCity', id);
};
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
  padding: 1vw 8.5vh;
  background-color: rgba(68, 68, 68, 0);
  color: rgb(21, 20, 20);
  text-decoration: none;
  border-radius: 5px;
  position: fixed;
  margin-right: 415px;
  margin-top:10px;/* Abstand zwischen den Navigationspunkten */
  left:0;
  top:17vh;
  z-index:101;
  font-size:larger;
  &:hover {
    background-color: rgba(102, 102, 102, 0.3);
  }
}

.nav-item-Rec {
  padding: 1vw 7.2vh;
  background-color: rgba(68, 68, 68, 0);
  color: rgb(21, 20, 20);
  text-decoration: none;
  border-radius: 5px;
  /* Abstand zwischen den Navigationspunkten */
  position: fixed;
  margin-right: 415px;
  margin-top:10px;/* Abstand zwischen den Navigationspunkten */
  left:0;
  top:33vh;
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
  font-size: 2vh; /* Schriftgröße abhängig von der Bildschirmhöhe */
  position: fixed;
  top: 13vh;
  left:6vw;
}


.logout-button {
  padding: 1vw 12.5vh;
  background-color: rgba(255, 0, 0, 0);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  position: fixed;
  margin-right: 415px;
  margin-top:10px;/* Abstand zwischen den Navigationspunkten */
  left:0;
  top:74vh;
  z-index:101;
  font-size:larger;
  &:hover {
    background-color: #841d1d;
  }
}

.navigation {
  display: flex;
  position: absolute;
  right: 5vw; /* Rechts bündig mit Abstand vom Rand */
  top: 20vh; /* Weiter unten positioniert */
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
  width: 60vw; /* Breite abhängig von der Bildschirmbreite */
  margin-left: 31%; /* Horizontal zentriert */
  margin-top: 14%; /* Vertikaler Abstand vom oberen Rand, abhängig von der Bildschirmhöhe */
}

.previously-searched li {
  background-color: #eee;
  padding: 2vh;
  border-radius: 20px;
  margin-bottom: 2vh;
  display: flex;
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

  .city-name, .temperature, .date, .local-time {
    margin-right: 15px; /* Consistent spacing between text */
    white-space: nowrap;
    margin-left:20px;
  }


}

</style>