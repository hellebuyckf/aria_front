<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'
import { useSessionStore } from '../stores/session'
import AppSideNav from '../components/layout/AppSideNav.vue'
import AppTopBar from '../components/layout/AppTopBar.vue'

const route = useRoute()
const router = useRouter()
const sessionStore = useSessionStore()

const sessionId = route.params.sessionId
const report = ref(null)
const loading = ref(true)
const error = ref(null)
const inProgress = ref(false)
const pollingTimer = ref(null)
const attempts = ref(0)
const MAX_ATTEMPTS = 30 // 30 * 2s = 60s

const clearPolling = () => {
  if (pollingTimer.value) {
    clearTimeout(pollingTimer.value)
    pollingTimer.value = null
  }
}

const fetchReport = async () => {
  error.value = null
  
  try {
    const response = await api.post(`/api/sessions/${sessionId}/generate`)
    
    // Status 200: Report is ready
    report.value = response.data.report
    loading.value = false
    inProgress.value = false
    clearPolling()

    // Sync session store info from report to ensure sidebar badge is populated
    if (report.value && !sessionStore.patientId) {
      sessionStore.initialiser({
        id: report.value.patient_id,
        profil: {} // profil is optional in initialiser
      })
      sessionStore.pathologie.type = report.value.pathologie
    }
  } catch (err) {
    if (err.response && err.response.status === 409) {
      // Status 409: Pipeline still running
      inProgress.value = true
      loading.value = false
      
      if (attempts.value < MAX_ATTEMPTS) {
        attempts.value++
        pollingTimer.value = setTimeout(fetchReport, 2000)
      } else {
        inProgress.value = false
        error.value = "Le délai de génération a été dépassé (60s). Veuillez réessayer plus tard."
      }
    } else {
      loading.value = false
      inProgress.value = false
      error.value = err.response?.data?.message || err.message || "Une erreur est survenue lors de la récupération du rapport."
      clearPolling()
    }
  }
}

const confidenceBadgeClass = computed(() => {
  if (!report.value) return ''
  const level = report.value.confiance?.toLowerCase()
  if (level === 'élevée') return 'bg-red-100 text-red-700 border-red-200'
  if (level === 'modérée') return 'bg-orange-100 text-orange-700 border-orange-200'
  return 'bg-green-100 text-green-700 border-green-200'
})

const handleDownload = () => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  window.open(`${baseUrl}/api/sessions/${sessionId}/report`, '_blank')
}

const handleBack = () => {
  router.push('/patients')
}

onMounted(() => {
  if (sessionId) {
    fetchReport()
  }
})

onUnmounted(() => {
  clearPolling()
})
</script>

