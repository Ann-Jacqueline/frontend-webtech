<script lang="ts">
import { defineComponent } from 'vue'

type CityEntry = { id: number; name: string; };
type CityEntryListOaData = {
  cityEntrys: CityEntry[]
  nameField: string
  currentId: number

}
export default defineComponent({
  name: 'CityEntryWithOptionsAPI',
  props: ['title'],
  data(): CityEntryListOaData {
    return {
      nameField: '',
      currentId: 1,
      cityEntrys: [],

    }
  },
  methods: {
    initCitys(): void {
      this.addCity('Berlin')
      this.addCity('Paris')
    },
    addCity(name: string): void {
      this.cityEntrys.push({ name, id: this.currentId++})
    },
    onFormSubmitted(): void {
      this.addCity(this.nameField.valueOf())
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
form {
  display: flex;
  margin: 0 -16px;

  * {
    margin: 16px;
  }

  input {
    flex-grow: 1;
  }
}

table {
  margin: 8px -8px 0;

  th,
  td {
    padding: 8px;
  }
}

button {
  border-radius: 48px;
  padding: 8px;
  border: none;
  cursor: pointer;

  &.delete {
    background: darkred;
    color: white;
  }
}
</style>