<script setup>
import { ref, onMounted, onBeforeMount, onUpdated } from 'vue'
import { useFishCaughtStore } from '@/stores/fishCaughtStore'
import { useThemeSwitchStore } from '@/stores/themeSwitchStore'
import { supabase } from '../utils/supabase'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const fish = ref([])
const fishLoadTF = ref(false)
const error = ref(null)
const users = ref([])
const router = useRouter()
const userLoadTF = ref(false)
const fishStore = useFishCaughtStore()
const { storeFish, storeFishImage, storeFishArray, push } = storeToRefs(fishStore)
const themeStore = useThemeSwitchStore()
const { theme, switchTheme } = storeToRefs(themeStore)
const authStore = useAuthStore()
const { storeEmail, storeUUID } = storeToRefs(authStore)

onMounted(async () => {
  console.log(storeEmail.value)
})

onBeforeMount(async () => {
  const { data: session, error: sessionError } = await supabase.auth.getSession()
  if (sessionError) {
    console.error('Error fetching session:', sessionError.message)
    return
  }
  if (!session || !session.session) {
    console.log('No active session found. Redirecting to login.')
    await router.push({ path: '/' })
  } else {
    console.log('Active session found:', session.session)
  }
})

onBeforeMount(async () => {
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

let { data: fishdata, error: err } = await supabase.from('users').select('email')

joinFishArray.value = fishdata
joinSusArray.value = sussydata

for (let i = 0; i < joinFishArray.value.length; i++) {
  for (let j = 0; j < joinSusArray.value.length; j++) {
    if (joinFishArray.value[i].fish_name === joinSusArray.value[j].name) {
      joinTotalArray.value.push({
        fish: joinFishArray.value[i]?.fish_name,
        sussy: joinSusArray.value[j]?.status,
      })
    }
  }
}

const joinFishArray = ref([])
const joinSusArray = ref([])
const joinTotalArray = ref([])
onMounted(async () => {
  let { data: fishdata, error: err } = await supabase.from('Fish').select('fish_name')
  let { data: sussydata, error: err2 } = await supabase.from('sussy_fish').select('name, status')

  if (err || err2) {
    // handle errors (example)
    console.error(err ?? err2)
    return
  }

  joinFishArray.value = fishdata
  joinSusArray.value = sussydata

  for (let i = 0; i < joinFishArray.value.length; i++) {
    for (let j = 0; j < joinSusArray.value.length; j++) {
      if (joinFishArray.value[i].fish_name === joinSusArray.value[j].name) {
        joinTotalArray.value.push({
          fish: joinFishArray.value[i]?.fish_name,
          sussy: joinSusArray.value[j]?.status,
        })
      }
    }
  }

  console.log('fishdata', fishdata)
  console.log('sussydata', sussydata)
  console.log('Total is ' + JSON.stringify(joinTotalArray.value))
})



async function fishy() {
  if (fishLoadTF.value === true) {
    let fishNumber = Math.floor(Math.random() * fish.value.length)
    storeFishImage.value = fish.value[fishNumber].image
    storeFish.value = JSON.stringify(fish.value[fishNumber].fish_name)
    let { data: userdata, error: err } = await supabase.from('users').select('email')
    if (err) {
      console.error('Error fetching user data:', err.message)
      return
    }
    for (let i = 0; i < userdata.length; i++) {
      if (userdata[i].email === storeEmail.value) {
        storeUUID.value = userdata[i].id
        console.log(storeUUID.value)
      }
    }
    const { error } = await supabase
      .from('Caught Fish')
      .insert({ fish_id: fish.value[fishNumber].id, user_id: storeUUID.value })
    console.log(JSON.stringify(storeFishArray.value))
  } else if (fishLoadTF.value === false) {
    storeFish.value =
      'The supabase has not been loaded yet. Please wait a few seconds and try again.'
    console.log(storeFish.value)
  }
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error.message)
  } else {
    await router.push({ path: '/' })
  }
}
</script>

<template>
  <button @click="themeStore.switchTheme">Switch Theme</button>
  <div class="flexDiv">
    <h1>Fishing game</h1>
    <router-link to="/caughtfish">Click here to see the fish you caught!</router-link>
    <button @click="signOut()">Sign Out</button>
    <img
      @click="fishy()"
      id="coverPic"
      src="https://comicbook.com/wp-content/uploads/sites/4/2025/06/evangelion_rei-fishing_girlfriend-of-steel-01.jpg?resize=2000,1125"
    />

    <div v-if="storeFish != null" class="flexDiv">
      <h1>You caught the {{ storeFish }} fish! Congratulations !</h1>
      <img id="fishyImage" :src="storeFishImage" />
    </div>
    <h1 v-else>Please click the image above to catch a fish!</h1>

    <ul v-if="error">
      <h1>error</h1>
    </ul>

    <ul>
      <li class="flexDiv" v-for="el in joinTotalArray" :key="el.fish">
        Here are some potentially sus fish: {{ el.fish }} (Sus Status: {{ el.sussy }})
      </li>
    </ul>
  </div>
</template>

<style>
:root {
  --background-colour: lightblue;
  --text-color: navy;
}

body {
  background-color: var(--background-colour);
  color: var(--text-color);
}

.flexDiv {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 60vw;
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
