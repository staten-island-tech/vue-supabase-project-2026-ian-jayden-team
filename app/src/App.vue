<<<<<<< HEAD
<template>
<ul v-if="error">
  <h2>
    error!
  </h2>
<ul>
<ul v-else>
  <li v-for="transaction in transactions" :key="transaction.id">
    ID: {{ transaction.id }} | User: {{ transaction.user_id }} | ...
  </li>
</ul>
</template>

<script setup lang="js">
VITE_SUPABASE_URL="https://fawktaffalkeemtdkoqp.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="sb_publishable_DIBLDRPI2-eAlv1slYRteQ_lpIcNQIa"

import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import { ref, onMounted } from 'vue'
import { supabase } from './supabase'

const transactions = ref([])
const error = ref(null)

onMounted(async () => {
  let { data: transactionData, error: err } = await supabase
    .from('Fish')
    .select('*')
  if (err) {
    error.value = err.message
  } else {
    transactions.value = transactionData
=======
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
>>>>>>> main
  }
})
</script>

<<<<<<< HEAD
<style>
</style>
=======
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
>>>>>>> main
