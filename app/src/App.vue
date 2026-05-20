<script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '../src/utils/supabase'
  
const fish = ref([])
const error = ref(null)

onMounted(async () => {
  let { data: fishData, error : err } = await supabase
    .from('Fish')
    .select('*')
  if (err) {
    error.value = err.message
    console.log("error")
  } else {
    fish.value = fishData
    console.log("this is what is in the fish array")
    console.log(fishData)
    console.log(fish.value)
  }
})
</script>

<template>

<ul v-if="error">
  <h1>error</h1>
</ul>

<ul v-else>
  <li v-for="fishy in fish" :key="fish.id">
    ID: {{ fishy.id }} | User: {{ fishy.fish_name }} | ...
  </li>
</ul>

</template>