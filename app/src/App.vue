<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../src/utils/supabase'

const fish = ref([])
const fishLoadTF = ref(false)
const error = ref(null)
const users = ref([])
const userLoadTF = ref(false)
const displayFish = ref()

onMounted(async () => {
  let { data: fishdata, error: err } = await supabase.from('Fish').select('id, fish_name, image')
  console.log('This should fetch data from the Fish table')
  if (err) {
    error.value = err.message
  } else {
    fish.value = fishdata
    fishLoadTF.value = true //stands for fish load true/false
    console.log(fish.value)
  }
})

//second onMounted function
onMounted(async () => {
  let { data: userdata, error: err } = await supabase.from('users').select('id, email')
  console.log('This should fetch data from the User table')
  if (err) {
    error.value = err.message
  } else {
    users.value = userdata
    userLoadTF.value = true //stands for user load true/false
    console.log(users.value)
  }
})

function fishy() {
  if (fishLoadTF.value === true) {
    let fishNumber = Math.floor(Math.random() * fish.value.length)
    console.log(fishNumber)
    displayFish.value = JSON.stringify(fish.value[fishNumber].fish_name)
    console.log(displayFish.value)
  } else if (fishLoadTF.value === false) {
    displayFish.value =
      'The supabase has not been loaded yet. Please wait a few seconds and try again.'
    console.log(displayFish.value)
  }
}
</script>

<template>
  <div class="flexDiv">
    <h1>Fishing game</h1>
    <router-link to="/fishview">Press here to play</router-link>
    <img
      @click="fishy()"
      id="coverPic"
      src="https://comicbook.com/wp-content/uploads/sites/4/2025/06/evangelion_rei-fishing_girlfriend-of-steel-01.jpg?resize=2000,1125"
    />

    <h1>You caught the {{ displayFish }} fish! Congratulations!</h1>

    <ul v-if="error">
      <h1>error</h1>
    </ul>

    <ul v-else>
      <li class="flexDiv" v-for="fishy in fish" :key="fish.id">
        ID: {{ fishy.id }} | User: {{ fishy.fish_name }} | Image:
        <img id="fishyImage" :src="fishy.image" />
      </li>
    </ul>
    <pre>{{ JSON.stringify(fishy, null, 2) }}</pre>

    <p>Hey this is to break between the two lists</p>
    <ul v-if="userLoadTF">
      <li class="flexDiv" v-for="user in users" :key="user.id">
        ID: {{ user.id }} | User: {{ user.email }} | ...
      </li>
    </ul>
    <pre>{{ JSON.stringify(user, null, 2) }}</pre>
  </div>
</template>

<style>
.flexDiv {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 100vw;
}
#coverPic {
  width: 400px;
  height: 400px;
}

#fishyImage {
  width: 100px;
  height: 100px;
  margin-top: 10px;
}
</style>
