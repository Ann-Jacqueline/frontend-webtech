<script lang="ts">
import WeatherApp from "@/components/WAData.vue";
import { defineComponent } from 'vue'


export default defineComponent({
  components: { WeatherApp }
})


</script>

<template>
  <main>
    <WeatherApp title="Our Cities with (REST API)"/>
  </main>
</template>

<style scoped>

</style>