import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

//I really dislike TypeScript

export const useFishCaughtStore = defineStore('storeId', () => {
  const storeFish = ref('Spongebob')
  const storeFishImage = ref(
    'https://static.wikia.nocookie.net/cartoons/images/e/ed/Profile_-_SpongeBob_SquarePants.png/revision/latest?cb=20240420115914',
  )

  const storeFishTotal = computed(
    () => storeFish.value + ' has the appearance of a ' + storeFishImage,
  )

  function rename() {
    storeFish.value = 'Sigma'
  }

  return { storeFish, storeFishImage, storeFishTotal, rename }
})
