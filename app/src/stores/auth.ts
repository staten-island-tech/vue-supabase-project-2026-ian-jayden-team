import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('storeAuthId', () => {
  const storeEmail = ref()
  const storeUUID = ref()

  return { storeEmail, storeUUID }
})
