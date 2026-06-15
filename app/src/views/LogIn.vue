<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../utils/supabase'
import { createClient } from '@supabase/supabase-js'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { storeEmail, storeUUID } = storeToRefs(authStore)
const authArray = ref([])

const supabaseData = createClient(
  'https://fawktaffalkeemtdkoqp.supabase.co',
  'sb_publishable_DIBLDRPI2-eAlv1slYRteQ_lpIcNQIa',
)

const router = useRouter()

async function submit() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  storeEmail.value = email.value
  console.log(storeEmail.value)
  let { data: authData, error: err } = await supabase.from('users').select('id, email')
  console.log('This should fetch data from the users table')
  if (err) {
    console.log(err.message)
  } else {
    authArray.value = authData
    for (let i = 0; i < authArray.value.length; i++) {
      if (authArray.value[i].email === storeEmail.value) {
        storeUUID.value = authArray.value[i].id
        console.log(storeUUID.value)
      }
    }
  }
  if (error) {
    console.log('Incorrect email or password')
  } else {
    await router.push({ path: '/fishview' })
  }
}

let email = ref('')
let password = ref('')
</script>

<template>
  <h1>Log In</h1>
  <p>Email</p>
  <input v-model="email" placeholder="Enter your email here" />
  <p>Password</p>
  <input v-model="password" placeholder="Enter your password here" />
  <button @click="submit">Log In</button>
  <router-link to="/signup">Don't have an account? Sign up!</router-link>
</template>
