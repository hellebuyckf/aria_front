import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWebSocketStore = defineStore('websocket', () => {
  const connected = ref(false)
  const wsStatus = ref('idle') // 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'failed'
  const pct = ref(0)
  const logEntries = ref([])
  const metrics = ref(null)
  const metriquesAnormales = ref([])
  const keyFrames = ref([])
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
    metriquesAnormales.value = []
    keyFrames.value = []
    error.value = null
    lastEvent.value = null
    reconnectAttempts = 0
    if (ws) {
      ws.close()
      ws = null
    }
  }

  function handleEvent(event) {
    if (event.type === 'ping' || event.type === 'connected') return

    lastEvent.value = event

    // Extract metriques_anormales from wherever the backend places it
    const anormales = event.report?.metriques_anormales
      ?? event.metriques_anormales
      ?? event.metrics?.metriques_anormales
    if (anormales) metriquesAnormales.value = anormales

    // Extract metrics (may arrive in any event)
    if (event.metrics) metrics.value = event.metrics

    if (event.type === 'progress' || event.type === 'metrics') {
      if (event.pct !== undefined && event.pct > pct.value) {
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
    } else if (event.type === 'ready') {
      if (event.pct !== undefined) {
        pct.value = event.pct
      }
      if (event.diagnostic) {
        metrics.value = { ...metrics.value, ...event.diagnostic }
      }
      if (event.message) {
        logEntries.value.push({
          timestamp: new Date().toLocaleTimeString('fr-FR'),
          level: event.level || 'OK',
          message: event.message
        })
      }
      wsStatus.value = 'connected'
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
      if (event.key_frames?.length) keyFrames.value = event.key_frames
    }
  }

  function connect(sessionId, customUrl = null) {
    if (ws) ws.close()
    
    wsStatus.value = reconnectAttempts > 0 ? 'reconnecting' : 'connecting'
    
    let wsUrl = ''
    if (customUrl) {
      // If backend returns a relative path like /ws/session/xxx
      if (customUrl.startsWith('/')) {
        const baseUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000'
        wsUrl = `${baseUrl}${customUrl}`
      } else {
        wsUrl = customUrl
      }
    } else {
      const baseUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000'
      wsUrl = `${baseUrl}/ws/session/${sessionId}`
    }
    
    console.log(`Connecting to WebSocket: ${wsUrl}`)
    
    try {
      ws = new WebSocket(wsUrl)

      ws.onopen = () => {
        connected.value = true
        wsStatus.value = 'connected'
        reconnectAttempts = 0
        console.log('WebSocket connected')
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          handleEvent(data)
        } catch (e) {
          console.error('Failed to parse WS message', e)
        }
      }

      ws.onclose = () => {
        connected.value = false
        if (wsStatus.value !== 'failed' && reconnectAttempts < maxReconnectAttempts) {
          wsStatus.value = 'reconnecting'
          setTimeout(() => {
            reconnectAttempts++
            connect(sessionId, customUrl)
          }, reconnectDelays[reconnectAttempts])
        } else if (reconnectAttempts >= maxReconnectAttempts) {
          wsStatus.value = 'failed'
        }
      }

      ws.onerror = (err) => {
        console.error('WebSocket error', err)
        // ws.close() will trigger reconnection logic
      }
    } catch (e) {
      console.error('WebSocket connection failed', e)
      wsStatus.value = 'failed'
    }
  }

  function disconnect() {
    if (ws) ws.close()
    reset()
  }

  function connectMock() {
    reset()
    wsStatus.value = 'connecting'
    
    const mockEvents = [
      { type: 'progress', etape: 'video', pct: 5, level: 'INFO', message: 'Initialisation du pipeline...' },
      { type: 'progress', etape: 'video', pct: 15, level: 'OK', message: 'Données vidéo ingérées (2.4s)' },
      { type: 'progress', etape: 'video', pct: 30, level: 'ACTION', message: 'Extraction cinématique des points clés...' },
      { type: 'progress', etape: 'video', pct: 40, level: 'OK', message: '142 points clés extraits (8.1s)' },
      { type: 'progress', etape: 'video', pct: 55, level: 'OK', message: 'Vecteurs force calculés (5.9s)' },
      {
        type: 'metrics',
        pct: 38,
        message: 'Métriques sagittales calculées',
        metriques_anormales: ['cadence', 'flexion_genou_impact'],
        metrics: {
          cadence: 147.5,
          angle_attaque_pied: 'midfoot',
          flexion_genou_impact: 16.8,
          inclinaison_tronc: null,
          oscillation_verticale: 2.08,
          ratio_contact_suspension: 0.625,
          pelvic_drop: null,
          valgus_genou: null,
          asymetrie_charge: null,
          oscillation_laterale_hanche: null,
          pronation_pied: null,
          vue_posterieure_disponible: false
        }
      },
      {
        type: 'metrics',
        pct: 40,
        message: 'Métriques postérieures ajoutées',
        metriques_anormales: ['cadence', 'flexion_genou_impact', 'valgus_genou', 'pelvic_drop'],
        metrics: {
          cadence: 148.2,
          angle_attaque_pied: 'midfoot',
          flexion_genou_impact: 16.8,
          inclinaison_tronc: 8.5,
          oscillation_verticale: 2.08,
          ratio_contact_suspension: 0.625,
          pelvic_drop: 4.2,
          valgus_genou: 6.8,
          asymetrie_charge: 5.4,
          oscillation_laterale_hanche: 2.1,
          pronation_pied: 5.4,
          vue_posterieure_disponible: true
        }
      },
      { type: 'progress', etape: 'diagnostic', pct: 65, level: 'ACTION', message: 'Analyse diagnostique des pathologies...' },
      { type: 'progress', etape: 'diagnostic', pct: 75, level: 'OK', message: 'Diagnostic établi' },
      { type: 'progress', etape: 'rag', pct: 85, level: 'ACTION', message: 'Recherche bibliographique PubMed...' },
      { type: 'ready', etape: 'rag', pct: 100, level: 'OK', message: 'Analyse préliminaire prête', diagnostic: { cadence: 148, pelvic_drop: 4.5 } },
      { type: 'progress', etape: 'rapport', pct: 92, level: 'INFO', message: 'Génération du protocole correctif...' },
      { type: 'progress', etape: 'rapport', pct: 98, level: 'INFO', message: 'Export du rapport final...' },
      { type: 'completed', etape: 'rapport', pct: 100, level: 'OK', message: 'Analyse terminée avec succès.', key_frames: [
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      ]}
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
    metriquesAnormales,
    keyFrames,
    error,
    lastEvent,
    reset,
    connect,
    disconnect,
    connectMock
  }
})
