<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWebSocketStore } from '../stores/websocket'
import { useSessionStore } from '../stores/session'

// Components
import AppSideNav from '../components/layout/AppSideNav.vue'
import AppTopBar from '../components/layout/AppTopBar.vue'
import AnalysisProgressBar from '../components/analysis/AnalysisProgressBar.vue'
import PipelineStepList from '../components/analysis/PipelineStepList.vue'
import RealTimeLog from '../components/analysis/RealTimeLog.vue'
import MetricsPreviewGrid from '../components/analysis/MetricsPreviewGrid.vue'
import WsAlertBanner from '../components/analysis/WsAlertBanner.vue'
import ErrorBanner from '../components/analysis/ErrorBanner.vue'

const router = useRouter()
const route = useRoute()
const wsStore = useWebSocketStore()
const sessionStore = useSessionStore()

const sessionId = route.params.sessionId
const showReportButton = ref(false)

const steps = ref([
  { id: 'ingestion', label: 'Ingestion des données', status: 'idle', startTime: null, elapsedMs: null },
  { id: 'extraction', label: 'Extraction cinématique', status: 'idle', startTime: null, elapsedMs: null },
  { id: 'calcul', label: 'Calcul des vecteurs force', status: 'idle', startTime: null, elapsedMs: null },
  { id: 'medical', label: 'RAG médical & contexte clinique', status: 'idle', startTime: null, elapsedMs: null },
  { id: 'web', label: 'Web grounding scientifique', status: 'idle', startTime: null, elapsedMs: null },
  { id: 'generation', label: 'Génération protocole correctif', status: 'idle', startTime: null, elapsedMs: null },
  { id: 'export', label: 'Export rapport final PDF/Web', status: 'idle', startTime: null, elapsedMs: null }
])

const handlePipelineMapping = (event) => {
  if (event.type === 'error') {
    const activeStep = steps.value.find(s => s.status === 'running')
    if (activeStep) activeStep.status = 'error'
    return
  }

  if (event.type === 'completed') {
    steps.value.forEach(s => {
      if (s.status === 'running') {
        s.status = 'done'
        s.elapsedMs = Date.now() - s.startTime
      }
      if (s.status === 'idle') s.status = 'done'
    })
    showReportButton.value = true
    setTimeout(() => goToReport(), 2000)
    return
  }

  const stepIndex = steps.value.findIndex(s => s.id === event.substep)
  if (stepIndex === -1) return

  const targetStep = steps.value[stepIndex]

  // If this step is already done or running, ignore (unless status update)
  if (targetStep.status === 'done') return

  if (targetStep.status === 'idle') {
    // Mark previous steps as done
    for (let i = 0; i < stepIndex; i++) {
      if (steps.value[i].status !== 'done') {
        steps.value[i].status = 'done'
        if (steps.value[i].startTime) {
          steps.value[i].elapsedMs = Date.now() - steps.value[i].startTime
        }
      }
    }
    // Start current step
    targetStep.status = 'running'
    targetStep.startTime = Date.now()
  }
}

watch(() => wsStore.lastEvent, (newEvent) => {
  if (newEvent) handlePipelineMapping(newEvent)
})

onMounted(() => {
  if (import.meta.env.VITE_MOCK_WS === 'true' || sessionId === 'SES-mock') {
    wsStore.connectMock()
  } else {
    wsStore.connect(sessionId)
  }
})

onUnmounted(() => {
  wsStore.disconnect()
})

const goToReport = () => {
  router.push(`/session/${sessionId}/report`)
}

const onRetry = () => {
  wsStore.reset()
  window.location.reload()
}

const onCancel = () => {
  wsStore.disconnect()
  sessionStore.reset()
  router.push('/patients')
}

const subtitle = computed(() => {
  const p = sessionStore.profil
  const c = sessionStore.chaussure
  return `${sessionStore.patientId || 'PAT-UNKNOWN'} - ${sessionStore.pathologie.type || 'Sujet sain'} - ${c.marque} ${c.modele} (drop ${c.drop}mm)`
})
</script>

<template>
  <div class="min-h-screen bg-surface flex">
    <AppSideNav :active-step="2" />

    <div class="flex-1 flex flex-col">
      <AppTopBar />

      <main class="flex-1 p-8 overflow-y-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-on-surface uppercase tracking-tight">Analyse Biomécanique en Cours</h1>
          <p class="text-on-surface-variant font-medium">{{ subtitle }}</p>
        </div>

        <div class="grid grid-cols-12 gap-6 items-start">
          <!-- Left Column -->
          <div class="col-span-5 flex flex-col gap-6">
            <AnalysisProgressBar 
              :pct="wsStore.pct" 
              :status="wsStore.error ? 'error' : (wsStore.pct === 100 ? 'done' : 'running')" 
            />
            <PipelineStepList :steps="steps" />
          </div>

          <!-- Right Column -->
          <div class="col-span-7 flex flex-col gap-6">
            <RealTimeLog :entries="wsStore.logEntries" />
            <MetricsPreviewGrid :metrics="wsStore.metrics" />
          </div>
        </div>

        <!-- Completion Action -->
        <div v-if="showReportButton" class="fixed bottom-8 right-8 animate-bounce">
          <button 
            @click="goToReport"
            class="flex items-center gap-2 px-6 py-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white shadow-2xl transition-all font-bold uppercase tracking-widest text-sm"
          >
            Voir le rapport
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>

    <!-- Modals & Overlays -->
    <WsAlertBanner :status="wsStore.wsStatus" />
    
    <Transition name="fade">
      <ErrorBanner 
        v-if="wsStore.error" 
        :message="wsStore.error.message" 
        :etape="wsStore.error.etape" 
        @retry="onRetry"
        @cancel="onCancel"
      />
    </Transition>
  </div>
</template>

<style scoped>
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-10px);}
  60% {transform: translateY(-5px);}
}
</style>
