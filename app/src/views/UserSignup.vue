<script setup >
  import { ref, onMounted } from 'vue'
  import { supabase } from '../utils/supabase'
  
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

<form action="" method="get" class="form-example">
  <div class="form-example">
    <label for="name">Enter your name: </label>
    <input type="text" name="name" id="name" required />
  </div>
  <div class="form-example">
    <label for="email">Enter your email: </label>
    <input type="email" name="email" id="email" required />
  </div>
  <div class="form-example">
    <input type="submit" value="Subscribe!" />
  </div>
</form>

</template>