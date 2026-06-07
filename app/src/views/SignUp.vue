<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { supabase } from '../utils/supabase'
  
const fish = ref([])
const error = ref("")

<<<<<<< Updated upstream
onMounted(async () => {
  let { data: fishdata, error: err } = await supabase
    .from('Fish')
    .select('id, fish_name')
=======
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
>>>>>>> Stashed changes
  if (err) {
    error.value = err.message
  } else {
    fish.value = fishdata
    console.log(fish.value)
  }
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
