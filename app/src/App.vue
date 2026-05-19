<script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '../src/utils/supabase'
  
const fish = ref([])
const error = ref(null)

onMounted(async () => {
  let { data: fishData, error : err } = await supabase
    .from('Fish')
})

</script>

<template>
  
</template>