<script setup lang="ts">
import { onMounted, ref, type Ref} from 'vue'
import axios from 'axios'

defineProps<{ title: string }>()

type CityEntry = { id: number; name: string; temperatur: number; wetterStatus: string; }

const cityEntrys: Ref<CityEntry[]> = ref([])
const nameField = ref('')
const temperaturField = ref('')
const wetterStatusField = ref('')
const isDeletedField = ref('')

const url = import.meta.env.VITE_APP_BACKEND_BASE_URL

function addCity(): void {
  const cityEntry = {
    name: nameField.value,
    temperatur: temperaturField.value,
    wetterStatus: wetterStatusField.value
  }
  axios
      .post<CityEntry>(`${url}/cityEntry`, cityEntrys)
      .then((response) => cityEntrys.value.push(response.data))
      .catch((error) => console.log(error))
}
function requestCitys(): void {
  axios
      .get<CityEntry[]>(`${url}/cityEntry`)
      .then((response) => (cityEntrys.value = response.data))
      .catch((error) => console.log(error))
}
function removeCity(id: number): void {
  axios
      .delete<void>(`${url}/cityEntry/${id}`)
      .then(() => (cityEntrys.value = cityEntrys.value.filter((h) => h.id !== id)))
      .catch((error) => console.log(error))
}
onMounted(() => requestCitys())
</script>

<template>
  <h2>{{ title }}</h2>
  <form @submit="addCity()" @submit.prevent>
    <!-- "@submit.prevent" prevents a page refresh after submitting form -->
    <input type="text" placeholder="Name" v-model="nameField" />
    <input type="number" placeholder="Temeratur" v-model="temperaturField" />
    <input type="text" placeholder="Wetterstatus" v-model="wetterStatusField" />
    <button>Add City</button>
  </form>
  <hr />
  <div id="app">
    <main>
      <div class="search-box">
        <input type="text" class="search-bar" placeholder="Search..."/>
        <CityEntry class="BeispEntry" />
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="tableHeader"> Heute </th>
          <th class="tableHeader">Morgen</th>
          <th class="tableHeader">Favoriten</th>
          <th class="tableHeader">Reisepläne</th>
          <th class="tableHeader">Standorte Verwalten</th>
        </tr>
        <tr v-if="!cityEntrys.length">
          <td colspan="4">No Citys yet!</td>
        </tr>
        <tr v-for="cityEntry in cityEntrys" :key="cityEntry.id">
          <td>
            <button @click="removeCity(cityEntry.id)" class="delete">delete</button>
          </td>
          <td>{{cityEntry.name }}</td>
          <td>{{ cityEntry.temperatur }}</td>
          <td>{{ cityEntry. wetterStatus }}</td>
          <td>({{ cityEntry.id }})</td>
        </tr>
        </thead>
      </table>
    </main>
  </div>
</template>




<style scoped>
.BeispEntry{
  color: rgb(30, 30, 30);
  position: absolute;
  bottom: 350px;
  font-size: 20px;
}
* {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
}

body {
  font-family: 'montserrat', sans-serif;
  width: 100vw;
  background-image: url('~@/assets/pic13.jpg');

}

#app {
  transition: background-image 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

main {
  min-height: 100vh;
  padding: 25px;

}
.search-box .search-bar{
  margin-left: 350px;
  display: block;
  width: 25%;
  padding: 15px;
  color: #1e1e1e;
  font-size: 20px;
  border-radius: 0px 16px 0px 16px;
  box-shadow: 0px 0px 16px rgba(0,0,0,0.25) ;
  appearance: none;
  border: none;
  outline: none;
  background: rgba(207, 196, 196, 0.42);
  transition: 0.4s
}
.search-box .search-bar:focus {
  box-shadow: 0px 0px 8px rgba(0,0,0,0.25);
  background-color: rgba(214, 219, 225, 0.75);
  border-radius: 16px 0px 16px 0px;
}
.search-box {
  width: 100%;
  margin-bottom: 30px;
  margin-left:auto;

}
.tableHeader {
  color: black;
  padding-right: 200px;
  font-size: large;
}
</style>

