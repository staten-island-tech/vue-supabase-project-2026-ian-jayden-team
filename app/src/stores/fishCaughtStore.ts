import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFishCaughtStore = defineStore('storeId', () => {
  const storeFish = ref()
  const storeFishImage = ref()

  return { storeFish, storeFishImage }
})
