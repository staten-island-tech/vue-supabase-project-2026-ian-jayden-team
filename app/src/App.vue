<script setup lang="ts">
VITE_SUPABASE_URL=https://fawktaffalkeemtdkoqp.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_DIBLDRPI2-eAlv1slYRteQ_lpIcNQIa
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
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
  }
})
</script>

<template>
<ul v-else>
  <li v-for="transaction in transactions" :key="transaction.id">
    ID: {{ transaction.id }} | User: {{ transaction.user_id }} | ...
  </li>
</ul>
</template>

<style>
</style>
