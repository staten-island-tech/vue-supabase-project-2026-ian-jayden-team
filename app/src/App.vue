<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../src/utils/supabase'

const fish = ref([])
const fishLoadTF = ref(false)
const error = ref(null)
const users = ref([])
const userLoadTF = ref(false)

onMounted(async () => {
  let { data: fishdata, error: err } = await supabase.from('Fish').select('id, fish_name')
  console.log('This should fetch data from the Fish table')
  if (err) {
    error.value = err.message
  } else {
    fish.value = fishdata
    fishLoadTF.value = true
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
    userLoadTF.value = true
    console.log(users.value)
  }
})
</script>

<template>
  <div id="titleDiv">
    <h1>Fishing game</h1>
    <img
      id="coverPic"
      src="https://comicbook.com/wp-content/uploads/sites/4/2025/06/evangelion_rei-fishing_girlfriend-of-steel-01.jpg?resize=2000,1125"
    />
  </div>

  <ul v-if="error">
    <h1>error</h1>
  </ul>

  <ul v-else>
    <li v-for="fishy in fish" :key="fish.id">
      ID: {{ fishy.id }} | User: {{ fishy.fish_name }} | ...
    </li>
  </ul>
  <pre>{{ JSON.stringify(fishy, null, 2) }}</pre>

  <ul v-if="userLoadTF">
    <li v-for="user in users" :key="user.id">ID: {{ user.id }} | User: {{ user.email }} | ...</li>
  </ul>
  <pre>{{ JSON.stringify(user, null, 2) }}</pre>
</template>

<style>
#titleDiv {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#coverPic {
  width: 400px;
  height: 400px;
}
</style>
