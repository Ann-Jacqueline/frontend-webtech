<script lang="ts">
import { defineComponent } from 'vue'
import CityEntryWithOptionsAPI from '@/components/CityEntryWithOptionsAPI.vue'

export default defineComponent({
  name: 'CityEntryWithOptionsAPIView',
  components: { CityEntryWithOptionsAPI }
})
</script>

<template>
  <main>
    <CityEntryWithOptionsAPIView title="Our Cities ... (Code: Options API)" />
  </main>
</template>

<style scoped></style>