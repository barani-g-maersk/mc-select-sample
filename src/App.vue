<script lang="ts">
import { storeToRefs } from 'pinia';
import { useAlertStore } from '@/stores/alert.store';
import { defineComponent, ref } from "vue";
import NavBar from "@/components/NavBar/NavBar.vue";
import router from "@/router";
import { useAuthStore } from '@/stores/auth.store';

import CaptureAssessor from "@/components/SurveyManagement/CaptureAssessor/CaptureAssessor.vue"
export default defineComponent({
  components: { CaptureAssessor },
  setup() {
    
}
});
</script>
<template>
  <!-- Overall Screen dispaly -->
  <div>
    <!-- Header for all the screens -->
    <CaptureAssessor/>
  </div>
 
</template>
<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: var(--mdt-brand-font-family);
  font-style: var(--mdt-brand-font--display-2-font-style);
  /* font-weight: var(--mdt-brand-font--display-2-font-weight); */
  /* font-size: var(--mdt-brand-font--display-2-font-size-mobile); */
  letter-spacing: var(--mdt-brand-font--display-2-font-letter-spacing-mobile);
  /* line-height: var(--mdt-brand-font--display-2-font-line-height-mobile); */


  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


.header-style {
  display: grid;
  grid-template-columns: 60% 40%;
  padding: 8px;
  text-align: left;
  -webkit-box-shadow: 0 5px 5px -6px black;
  -moz-box-shadow: 0 5px 5px -6px black;
  box-shadow: 0 5px 5px -6px black;
  z-index: 99;

  /* -moz-box-shadow:    inset 0 0 10px #000000;
     -webkit-box-shadow: inset 0 0 10px #000000;
     box-shadow:         inset 0 0 10px #000000; */
}

img {
  display: inline;
  vertical-align: middle;
}

h4.liketext {
  display: inline;
  vertical-align: baseline;
  top: 3px;
  padding-left: 10px;
  font-size: 20px;
  font-weight: 500;
  text-transform: uppercase;
}

/* img {
      width: 100px;
      height: 100px;
      background-color: grey;
  } */
.overall-container {
  display: grid;
  grid-template-columns: 10% 90%;
  gap: 0px;
  padding: 0px;
  height: calc(105vh - 100px);
}

.overall-view {
  /* background-color: rgba(255, 255, 255, 0.8); */
  height: 100%;
  width: auto;
  max-width: max-content;
}

.nav-view {
  font-size: 15px !important;
  /* text-align: center; */
}

.route-view {
  /* font-size: 15px; */
  text-align: center;
  /* background-color: rgba(255, 255, 255, 0.8); */
  z-index: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

thead,
th {
  background-color: #3f87a6;
  color: #fff;
}

.alertC {
  z-index: auto;
  padding: 20px;
  background-color: #f44336;
  color: white;
  opacity: 1;
  transition: opacity 0.6s;
  margin-bottom: 15px;
}

.alertC.success {
  background-color: #04AA6D;
}

.alertC.info {
  background-color: #2196F3;
}

.alertC.warning {
  background-color: #ff9800;
}

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: black;
}

.split {
  display: grid;
  grid-template-columns: 100%;
}

.logout-popup {
  position: fixed;
  top: 0%;
  left: 0%;
  right: 0;
  bottom: 0%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-popup-inner {
  background: white;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 20%);
  font-size: 16px;
}

.cbutton-group {
  display: flex;
  gap: 10px;
  padding-top: 20px;
}
</style>

