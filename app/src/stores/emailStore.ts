import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userEmailStore = defineStore('userEmail', () => {
  const userEmail = ref()

  return { userEmail }
})
