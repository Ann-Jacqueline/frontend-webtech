<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <div id="app">
    <main>
      <div class="search-box">
        <input type="text" class="search-bar" placeholder="Search..."/>
      </div>

      <!-- Navigationsschaltflächen -->
      <nav class="table">
        <RouterLink to="/cities-oa" class="tableHeader">Heute</RouterLink>
        <RouterLink to="/cities-oa" class="tableHeader">Morgen</RouterLink>
        <RouterLink to="/cities-rest-api" class="tableHeader">Favoriten</RouterLink>
        <RouterLink to="/cities-rest-api" class="tableHeader">Reisepläne</RouterLink>
        <RouterLink to="/cities-rest-api" class="tableHeader">Standorte Verwalten</RouterLink>
      </nav>
      <RouterView />
    </main>
  </div>
</template>

<style>
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

#app {
  transition: background-image 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

main {
  min-height: 100vh;
  padding: 25px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.form-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-button {
  padding: 10px 15px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-button:hover {
  background-color: #0056b3;
}

.form-button:focus {
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  transform: scale(1.05);
}

.search-box .search-bar {
  margin: 0 auto 30px;
  display: block;
  width: 50%;
  padding: 15px;
  color: #1e1e1e;
  font-size: 20px;
  border-radius: 0px 16px 0px 16px;
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
  border-radius: 16px 0px 16px 0px;
}

.search-box {
  width: 100%;
  margin-bottom: 30px;
  margin-left: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  color: black;
}

.tableHeader {
  color: black;
  padding-right: 200px;
  font-size: large;
}

td, th {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

button.delete {
  padding: 5px 10px;
  background-color: darkred;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.delete:hover {
  background-color: red;
}

button.delete:focus {
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  transform: scale(1.05);
}
</style>



