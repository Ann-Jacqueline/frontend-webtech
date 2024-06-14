<template>
  <div id="app">
    <weatherApp/>
  </div>
</template>

<script>
import WeatherApp from './components/WAData.vue'
import CityEntryWithRestData from '@/components/CityEntryWithRestData.vue'
export default {
  name: 'App',
  components: {
    WeatherApp,
    CityEntryWithRestData
  }
}
</script>
<style>
</style>



