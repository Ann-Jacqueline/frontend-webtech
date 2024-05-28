<script lang="ts">
import CityEntryWithRestData from "@/components/CityEntryWithRestData.vue";
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CityEntryWithRestData }
})


</script>

<template>
<main>
  <CityEntryWithRestData title="Our Cities with (REST API)"/>
</main>
</template>

<style scoped>

</style>