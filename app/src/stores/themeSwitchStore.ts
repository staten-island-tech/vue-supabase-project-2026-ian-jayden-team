import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeSwitchStore = defineStore('themeSwitcher', () => {
  const theme = ref('light')

  function switchTheme() {
  console.log("switching theme")
  if (theme.value === 'light') {
    theme.value = 'dark'
  } else {
    theme.value = 'light'
  }
  if (theme.value === 'dark') {
    document.documentElement.style.setProperty('--background-colour', 'navy');
    document.documentElement.style.setProperty('--text-color', 'lightblue');
  } else {
    document.documentElement.style.setProperty('--background-colour', 'lightblue');
    document.documentElement.style.setProperty('--text-color', 'navy');
  }
}

  return { theme, switchTheme }
})
