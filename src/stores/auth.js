import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const practitioner = ref({
    name: 'Dr. Jean Dupont',
    role: 'Médecin du sport',
    avatar: null
  })
  
  const isAuthenticated = ref(true) // Mock for MVP

  function login() {
    isAuthenticated.value = true
  }

  function logout() {
    isAuthenticated.value = false
  }

  return {
    practitioner,
    isAuthenticated,
    login,
    logout
  }
})
