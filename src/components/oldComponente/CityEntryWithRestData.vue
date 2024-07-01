/**
* Veraltete Komponente
* Diese Komponente ermöglicht das Hinzufügen, Abrufen und Entfernen von Städteeinträgen
* von einem Backend-Service. Sie bietet auch eine einfache Navigation zwischen verschiedenen
* Tabs (Standorte, Favoriten, Reisepläne).
*
* Die Komponente verwendet axios für HTTP-Anfragen und Vue Composition API für
* den Komponentenstatus und Lebenszyklus-Hooks.
*/

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import axios from 'axios';




defineProps<{ title: string }>();

type CityEntry = { id: number; name: string };

const cityEntrys: Ref<CityEntry[]> = ref([]);
const nameField = ref('');
const currentTab = ref('locations');

const url = import.meta.env.VITE_APP_BACKEND_BASE_URL;

const setTab = (tab: string): void => {
  currentTab.value = tab;}

function addCity(): void {
  const cityEntry = {
    name: nameField.value,
  };

  axios
    .post<CityEntry>(`${url}/greeting`, cityEntry)
    .then((response) => cityEntrys.value.push(response.data))
    .catch((error) => console.error(error));
}

function requestCities(): void {
  axios
    .get<CityEntry[]>(`${url}/greeting`)
    .then((response) => (cityEntrys.value = response.data))
    .catch((error) => console.error(error));
}
function removeCity(id: number): void {
  axios
    .delete<void>(`${url}/greeting/${id}`) // Aktualisieren Sie den Endpunkt-Pfad
    .then(() => (cityEntrys.value = cityEntrys.value.filter((entry) => entry.id !== id)))
    .catch((error) => console.error(error));
}

// Lifecycle Hook
  onMounted(() => {
    requestCities();
  });
</script>

<template>
  <div id="app">
    <!-- Header with Logo and Title -->
    <div class="header">
    </div>
    <div class="title">
      <h1 class="text-4xl font-bold">WeatherWorks</h1>
      <p>Your companion even on rainy days</p>
    </div>

    <!-- Navigation Tabs -->
    <nav class="tabs">
      <button @click="setTab('locations')" :class="['tab-button', { active: currentTab === 'locations' }]">Standorte</button>
      <button @click="setTab('favorites')" :class="['tab-button', { active: currentTab === 'favorites' }]">Favoriten</button>
      <button @click="setTab('travelPlans')" :class="['tab-button', { active: currentTab === 'travelPlans' }]">Reisepläne</button>
    </nav>

    <!-- Content -->
    <div class="content">
      <div v-if="currentTab === 'locations'" class="list-container">
        <form @submit.prevent="addCity" class="input-container">
          <label for="city" class="block font-bold mb-2">City Name</label>
          <input v-model="nameField" type="text" id="city" placeholder="Enter city name" class="dark-blue-transparent">
          <button type="submit">Add City</button>
        </form>
        <ul>
          <li v-for="city in cityEntrys" :key="city.id" class="flex justify-between items-center mb-2">
            <span>{{ city.name }}</span>
            <button @click="removeCity(city.id)" class="btn-delete">Delete</button>
          </li>
        </ul>
      </div>

      <!-- Placeholder for Favorites tab -->
      <div v-if="currentTab === 'favorites'" class="list-container">
        <p>Favorites content goes here.</p>
      </div>

      <!-- Placeholder for Travel Plans tab -->
      <div v-if="currentTab === 'travelPlans'" class="list-container">
        <p>Travel Plans content goes here.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  background-image: url("../../assets/images/Main Backround.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: absolute;   /* Ändere dies zu 'absolute' oder 'fixed' */
  top: 0;               /* Füge diese Zeile hinzu */
  left: 0;              /* Füge diese Zeile hinzu */
  right: 0;             /* Füge diese Zeile hinzu */
  bottom: 0;            /* Füge diese Zeile hinzu */
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
}

.header {
  display: flex;
  justify-content: center; /* Geändert von flex-end zu center */
  align-items: center;
  padding: 20px;
  text-align: center; /* Hinzugefügt */
}

.header img {
  width: 120px; /* Adjust the size as needed */
  margin-left: 20px; /* Space between title and logo, hinzugefügt */
}

.title {
  text-align: center;
  margin-top: 20px; /* Adjusted to bring title higher */
}

.tabs {
  display: flex;
  justify-content: center;
  margin-top: 40px; /* Adjust the margin as needed */
}

.tab-button {
  padding: 10px 20px;
  margin: 0 10px;
  border: 2px solid transparent;
  cursor: pointer;
  font-size: 1.5rem;
  background-color: rgba(255, 255, 255, 0.3); /* White transparent */
  color: white;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.tab-button {
  background-color: rgba(255, 255, 255, 0.3); /* White transparent */
  color: #003366;
  border-color: #003366;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin-top: 40px; /* Adjust the margin as needed */
}

.list-container {
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  padding: 20px;
  border-radius: 8px;
}

.input-container {
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.input-container input {
  background-color: rgba(0, 51, 102, 0.8); /* Transparent dark blue */
  color: white;
  border: 1px solid white;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
}

.btn-delete, .input-container button {
  background-color: #003366;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
</style>