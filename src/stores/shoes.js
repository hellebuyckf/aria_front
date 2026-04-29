import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useShoeStore = defineStore('shoes', () => {
  const allShoes = ref([])
  const loading = ref(false)
  const brands = ref([])

  async function loadDatabase() {
    if (allShoes.value.length > 0) return
    
    loading.value = true
    try {
      const response = await fetch('/data/chaussure_all.jsonl')
      const text = await response.text()
      const lines = text.trim().split('\n')
      
      allShoes.value = lines.map(line => JSON.parse(line))
      
      // Extract unique brands
      const uniqueBrands = new Set(allShoes.value.map(s => s.brand))
      brands.value = Array.from(uniqueBrands).sort()
    } catch (error) {
      console.error('Failed to load shoe database:', error)
    } finally {
      loading.value = false
    }
  }

  function search(query, brand = '', gender = '') {
    if (!query && !brand) return []
    
    const q = query.toLowerCase()
    const b = brand.toLowerCase()
    const g = gender.toLowerCase()
    
    return allShoes.value.filter(s => {
      const matchBrand = b ? s.brand.toLowerCase() === b : true
      const matchModel = q ? s.name.toLowerCase().includes(q) : true
      const matchGender = g ? (s.sexe.toLowerCase() === g || s.sexe.toLowerCase() === 'mixte') : true
      
      return matchBrand && matchModel && matchGender
    }).slice(0, 10) // Limit results for performance
  }

  return {
    allShoes,
    loading,
    brands,
    loadDatabase,
    search
  }
})
