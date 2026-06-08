<script setup>
import { ref, onMounted } from 'vue'
import { useFishCaughtStore } from '@/stores/fishCaughtStore'
import { supabase } from '../utils/supabase'
import { storeToRefs } from 'pinia'

const fishStore = useFishCaughtStore()
const { storeFish, storeFishImage, storeFishArray, push } = storeToRefs(fishStore)
const fishWeightRef = ref()
const error = ref(null)

// onMounted(async () => {
//   let { data: weightdata, error: weight_err } = await supabase.from('Fish').select('MIN(weight)')
//   console.log('This should fetch the minimum weight')

//   if (weight_err) {
//     error.value = weight_err.message
//   } else {
//     fishWeightRef.value = JSON.stringify(weightdata)
//     console.log(fishWeightRef.value)
//   }
// })

//aggregate (using MIN() didn't work)
onMounted(async () => {
  const { data, error } = await supabase
    .from('Fish')
    .select('weight')
    .order('weight', { ascending: true })
    .limit(1)

  if (!error && data?.length) {
    fishWeightRef.value = data[0].weight
  }
})
</script>

<template>
  <div class="flexDiv">
    <h1>Your caught fish:</h1>
    <router-link to="/fishview">Click here to go back to fishing!</router-link>
    <img
      id="coverPic"
      src="https://preview.redd.it/rei-fishing-collection-v0-tv4wosi41r7e1.jpg?width=640&crop=smart&auto=webp&s=7f07c9fe17511f38d5c4873d3f544a46941f662b"
    />
    <li class="flexDiv" v-for="element in storeFishArray" :key="element.name">
      Name: {{ element.name }}
      <img id="fishyImage" :src="element.img" />
    </li>

    <pre>{{ JSON.stringify(element, null, 2) }}</pre>

    <ul v-if="error">
      <h1>error</h1>
    </ul>
    <p>Fun fact: the lightest fish you can catch in this game is {{ fishWeightRef }} pound!</p>
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
