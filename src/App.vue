
<template>
    <div id="app">
      <main>
        <div class="search-box">
          <input type="text" class="search-bar" placeholder="Search..."/>
          <CityEntry class="BeispEntry" />
        </div>
        <table class="table">
          <thead>
          <tr>
            <th class="tableHeader"> Heute </th>
            <th class="tableHeader">Morgen</th>
            <th class="tableHeader">Favoriten</th>
            <th class="tableHeader">Reisepläne</th>
            <th class="tableHeader">Standorte Verwalten</th>
          </tr>
          </thead>
        </table>
      </main>
    </div>
</template>

<script setup lang="ts">

 export default {
  name: 'app',
 data(){return{
      api_key:'fb8defc9bea7f74a0f9993ac1624c942'

     }
  } }
</script>


<style>
.BeispEntry{
  color: rgb(30, 30, 30);
  position: absolute;
  bottom: 350px;
  font-size: 20px;
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

#app {
  transition: background-image 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

main {
  min-height: 100vh;
  padding: 25px;

}
.search-box .search-bar{
  margin-left: 350px;
  display: block;
  width: 25%;
  padding: 15px;
  color: #1e1e1e;
  font-size: 20px;
  border-radius: 0px 16px 0px 16px;
  box-shadow: 0px 0px 16px rgba(0,0,0,0.25) ;
  appearance: none;
  border: none;
  outline: none;
  background: rgba(207, 196, 196, 0.42);
  transition: 0.4s
}
.search-box .search-bar:focus {
  box-shadow: 0px 0px 8px rgba(0,0,0,0.25);
  background-color: rgba(214, 219, 225, 0.75);
  border-radius: 16px 0px 16px 0px;
}
.search-box {
  width: 100%;
  margin-bottom: 30px;
  margin-left:auto;

}
.tableHeader {
  color: black;
  padding-right: 200px;
  font-size: large;
}
</style>
