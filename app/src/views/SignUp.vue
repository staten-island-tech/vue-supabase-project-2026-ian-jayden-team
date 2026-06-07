<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { supabase } from '../utils/supabase'
  
const fish = ref([])
const error = ref("")

onMounted(async () => {
  let { data: fishdata, error: err } = await supabase
    .from('Fish')
    .select('id, fish_name')
  if (err) {
    error.value = err.message
  } else {
    fish.value = fishdata
    console.log(fish.value)
  }
})
</script>

<template>

<h1>grass</h1>

<form id="myForm">
    <label>
      Username:
      <input type="text" name="name" required />
    </label>
    <label>
      Email:
      <input type="email" name="email" required />
    </label>
    <button type="submit">Submit</button>
</form>
<button type="button">Add to favorites</button>
</template>