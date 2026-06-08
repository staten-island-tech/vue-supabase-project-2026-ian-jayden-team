import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFishCaughtStore = defineStore('storeId', () => {
  const storeFish = ref()
  const storeFishImage = ref()
  const storeFishArray = ref([{}])

  const storeFishTotal = computed(
    () => storeFish.value + ' has the appearance of a ' + storeFishImage,
  )

  function push() {
    storeFishArray.value.push({ name: storeFish.value, img: storeFishImage.value })
  }

  return { storeFish, storeFishImage, storeFishArray, storeFishTotal, push }
})
