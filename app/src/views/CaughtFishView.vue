<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useFishCaughtStore } from '@/stores/fishCaughtStore'
import { supabase } from '../utils/supabase'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const fishStore = useFishCaughtStore()
const { storeFish, storeFishImage, storeFishArray, push } = storeToRefs(fishStore)
const weightMinRef = ref()
const nameMinRef = ref()
const router = useRouter()

onBeforeMount(async () => {
  const { data: session, error: sessionError } = await supabase.auth.getSession()
  if (sessionError) {
    console.error('Error fetching session:', sessionError.message)
    return
  }
  if (!session || !session.session) {
    console.log('No active session found. Redirecting to login.')
    await router.push({ path: '/' })
  }
  else {
    console.log('Active session found:', session.session)
  }
})

onMounted(async () => {
  let { data: weightdata, error: err } = await supabase
    .from('Fish')
    .select('weight, fish_name')
    .order('weight', { ascending: true })
    .limit(1)
    .single()
  console.log('This should fetch data from the Fish table')
  if (err) {
    error.value = err.message
  } else {
    weightMinRef.value = weightdata?.weight ?? null
    nameMinRef.value = weightdata?.fish_name ?? null
    //the first ? does the optional chaining thing  so there's no "weight": 1 by reading the weight property and the ?? makes the variable display null if the result is null
    //im pretty sure the ?? null isn't needed though
  }
})

storeFishArray.value.splice(0, 1)

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log("error")
    console.error('Error signing out:', error.message)
  } else {
    console.log("signing out")
    await router.push({ path: '/' })
  }
}
</script>

<template>
  <div class="flexDiv">
    <h1>Your caught fish:</h1>
    <router-link to="/fishing">Click here to go back to fishing!</router-link>
    <button @click="signOut()">Sign Out</button>
    <img
      id="coverPic"
      src="https://preview.redd.it/rei-fishing-collection-v0-tv4wosi41r7e1.jpg?width=640&crop=smart&auto=webp&s=7f07c9fe17511f38d5c4873d3f544a46941f662b"
    />
    <li class="flexDiv" v-for="element in storeFishArray">
      Name: {{ element.name }}
      <img id="fishyImage" :src="element.img" />
    </li>

    <pre>{{ JSON.stringify(fishy, null, 2) }}</pre>

    <p>
      Did you know the lightest fish you can catch in this game is the {{ nameMinRef }} fish which
      weighs {{ weightMinRef }} pound!
    </p>
  </div>
</template>

<style>
.flexDiv {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 60vw;
}

#fishyImage {
  width: 100px;
  height: 100px;
  margin-top: 10px;
}
</style>
