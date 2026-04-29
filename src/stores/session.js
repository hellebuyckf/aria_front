import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSessionStore = defineStore('session', () => {
  const sessionId = ref(null)
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
    type: '',
    cote: 'bilateral',
    severite: 'moderee'
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

  const formulaireValide = computed(() => videos.value.sagittale !== null)

  const badgeSidebar = computed(() => {
    if (!patientId.value) return ''
    if (!pathologie.value.type) return patientId.value
    return `${patientId.value} · ${pathologieCourtLabel(pathologie.value.type)}`
  })

  function initialiser(patient) {
    patientId.value = patient.id
    horodatage.value = new Date().toISOString()
    statut.value = 'idle'
    
    // Pre-fill from patient folder if data exists
    if (patient.profil) {
      profil.value = { ...profil.value, ...patient.profil }
    }
    if (patient.pathologie) {
      pathologie.value = { ...pathologie.value, ...patient.pathologie }
    }
    if (patient.chaussure) {
      chaussure.value = { ...chaussure.value, ...patient.chaussure }
    }
  }

  function connecterStrava() {
    // Simulated for MVP
    entrainement.value.stravaConnecte = true
  }

  function connecterGarmin() {
    // Simulated for MVP
    entrainement.value.garminConnecte = true
  }

  function lancerAnalyse() {
    sessionId.value = `SES-${Date.now()}`
    statut.value = 'analyse'
  }

  function reset() {
    sessionId.value = null
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
    pathologie.value = {
      type: '',
      cote: 'bilateral',
      severite: 'moderee'
    }
    videos.value = {
      sagittale: null,
      posterieure: null
    }
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

  return {
    sessionId,
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
    connecterStrava,
    connecterGarmin,
    lancerAnalyse,
    reset
  }
})

function pathologieCourtLabel(type) {
  const table = {
    'Lombalgie (douleur lombaire à l\'effort)': 'Lombalgie',
    'Tendinite rotulienne (syndrome fémoro-patellaire)': 'Rotulienne',
    'Syndrome de la bandelette ilio-tibiale (SBIT)': 'SBIT',
    'Périostite tibiale (shin splints)': 'Périostite',
    'Tendinite du tendon d\'Achille': 'Achille',
    'Fasciite plantaire': 'Fasciite'
  }
  return table[type] ?? type
}
