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
  <h2>{{ title }}</h2>
  <form @submit="onFormSubmitted()" @submit.prevent>
    <!-- "@submit.prevent" prevents a page refresh after submitting form -->
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
      <td colspan="3">No Citys yet!</td>
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

</style>