<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../utils/supabase'
import { createClient } from '@supabase/supabase-js'

const supabaseData = createClient('https://fawktaffalkeemtdkoqp.supabase.co', 'sb_publishable_DIBLDRPI2-eAlv1slYRteQ_lpIcNQIa')

const users = ref([])
const errorr = ref(null)

async function submit() {
  let { data, error } = await supabaseData.auth.signUp({
    email: email.value,
    password: password.value,
  })
  console.log(email.value)
  console.log(username.value)
  console.log(password.value)
  const {  } = await supabase
    .from('users')
    .update({ username: username.value })
    .eq('email', email.value)
}

let username = ref('')
let email = ref('')
let password = ref('')
</script>

<template>
  <h1>Sign Up</h1>
  <p>input username</p>
  <input v-model="username">
  <p>input email</p>
  <input v-model="email">
  <p>input password</p>
  <input v-model="password">
  <button @click="submit">Sign Up</button>
</template>