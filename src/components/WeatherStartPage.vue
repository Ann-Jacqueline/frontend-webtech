<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userName = ref('');
const router = useRouter();

const navigateToWeather = () => {
  if (userName.value.trim()) {
    localStorage.setItem('userName', userName.value);
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

  .name-input {
    margin: 20px 0;
    border-radius: 20px;
    border: none;
    width: 50%;
    padding: 20px;
    max-width: 350px;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.8); /* Slightly transparent white */
    color: #000; /* Text color */
    font-size: 20px; /* Adjust font size as necessary */
    outline: none; /* Remove the default focus outline */
    position: fixed;
    top:22%;
    right:7%;
    left:75%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9);

    &:focus {
      box-shadow: 0 0 8px rgba(33, 103, 128, 2); /* Blue glow effect */
      background-color: #fff; /* Solid white background on focus */

    }
  }

  .next-button {
    font-size: 30px;
    border: none;
    background-color: rgba(33, 103, 128); /* Semi-transparent black */
    color: white; /* White text color for contrast */
    cursor: pointer;
    z-index: 2;
    position: fixed;
    top: 23.5%; /* Adjust based on your layout needs */
    right: 5%; /* Changed from left to right for consistency */
    padding: 40px 40px; /* Padding for better touch area and visibility */
    border-radius: 50%; /* This makes the background round */
    width: 50px; /* Fixed width */
    height: 50px; /* Fixed height to make it a perfect circle */
    display: flex; /* To center the text/icon inside the button */
    align-items: center; /* Align text/icon vertically */
    justify-content: center; /* Align text/icon horizontally */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9); /* Optional: adds shadow for 3D effect */

  }


  .footer-text {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    color: white;
    z-index: 2;
  }
}

@keyframes animateFog {
  0% { background-position: 0 0; }
  100% { background-position: 10000px 0; }
}
</style>
