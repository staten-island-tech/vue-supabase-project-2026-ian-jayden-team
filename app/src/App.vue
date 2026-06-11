<script setup>
import { ref, onMounted } from 'vue'
</script>

<template>
  <div>
    <RouterView />
  </div>
  <img id="lolImage" src="/siths_logo.png  " />
</template>

<style scoped>
#lolImage {
  position: fixed;
  top: 0;
  right: 0;
  width: 200px;
  height: auto;
}
</style>
