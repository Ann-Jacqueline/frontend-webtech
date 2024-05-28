<script setup lang="ts">
import CityEntryWithRestDataView from '@/views/CityEntryWithRestDataView.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <main>
      <div class="search-box">
        <input type="text" class="search-bar" placeholder="Search..." />
        <CityEntryWithRestDataView class="BeispEntry" />
      </div>
      <nav class="table">
        <RouterLink to="/cities-oa" class="tableHeader">Heute</RouterLink>
        <RouterLink to="/cities-oa" class="tableHeader">Morgen</RouterLink>
        <RouterLink to="/cities-rest-api" class="tableHeader">Favoriten</RouterLink>
        <RouterLink to="/cities-rest-api" class="tableHeader">Reisepläne</RouterLink>
        <RouterLink to="/cities-rest-api" class="tableHeader">Standorte Verwalten</RouterLink>
      </nav>
    </main>
    <RouterView />
  </div>
</template>

<style scoped>
.BeispEntry {
  color: rgb(30, 30, 30);
  font-size: 20px;
  margin-bottom: 20px;
}
* {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
}

body {
  font-family: 'montserrat', sans-serif;
  width: 100vw;
  background-image: url('./assets/pic13.jpg');
}


main {
  min-height: 100vh;
  padding: 25px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto 30px;
  padding: 15px;
  color: #1e1e1e;
  font-size: 20px;
  border-radius: 16px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  appearance: none;
  border: none;
  outline: none;
  background: rgba(207, 196, 196, 0.42);
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(214, 219, 225, 0.75);
}

.search-box {
  width: 100%;
  margin-bottom: 30px;
  text-align: center;
}

.table {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tableHeader {
  color: red;
  font-size: large;
  text-decoration: none;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.tableHeader:hover {
  background-color: #f0f0f0;
}
</style>