<template>
  <div class="flex h-screen bg-surface overflow-hidden">
    <AppSideNav :active-step="3" :is-done="!!report" :badge-patient="sessionStore.badgeSidebar" />

    <div class="flex-1 flex flex-col min-w-0">
      <AppTopBar />

      <main class="flex-1 overflow-y-auto p-8 bg-slate-50/30">
        <div class="max-w-4xl mx-auto">
          
          <!-- Initial Loading State -->
          <div v-if="loading" class="flex flex-col items-center justify-center py-20">
            <div class="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
            <p class="text-sm font-medium text-on-surface-variant italic">Initialisation du rapport...</p>
          </div>

          <!-- Polling / In Progress State (409) -->
          <div v-else-if="inProgress" class="text-center py-20 bg-white rounded-3xl border border-outline-variant shadow-sm p-10">
            <div class="flex justify-center mb-6">
              <div class="relative w-16 h-16">
                <div class="absolute inset-0 border-4 border-primary/10 rounded-full"></div>
                <div class="absolute inset-0 border-4 border-t-primary rounded-full animate-spin"></div>
                <span class="material-symbols-outlined absolute inset-0 flex items-center justify-center text-primary text-2xl">auto_awesome</span>
              </div>
            </div>
            <h2 class="text-xl font-bold text-on-surface mb-2 tracking-tight uppercase">Génération en cours...</h2>
            <p class="text-on-surface-variant mb-4 max-w-sm mx-auto">Le système ARIA finalise les calculs biomécaniques et la rédaction du protocole.</p>
            <div class="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Tentative {{ attempts }} / {{ MAX_ATTEMPTS }}</div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-20 bg-white rounded-3xl border border-red-100 shadow-sm p-10">
            <span class="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
            <h2 class="text-xl font-bold text-on-surface mb-2">Erreur de rapport</h2>
            <p class="text-red-600/70 mb-8">{{ error }}</p>
            <div class="flex justify-center gap-4">
              <button @click="fetchReport" class="px-6 py-2 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary-dark transition-all">
                Réessayer
              </button>
              <button @click="handleBack" class="px-6 py-2 border border-outline-variant rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-surface-container transition-all">
                Retour
              </button>
            </div>
          </div>

          <!-- Report Content -->
          <div v-else-if="report" class="space-y-8 animate-fade-in">
            
            <!-- Header Section -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-outline-variant shadow-sm">
              <div>
                <p class="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Rapport Biomécanique</p>
                <h1 class="text-3xl font-extrabold text-[#0D2B6B] tracking-tight">{{ report.pathologie }}</h1>
              </div>
              <div :class="['px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider', confidenceBadgeClass]">
                Confiance {{ report.confiance }}
              </div>
            </div>

            <!-- Main Content -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <!-- Left Column: Justification & Metrics -->
              <div class="lg:col-span-2 space-y-8">
                
                <!-- Justification -->
                <section class="bg-white p-8 rounded-3xl border border-outline-variant shadow-sm">
                  <h2 class="text-sm font-bold text-on-surface uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">psychology</span>
                    Justification du diagnostic
                  </h2>
                  <p class="text-sm leading-relaxed text-on-surface-variant">{{ report.justification_diagnostic }}</p>
                </section>

                <!-- Abnormal Metrics -->
                <section v-if="report.metriques_anormales?.length" class="bg-white p-8 rounded-3xl border border-outline-variant shadow-sm">
                  <h2 class="text-sm font-bold text-on-surface uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span class="material-symbols-outlined text-red-500">warning</span>
                    Métriques anormales
                  </h2>
                  <ul class="space-y-3">
                    <li v-for="(metric, idx) in report.metriques_anormales" :key="idx" class="flex items-center gap-3 p-3 bg-red-50/50 rounded-xl border border-red-100 text-sm font-medium text-red-800">
                      <span class="material-symbols-outlined text-red-500 scale-75">report_problem</span>
                      {{ metric }}
                    </li>
                  </ul>
                </section>
              </div>

              <!-- Right Column: Recommendations & Actions -->
              <div class="space-y-8">
                
                <!-- Recommendations -->
                <section class="bg-[#0D2B6B] p-8 rounded-3xl shadow-lg text-white">
                  <h2 class="text-xs font-bold uppercase tracking-widest mb-6 opacity-60 flex items-center gap-2">
                    <span class="material-symbols-outlined text-cyan-400">rebase_edit</span>
                    Recommandations
                  </h2>
                  <ol class="space-y-6">
                    <li v-for="(rec, idx) in report.recommandations" :key="idx" class="flex gap-4">
                      <span class="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">{{ idx + 1 }}</span>
                      <p class="text-sm leading-snug">{{ rec }}</p>
                    </li>
                  </ol>
                </section>

                <!-- Actions -->
                <div class="flex flex-col gap-3">
                  <button @click="handleDownload" class="w-full flex items-center justify-center gap-3 py-4 bg-white border border-outline-variant rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-all shadow-sm">
                    <span class="material-symbols-outlined text-primary">picture_as_pdf</span>
                    Télécharger le PDF
                  </button>
                  <button @click="handleBack" class="w-full py-4 bg-slate-200/50 text-on-surface-variant rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-slate-200 transition-all">
                    Nouvelle session
                  </button>
                </div>
              </div>
            </div>

            <!-- PubMed References -->
            <section v-if="report.references_pubmed?.length" class="bg-white/50 p-8 rounded-3xl border border-outline-variant/50">
              <h2 class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Références PubMed</h2>
              <ul class="space-y-2">
                <li v-for="(ref, idx) in report.references_pubmed" :key="idx" class="text-[11px] text-slate-500 flex gap-2 leading-relaxed">
                  <span class="opacity-50 font-bold">[{{ idx + 1 }}]</span>
                  {{ ref }}
                </li>
              </ul>
            </section>

            <!-- Warning / Disclaimer -->
            <div class="bg-slate-100 p-6 rounded-2xl text-center border border-slate-200/50">
              <p class="text-[10px] leading-relaxed text-slate-400 italic">
                {{ report.avertissement }}
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
