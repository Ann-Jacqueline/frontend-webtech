<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const userName = ref('');
const router = useRouter();
const store = useStore();

const navigateToWeather = () => {
  if (userName.value.trim()) {
    // Hier wird die Vuex Aktion aufgerufen, um den Benutzernamen zu speichern.
    store.dispatch('setUser', userName.value);
    router.push('/weather');
  }
};
</script>


<template>
  <div class="start-page">
    <div class="fog-animation"></div>
    <input v-model="userName" placeholder="Enter your name here" class="name-input"/>
    <button @click="navigateToWeather" class="next-button">→</button>
    <div class="footer-text">
      <a href="https://github.com/Ann-Jacqueline/frontend-webtech/" target="_blank" class="link">
        <span>
          Github Repository WebTech von Ann-Jacqueline und Emilie<br>
          Dozenten: Wider/Larisch
        </span>
      </a>
    </div>
  </div>
</template>


<style scoped lang="less">
.start-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: url('@/assets/images/Weather_Main_Page.jpg') no-repeat center center;
  background-size: cover;
  text-align: center;
  position: relative;

  .fog-animation {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/images/fog.png');
    background-repeat: repeat-x;
    animation: animateFog 150s linear infinite;
  }

  .name-input, .next-button {
    z-index: 2;
  }

  .name-input {
    margin: 20px 0;
    border-radius: 20px;
    border: none;
    padding: 20px;
    max-width: 350px;
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 20px;
    position: fixed;
    top:22%;
    right: 7%;
    left: 75%;
  }

  .next-button {
    font-size: 30px;
    border: none;
    background-color: rgba(33, 103, 128);
    color: white;
    cursor: pointer;
    position: fixed;
    top: 23.5%;
    right: 5%;
    padding: 40px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .footer-text {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    color: white;
  }
}

@keyframes animateFog {
  0% { background-position: 0 0; }
  100% { background-position: 10000px 0; }
}
</style>
