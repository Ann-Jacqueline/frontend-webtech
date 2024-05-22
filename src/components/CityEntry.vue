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

</script>


<style scoped>

</style>