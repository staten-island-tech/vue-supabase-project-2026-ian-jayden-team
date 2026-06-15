<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../utils/supabase'
import { createClient } from '@supabase/supabase-js'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { storeEmail, storeUUID } = storeToRefs(authStore)
const supabaseData = createClient(
  'https://fawktaffalkeemtdkoqp.supabase.co',
  'sb_publishable_DIBLDRPI2-eAlv1slYRteQ_lpIcNQIa',
)

const users = ref([])
const errorr = ref(null)

const router = useRouter()

async function submit() {
  let { data, error } = await supabaseData.auth.signUp({
    email: email.value,
    password: password.value,
  })
  console.log(email.value)
  console.log(username.value)
  console.log(password.value)
  storeEmail.value = email.value
  console.log(storeEmail.value)
  let { data: authData, error: leError } = await supabase.from('users').select('id, email')
  console.log('This should fetch data from the users table')
  if (leError) {
    console.log(leError.message)
  } else {
    authArray.value = authData
    for (let i = 0; i < authArray.value.length; i++) {
      if (authArray.value[i].email === storeEmail.value) {
        storeUUID.value = authArray.value[i].id
        console.log(storeUUID.value)
      }
    }
  }
  const { err } = await supabase
    .from('users')
    .update({ username: username.value })
    .eq('email', email.value)
  await router.push({ path: '/fishview' })
}

let username = ref('')
let email = ref('')
let password = ref('')
</script>

<template>
  <h1>Sign Up</h1>
  <p>Username</p>
  <input v-model="username" placeholder="Enter your username here" />
  <p>Email</p>
  <input v-model="email" placeholder="Enter your email here" />
  <p>Password</p>
  <input v-model="password" placeholder="Enter your password here" />
  <button @click="submit">Sign Up</button>
  <router-link to="/">Already have an account? Log in!</router-link>
</template>
