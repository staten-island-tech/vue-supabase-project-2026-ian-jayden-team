<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../utils/supabase'

let username = ref('')
let email = ref('')
let password = ref('')

function handleSubmit(e: Event) {
  e.preventDefault()
  let signUpInfo = ({ username: username.value, email: email.value, password: password.value })
  console.log(signUpInfo)
  console.log(username.value, email.value, password.value)

}
</script>

<template>
  <h1>Sign Up</h1>

  <!-- use @submit.prevent to stop full page reload -->
  <form id="myForm" @submit="handleSubmit">
    <label>
      Username:
      <input type="text" name="name" v-model="username" required />
    </label>

    <label>
      Email:
      <input type="email" name="email" v-model="email" required />
    </label>

    <label>
      Password:
      <input type="password" name="password" v-model="password" required />
    </label>

    <button type="submit">Submit</button>
  </form>
</template>