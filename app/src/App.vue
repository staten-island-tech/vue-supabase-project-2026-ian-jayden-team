<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../src/utils/supabase'

const fish = ref([])
const error = ref(null)

onMounted(async () => {
  let { data: fishdata, error: err } = await supabase.from('Fish').select('id, fish_name')
  if (err) {
    error.value = err.message
  } else {
    fish.value = fishdata
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
  <pre>{{ JSON.stringify(fishy, null, 2) }}</pre>
</template>
