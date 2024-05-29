<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import axios from 'axios';

defineProps<{ title: string }>();

type CityEntry = { id: number; name: string };

const cityEntrys: Ref<CityEntry[]> = ref([]);
const nameField = ref('');

const url = import.meta.env.VITE_APP_BACKEND_BASE_URL;



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
  <h2>{{ title }}</h2>
  <form @submit="addCity()" @submit.prevent>
    <input type="text" placeholder="Name" v-model="nameField" />
    <button>Add City</button>
  </form>
  <hr />
  <table>
    <tr>
      <th>Delete</th>
      <th>Name</th>
      <th>ID</th>
    </tr>
    <tr v-if="!cityEntrys.length">
      <td></td>
      <td></td>
      <td>No Citys yet!</td>
    </tr>
    <tr v-for="city in cityEntrys" :key="city.id">
      <td>
        <button @click="removeCity(city.id)" class="delete">delete</button>
      </td>
      <td>{{ city.name }}</td>
      <td>({{ city.id }})</td>
    </tr>
  </table>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

form input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form button {
  padding: 10px 15px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

form button:hover {
  background-color: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  padding: 10px;
  background-color: #f2f2f2;
  text-align: left;
  font-size: 18px;
}

td, th {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  color:black;
}

button.delete {
  padding: 5px 10px;
  background-color: darkred;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.delete:hover {
  background-color: red;
}
</style>