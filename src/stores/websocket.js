import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWebSocketStore = defineStore('websocket', () => {
  const connected = ref(false)
  const wsStatus = ref('idle') // 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'failed'
  const pct = ref(0)
  const logEntries = ref([])
  const metrics = ref(null)
  const error = ref(null)
  const lastEvent = ref(null)

  let ws = null
  let reconnectAttempts = 0
  const maxReconnectAttempts = 3
  const reconnectDelays = [1000, 2000, 4000]

  function reset() {
    connected.value = false
    wsStatus.value = 'idle'
    pct.value = 0
    logEntries.value = []
    metrics.value = null
    error.value = null
    lastEvent.value = null
    reconnectAttempts = 0
    if (ws) {
      ws.close()
      ws = null
    }
  }

  function handleEvent(event) {
    lastEvent.value = event

    if (event.type === 'progress') {
      if (event.pct && event.pct > pct.value) {
        pct.value = event.pct
      }
      if (event.message) {
        logEntries.value.push({
          timestamp: new Date().toLocaleTimeString('fr-FR'),
          level: event.level || 'INFO',
          message: event.message
        })
        if (logEntries.value.length > 50) {
          logEntries.value.shift()
        }
      }
      if (event.metrics) {
        metrics.value = { ...metrics.value, ...event.metrics }
      }
    } else if (event.type === 'error') {
      error.value = {
        message: event.message,
        etape: event.etape,
        status: 'error'
      }
      wsStatus.value = 'failed'
    } else if (event.type === 'completed') {
      pct.value = 100
      wsStatus.value = 'connected'
    }
  }

  function connect(sessionId) {
    if (ws) ws.close()
    
    wsStatus.value = reconnectAttempts > 0 ? 'reconnecting' : 'connecting'
    
    // In a real app, this would be: new WebSocket(`ws://api.example.com/analysis/${sessionId}`)
    // For this MVP project, we simulate the connection
    console.log(`Connecting to WebSocket for session: ${sessionId}`)
    
    // Simulate real connection for the sake of the store's state machine
    setTimeout(() => {
      connected.value = true
      wsStatus.value = 'connected'
      reconnectAttempts = 0
    }, 500)
  }

  function disconnect() {
    if (ws) ws.close()
    reset()
  }

  function connectMock() {
    reset()
    wsStatus.value = 'connecting'
    
    const mockEvents = [
      { type: 'progress', etape: 'video', substep: 'ingestion', pct: 5, level: 'INFO', message: 'Initialisation du pipeline...' },
      { type: 'progress', etape: 'video', substep: 'ingestion', pct: 15, level: 'OK', message: 'Données vidéo ingérées (2.4s)' },
      { type: 'progress', etape: 'video', substep: 'extraction', pct: 30, level: 'ACTION', message: 'Extraction cinématique des points clés...' },
      { type: 'progress', etape: 'video', substep: 'extraction', pct: 40, level: 'OK', message: '142 points clés extraits (8.1s)' },
      { type: 'progress', etape: 'video', substep: 'calcul', pct: 55, level: 'OK', message: 'Vecteurs force calculés (5.9s)', metrics: { cadence: 172, oscillation_verticale: 11.2, angle_tibial: 14.8, flexion_genou: 22.4, penchee_tronc: 17.2, attaque_pied: 'midfoot', longueur_foulee: 'Normale', stabilite_cheville: 'Stable' } },
      { type: 'progress', etape: 'rag', substep: 'medical', pct: 65, level: 'ACTION', message: 'Consultation de la base de connaissances médicale...' },
      { type: 'progress', etape: 'rag', substep: 'medical', pct: 75, level: 'OK', message: 'Contexte clinique récupéré' },
      { type: 'progress', etape: 'rag', substep: 'web', pct: 85, level: 'ACTION', message: 'Web grounding scientifique (PubMed)...' },
      { type: 'progress', etape: 'rapport', substep: 'generation', pct: 92, level: 'INFO', message: 'Génération du protocole correctif...' },
      { type: 'progress', etape: 'rapport', substep: 'export', pct: 98, level: 'INFO', message: 'Export du rapport final...' },
      { type: 'completed', etape: 'rapport', substep: 'export', pct: 100, level: 'OK', message: 'Analyse terminée avec succès.' }
    ]

    let index = 0
    const interval = setInterval(() => {
      if (index < mockEvents.length) {
        handleEvent(mockEvents[index])
        index++
      } else {
        clearInterval(interval)
      }
    }, 800)

    connected.value = true
    wsStatus.value = 'connected'
  }

  return {
    connected,
    wsStatus,
    pct,
    logEntries,
    metrics,
    error,
    lastEvent,
    reset,
    connect,
    disconnect,
    connectMock
  }
})
