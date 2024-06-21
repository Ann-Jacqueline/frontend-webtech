<template>
  <div class="weather-account">
    <h4>Willkommen, {{ userName }}. Hier ist dein personalisierter Account.</h4>
    <div class="previously-searched">
      <h5>Previously Searched Cities:</h5>
      <ul>
        <li v-for="city in cityHistory" :key="city.id">
          {{ city.name }} - {{ city.description }}
          <button @click="removeCity(city.id)">Delete</button>
        </li>
      </ul>
    </div>
    <button @click="backToSearch" class="back-button">Zurück zur Suche</button>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const userName = computed(() => store.getters.getUserName);
const cityHistory = computed(() => store.getters.getCityHistory);

const removeCity = (id) => {
  store.dispatch('removeCity', id);
};

const backToSearch = () => {
  router.push('/weather');
};
</script>


<style scoped>
.weather-account {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  max-width: 90%;
  margin: auto;
}

.previously-searched {
  width: 100%;
  margin-top: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #eee;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>

