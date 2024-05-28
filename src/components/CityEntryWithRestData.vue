<script lang="ts">
import { defineComponent } from 'vue';

type CityEntry = { id: number; name: string; temperatur: number; wetterStatus: string };
type CityEntryListOaData = {
  cityEntrys: CityEntry[];
  nameField: string;
  temperaturField: number | null;
  wetterStatusField: string;
  currentId: number;
};

export default defineComponent({
  name: 'CityEntryWithRestDataView',
  data(): CityEntryListOaData {
    return {
      nameField: '',
      temperaturField: null,
      wetterStatusField: '',
      currentId: 1,
      cityEntrys: [],
    };
  },
  methods: {
    initCitys(): void {
      this.addCity('Berlin', 20, 'Sonnig');
      this.addCity('Paris', 25, 'Wolkig');
    },
    addCity(name: string, temperatur: number, wetterStatus: string): void {
      this.cityEntrys.push({ name, temperatur, wetterStatus, id: this.currentId++ });
    },
    onFormSubmitted(): void {
      if (this.nameField && this.temperaturField !== null && this.wetterStatusField) {
        this.addCity(this.nameField, this.temperaturField, this.wetterStatusField);
        this.nameField = '';
        this.temperaturField = null;
        this.wetterStatusField = '';
      }
    },
    removeCity(id: number): void {
      this.cityEntrys = this.cityEntrys.filter((h) => h.id !== id);
    },
  },
  mounted() {
    this.initCitys();
  },
});
</script>

<template>
  <div>
    <h2>Our Cities with (REST API)</h2>
    <form @submit.prevent="onFormSubmitted">
      <input type="text" placeholder="Name" v-model="nameField" />
      <input type="number" placeholder="Temperatur" v-model="temperaturField" />
      <input type="text" placeholder="Wetterstatus" v-model="wetterStatusField" />
      <button>Add City</button>
    </form>
    <hr />
    <table>
      <thead>
      <tr>
        <th>Delete</th>
        <th>Name</th>
        <th>Temperatur</th>
        <th>Wetterstatus</th>
        <th>ID</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="!cityEntrys.length">
        <td colspan="5">No Cities yet!</td>
      </tr>
      <tr v-for="city in cityEntrys" :key="city.id">
        <td>
          <button @click="removeCity(city.id)" class="delete">delete</button>
        </td>
        <td>{{ city.name }}</td>
        <td>{{ city.temperatur }}</td>
        <td>{{ city.wetterStatus }}</td>
        <td>({{ city.id }})</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.delete {
  background-color: darkred;
  color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
