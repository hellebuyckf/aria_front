import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useReportStore = defineStore('report', () => {
  const report = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchReport(sessionId) {
    loading.value = true
    error.value = null
    try {
      if (import.meta.env.VITE_MOCK_API === 'true' || sessionId === 'SES-mock') {
        await new Promise(r => setTimeout(r, 600)) // simulate latency
        report.value = getMockReport(sessionId)
      } else {
        const res = await api.get(`/api/sessions/${sessionId}/report`)
        report.value = res.data
      }
    } catch (e) {
      error.value = e.message
      console.error('Failed to fetch report', e)
    } finally {
      loading.value = false
    }
  }

  async function downloadPdf(sessionId, patientId, date) {
    try {
      const res = await api.get(`/api/sessions/${sessionId}/report/pdf`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `aria_rapport_${patientId}_${date}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (e) {
      console.error('Failed to download PDF', e)
    }
  }

  function reset() {
    report.value = null
    error.value = null
  }

  return { report, loading, error, fetchReport, downloadPdf, reset }
})

function getMockReport(sessionId) {
  return {
    "session_id": sessionId || "SES-2026-042",
    "patient_id": "PAT-2026-042",
    "date": "2026-04-22",
    "numero_session": 1,
    "pathologie": "Lombalgie",
    "confiance": "modérée",
    "chaussure": {
      "marque": "Brooks",
      "modele": "Ghost 16",
      "drop_mm": 12
    },
    "profil": {
      "age": 38,
      "poids_kg": 78,
      "taille_cm": 176,
      "km_semaine": 60,
      "niveau": "Intermédiaire"
    },
    "metriques_anormales": [
      "cadence",
      "inclinaison_tronc",
      "oscillation_verticale",
      "attaque_pied",
      "longueur_foulee"
    ],
    "metriques": [
      { "id": "cadence", "label": "Cadence", "norme": "170 – 185 spm", "valeur": "158 spm", "statut": "anormal" },
      { "id": "penchee_tronc", "label": "Penchée du tronc", "norme": "5° – 10°", "valeur": "17.2°", "statut": "anormal" },
      { "id": "oscillation_verticale", "label": "Oscillation verticale", "norme": "6 – 9 cm", "valeur": "11.2 cm", "statut": "limite" },
      { "id": "attaque_pied", "label": "Attaque du pied", "norme": "Medio-pied", "valeur": "Talon prononcé", "statut": "anormal" },
      { "id": "angle_tibial", "label": "Angle tibial à l'impact", "norme": "8° – 12°", "valeur": "14.8°", "statut": "limite" },
      { "id": "longueur_foulee", "label": "Longueur de foulée", "norme": "Normale", "valeur": "Excessif", "statut": "anormal" },
      { "id": "flexion_genou", "label": "Flexion du genou", "norme": "15° – 25°", "valeur": "22.4°", "statut": "normal" }
    ],
    "anomalies": [
      { "titre": "Surcharge lombaire par penchée excessive du tronc", "corps": "L'inclinaison antérieure excessive du tronc augmente significativement les contraintes de cisaillement sur les disques intervertébraux L4-L5.", "refs": [1, 2] },
      { "titre": "Syndrome frein : attaque talon + foulée longue", "corps": "L'attaque par le talon combinée à une jambe trop tendue devant le centre de gravité génère des forces d'impact importantes.", "refs": [2, 4] },
      { "titre": "Cadence sous-optimale : 158 spm", "corps": "Une cadence basse augmente le temps de contact au sol et l'oscillation verticale, facteurs de risque connus.", "refs": [5] }
    ],
    "alerte_equipement": {
      "titre": "Brooks Ghost 16 — Drop 12 mm non adapté à cette configuration",
      "corps": "Le drop important favorise une attaque talon et une posture penchée. Un passage progressif vers un drop 6-8mm est recommandé."
    },
    "protocole": {
      "intro": "Protocole personnalisé généré sur la base des métriques biomécaniques...",
      "phases": [
        { 
          "numero": 1, 
          "titre": "Décharge et correction posturale", 
          "semaines": "1 – 3", 
          "exercices": [
            { "nom": "Réduction kilométrage", "description": "Réduire le volume de 40% pour diminuer la charge lombaire." },
            { "nom": "Renforcement core profond", "description": "Planches et dead-bug pour stabiliser le bassin." }
          ] 
        },
        { "numero": 2, "titre": "Rééducation de la foulée", "semaines": "4 – 7", "exercices": [] },
        { "numero": 3, "titre": "Consolidation et retour compétition", "semaines": "8 – 12", "exercices": [] }
      ]
    },
    "sources": [
      { "index": 1, "auteurs": "Barr et al.", "annee": 2023, "titre": "Core stability training...", "revue": "Journal of Sports Medicine", "pmid": "37412890" },
      { "index": 2, "auteurs": "Smith et al.", "annee": 2022, "titre": "Impact forces in running...", "revue": "Gait & Posture", "pmid": "36198234" }
    ],
    "meta": { "confiance_keypoints": 87, "nb_cycles": 42, "modele": "MedGemma 4B-it" }
  }
}
