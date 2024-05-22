<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Latitude</th>
        <th>Longitude</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="cities.length === 0">
        <td colspan="3">No cities yet</td>
      </tr>
      <tr v-for="(city, index) in cities" :key="index">
        <td>{{ city.name }}</td>
        <td>{{ city.latitude }}</td>
        <td>{{ city.longitude }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// export default {
//   data() {
//     return {
//       cities: [
//         { name: 'Berlin', latitude: 52.5162, longitude: 13.3777 },
//         { name: 'Paris', latitude: 48.8566, longitude: 2.3522 },
//         { name: 'Madrid', latitude: 40.4189, longitude: -3.6919 }
//       ]
//     };
//   }

import axios from 'axios'

function createCity(): void {
  const city = {
    name: nameField.value,
    latitude: latitudeField.value,
    longitude: longitudeField.value
  }

  axios
    .get<CityEntry>'http://localhost:8080/greeting'
    .then((response) => CityEntry.value.push(response.data))
    .catch(error)=> console.log(error))
}

</script>


<style scoped>

</style>