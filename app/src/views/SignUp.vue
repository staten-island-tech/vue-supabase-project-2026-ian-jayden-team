<script setup>
import { ref } from 'vue'
import { supabase } from '../utils/supabase'
import { createClient } from '@supabase/supabase-js'

const supabaseData = createClient(
  'https://fawktaffalkeemtdkoqp.supabase.co',
  'sb_publishable_DIBLDRPI2-eAlv1slYRteQ_lpIcNQIa',
)

const users = ref([])
const error = ref(null)

async function submit() {
  let { data, error } = await supabaseData.auth.signUp({
    email: email.value,
    password: password.value,
  })
  let { data: userData, error: err } = await supabase.from('users').select('id, email')
  if (err) {
    error.value = err.message
  } else {
    users.value = userData
    console.log(users.value)
  }
  // const user =
}

let username = ref('')
let email = ref('')
let password = ref('')
</script>

<template>
  <h1>Sign Up</h1>
  <p>input username</p>
  <input v-model="username" />
  <p>input email</p>
  <input v-model="email" />
  <p>input password</p>
  <input v-model="password" />
  <button @click="submit">Sign Up</button>
  <button @click="giveUserdata">give userdata</button>
</template>
