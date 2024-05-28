<script lang="ts">
import { defineComponent } from 'vue'

type CityEntry = { id: number; name: string; currentTemperatur: number; wetterStatus: string; };
type CityEntryListOaData = {
  cityEntrys: CityEntry[]
  nameField: string
  currentId: number
  currentTemperatur: number
  wetterStatus: string
}
export default defineComponent({
  name: 'CityEntryWithOptionsAPI',
  props: ['title'],
  data(): CityEntryListOaData {
    return {
      nameField: '',
      currentId: 1,
      cityEntrys: [],
      currentTemperatur: 26,
      wetterStatus: ''
    }
  },
  methods: {
    initCitys(): void {
      this.addCity('Berlin',"Sonnig",26)
      this.addCity('Paris',"Wolkig",13)
    },
    addCity(name: string, wetterStatus: string, currentTemperatur: number): void {
      this.cityEntrys.push({ name, id: this.currentId++, wetterStatus,currentTemperatur})
    },
    onFormSubmitted(): void {
      this.addCity(this.nameField.valueOf(),this.wetterStatus.valueOf(),this.currentTemperatur.valueOf())
    },
    removeCity(id: number): void {
      this.cityEntrys = this.cityEntrys.filter((h) => h.id !== id)
    }
  },
  mounted() {
    this.initCitys()
  }
})
</script>

<template>

</template>

<style scoped>

</style>