import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useSessionStore = defineStore('session', () => {
  const sessionId = ref(null)
  const wsUrl = ref(null)
  const patientId = ref(null)
  const horodatage = ref(null)
  const statut = ref('idle') // 'idle' | 'en-cours' | 'analyse' | 'rapport' | 'erreur'

  const profil = ref({
    age: '',
    taille: '',
    poids: '',
    kmSemaine: '',
    niveauPratique: 'intermediaire'
  })

  const pathologie = ref({
    type: ''
  })

  const videos = ref({
    sagittale: null,
    posterieure: null
  })

  const chaussure = ref({
    marque: '',
    modele: '',
    drop: '',
    stabilite: '',
    amorti: '',
    poidsType: '',
    dynamisme: ''
  })

  const entrainement = ref({
    stravaConnecte: false,
    garminConnecte: false
  })

  const formulaireValide = computed(() => {
    return patientId.value !== null && videos.value.sagittale !== null
  })

  const badgeSidebar = computed(() => {
    if (!patientId.value) return ''
    if (!pathologie.value.type) return patientId.value
    return `${patientId.value} · ${pathologieCourtLabel(pathologie.value.type)}`
  })

  function initialiser(patient) {
    if (!patient) return
    patientId.value = patient.id
    profil.value = { ...patient.profil }
    horodatage.value = new Date().toISOString()
    videos.value = { sagittale: null, posterieure: null }
  }

  function updateProfil(data) {
    profil.value = { ...profil.value, ...data }
  }

  function setVideo(vue, file) {
    videos.value[vue] = file
  }

  function connecterStrava() {
    // Simulated for MVP
    entrainement.value.stravaConnecte = true
  }

  function connecterGarmin() {
    // Simulated for MVP
    entrainement.value.garminConnecte = true
  }

  async function lancerAnalyse() {
    statut.value = 'en-cours'

    // Fallback for Mock Mode
    if (import.meta.env.VITE_MOCK_WS === 'true') {
      sessionId.value = 'SES-mock'
      statut.value = 'analyse'
      return 'SES-mock'
    }

    try {
      const fd = new FormData()
      
      // Mandatory fields
      fd.append('patient_id', patientId.value)
      fd.append('video_sagittale', videos.value.sagittale)

      // Optional metadata
      if (pathologie.value.type) fd.append('pathologie_declaree', pathologie.value.type)
      if (profil.value.age) fd.append('age', parseInt(profil.value.age))
      if (profil.value.taille) fd.append('taille_cm', parseInt(profil.value.taille))
      if (profil.value.poids) fd.append('poids_kg', parseFloat(profil.value.poids))
      if (profil.value.kmSemaine) fd.append('km_semaine', parseInt(profil.value.kmSemaine))
      if (profil.value.niveauPratique) fd.append('niveau_pratique', profil.value.niveauPratique)
      
      // Optional video
      if (videos.value.posterieure) fd.append('video_posterieure', videos.value.posterieure)

      // Shoe profile as JSON string
      if (chaussure.value.marque) {
        fd.append('profil_chaussure', JSON.stringify({
          marque: chaussure.value.marque,
          modele: chaussure.value.modele || null,
          drop_mm: parseInt(chaussure.value.drop) || 0,
          stabilite: chaussure.value.stabilite || null,
          amorti: chaussure.value.amorti || null,
          poids_type: chaussure.value.poidsType || null,
          dynamisme: chaussure.value.dynamisme || null
        }))
      }

      const response = await api.post('/api/sessions', fd)
      
      if (response.data && response.data.session_id) {
        sessionId.value = response.data.session_id
        wsUrl.value = response.data.ws_url
        statut.value = 'analyse'
        return response.data.session_id
      }
    } catch (e) {
      console.error('Failed to start analysis', e)
      statut.value = 'erreur'
      throw e
    }
  }

  async function genererRapport() {
    try {
      await api.post(`/api/sessions/${sessionId.value}/generate`)
    } catch (e) {
      console.error('Failed to trigger report generation', e)
      throw e
    }
  }

  function reset() {
    sessionId.value = null
    wsUrl.value = null
    patientId.value = null
    horodatage.value = null
    statut.value = 'idle'
    profil.value = {
      age: '',
      taille: '',
      poids: '',
      kmSemaine: '',
      niveauPratique: 'intermediaire'
    }
    pathologie.value = { type: '' }
    videos.value = { sagittale: null, posterieure: null }
    chaussure.value = {
      marque: '',
      modele: '',
      drop: '',
      stabilite: '',
      amorti: '',
      poidsType: '',
      dynamisme: ''
    }
    entrainement.value = {
      stravaConnecte: false,
      garminConnecte: false
    }
  }

  function resetChaussure() {
    chaussure.value = {
      marque: '',
      modele: '',
      drop: '',
      stabilite: '',
      amorti: '',
      poidsType: '',
      dynamisme: ''
    }
  }

  return {
    sessionId,
    wsUrl,
    patientId,
    horodatage,
    statut,
    profil,
    pathologie,
    videos,
    chaussure,
    entrainement,
    formulaireValide,
    badgeSidebar,
    initialiser,
    updateProfil,
    setVideo,
    connecterStrava,
    connecterGarmin,
    lancerAnalyse,
    genererRapport,
    reset,
    resetChaussure
  }
})

function pathologieCourtLabel(type) {
  const table = {
    'Syndrome de la bandelette ilio-tibiale (SBIT)': 'SBIT',
    'Périostite tibiale (shin splints)': 'Périostite',
    'Tendinite du tendon d\'Achille': 'Achille',
    'Fasciite plantaire': 'Fasciite'
  }
  return table[type] ?? type
}
