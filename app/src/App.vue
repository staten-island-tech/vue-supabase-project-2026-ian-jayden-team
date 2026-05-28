<script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '../src/utils/supabase'
  
const fish = ref([])
const error = ref(null)

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

<RouterView />


</template>