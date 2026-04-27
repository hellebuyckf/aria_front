import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePatientsStore = defineStore('patients', () => {
  const list = ref([])
  const searchQuery = ref({ name: '', nir: '' })
  const pagination = ref({ page: 1, perPage: 4, total: 0 })
  const activePatient = ref(null)
  const loading = ref(false)

  const filtered = computed(() => {
    return list.value.filter(p => {
      const matchName = (p.lastName + ' ' + p.firstName).toLowerCase()
        .includes(searchQuery.value.name.toLowerCase())
      
      const matchNir = searchQuery.value.nir 
        ? p.nir.replace(/\s/g, '').includes(searchQuery.value.nir.replace(/\s/g, '')) 
        : true
        
      return matchName && matchNir
    })
  })

  const paginated = computed(() => {
    const start = (pagination.value.page - 1) * pagination.value.perPage
    return filtered.value.slice(start, start + pagination.value.perPage)
  })

  const totalPages = computed(() => Math.ceil(filtered.value.length / pagination.value.perPage))

  function search(query) {
    searchQuery.value = { ...query }
    pagination.value.page = 1
  }

  function setActive(patient) {
    activePatient.value = patient
  }

  function fetchPage(n) {
    pagination.value.page = n
  }

  function loadMock() {
    loading.value = true
    // Simulate API delay
    setTimeout(() => {
      list.value = MOCK_PATIENTS
      pagination.value.total = MOCK_PATIENTS.length
      loading.value = false
    }, 500)
  }

  return {
    list,
    searchQuery,
    pagination,
    activePatient,
    loading,
    filtered,
    paginated,
    totalPages,
    search,
    setActive,
    fetchPage,
    loadMock
  }
})

const MOCK_PATIENTS = [
  { id: 'PAT-2024-089', lastName: 'MARTIN', firstName: 'Jean-Pierre', lastSession: '2024-03-14', nir: '1 75 03 75 108 001 20' },
  { id: 'PAT-2023-110', lastName: 'BERNARD', firstName: 'Marie', lastSession: '2024-02-02', nir: '2 83 07 69 123 004 45' },
  { id: 'PAT-2024-001', lastName: 'DUBOIS', firstName: 'Thomas', lastSession: null, nir: '1 92 11 44 078 002 63' },
  { id: 'PAT-2022-445', lastName: 'LEFEBVRE', firstName: 'Sophie', lastSession: '2023-11-28', nir: '2 68 09 13 055 007 81' },
  { id: 'PAT-2023-203', lastName: 'MOREAU', firstName: 'Lucas', lastSession: '2024-01-15', nir: '1 01 01 75 056 003 27' },
  { id: 'PAT-2021-078', lastName: 'SIMON', firstName: 'Claire', lastSession: '2023-08-22', nir: '2 95 04 67 112 009 54' },
]
