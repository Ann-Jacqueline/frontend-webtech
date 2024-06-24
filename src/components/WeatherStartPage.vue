<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

// userName ref erstellen, um den Zustand des Nutzernamens zu halten
const userName = ref('');

// Instanzen von useRouter und useStore holen
const router = useRouter();
const store = useStore();

// onMounted Lifecycle Hook verwenden, um den userName bei Initialisierung zu leeren
onMounted(() => {
  userName.value = ''; // Setzt userName auf einen leeren String, wenn die Komponente gemountet wird
  console.log('Component mounted and userName cleared');
});

// Funktion, um zur Wetterseite zu navigieren
const navigateToWeather = async () => {
  if (userName.value.trim()) {
    await store.dispatch('setUser', userName.value.trim()); // Stelle sicher, dass Leerzeichen entfernt werden
    await router.push('/weather');
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
          Github Repository WebTech Frontend<br>
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
  z-index: 1020; // Hintergrund ist über der Navigationsleiste

  .fog-animation {
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
    top: 22%;
    right: 7%;
    left: 75%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); /* Subtiler Schatten für 3D-Effekt */
    transition: background-color 0.3s, box-shadow 0.3s; /* Weiche Übergänge für die Interaktion */
  }

  .name-input:focus {
    background-color: #ffffff; /* Blauer Hintergrund beim Fokussieren */
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.4); /* Blauer Glow-Effekt beim Fokussieren */
    outline: none; /* Entfernt den Standard-Browser-Fokus Rahmen */
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
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); /* Box-Shadow für Tiefe */
    transition: transform 0.1s, background-color 0.3s; /* Weiche Übergänge für das Drücken */
  }

  .next-button:active {
    background-color: rgba(25, 118, 210); /* Dunklerer Blauton beim Drücken */
    transform: scale(0.95); /* Skaliert den Button beim Drücken leicht herunter */
  }

  .footer-text {
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    .link {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: #fff;
      font-weight: 500;
      text-shadow: 0 2px 3px fade(black, 20);
      span {
        font-size: 18px;
        margin-left: 5px;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@keyframes animateFog {
  0% { background-position: 0 0; }
  100% { background-position: 10000px 0; }
}
</style>
