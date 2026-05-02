<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useReportStore } from '../stores/report'
import { useSessionStore } from '../stores/session'

// Layout
import AppSideNav from '../components/layout/AppSideNav.vue'
import AppTopBar from '../components/layout/AppTopBar.vue'

// Report Sections
import ReportHeader from '../components/report/ReportHeader.vue'
import MetricsTable from '../components/report/MetricsTable.vue'
import AnomaliesList from '../components/report/AnomaliesList.vue'
import AlerteEquipement from '../components/report/AlerteEquipement.vue'
import ProtocoleSection from '../components/report/ProtocoleSection.vue'
import SourcesList from '../components/report/SourcesList.vue'
import ReportFooter from '../components/report/ReportFooter.vue'

const route = useRoute()
const router = useRouter()
const reportStore = useReportStore()
const sessionStore = useSessionStore()

const sessionId = route.params.sessionId

onMounted(() => {
  if (sessionId) {
    reportStore.fetchReport(sessionId)
  }
})

// Sync session store info from report to ensure sidebar badge is populated
watch(() => reportStore.report, (newReport) => {
  if (newReport && !sessionStore.patientId) {
    sessionStore.initialiser({
      id: newReport.patient_id,
      profil: newReport.profil
    })
    sessionStore.pathologie.type = newReport.pathologie
  }
})

onUnmounted(() => {
  reportStore.reset()
})

const handleDownload = () => {
  if (reportStore.report) {
    reportStore.downloadPdf(
      sessionId, 
      reportStore.report.patient_id, 
      reportStore.report.date
    )
  }
}

const handleNewSession = () => {
  router.push('/patients')
}
</script>

<template>
  <div class="min-h-screen bg-surface flex">
    <!-- Side Navigation (Step 3: Rapport) -->
    <AppSideNav :active-step="3" :badge-patient="sessionStore.badgeSidebar" class="app-sidebar" />

    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top Bar -->
      <AppTopBar class="app-topbar" />

      <main class="flex-1 overflow-y-auto p-8 lg:p-12 scroll-smooth">
        <!-- Skeleton Loading -->
        <div v-if="reportStore.loading" class="max-w-5xl mx-auto space-y-10">
          <div class="h-10 w-64 bg-surface-container rounded-lg animate-pulse"></div>
          <div class="h-32 w-full bg-surface-container rounded-2xl animate-pulse"></div>
          <div class="h-96 w-full bg-surface-container rounded-2xl animate-pulse"></div>
          <div class="h-64 w-full bg-surface-container rounded-2xl animate-pulse"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="reportStore.error" class="max-w-5xl mx-auto text-center py-20">
          <div class="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <span class="material-symbols-outlined text-red-500 text-4xl">error</span>
          </div>
          <h2 class="text-xl font-bold text-white mb-2">Rapport non disponible</h2>
          <p class="text-surface-variant max-w-md mx-auto mb-8">
            L'analyse est peut-être encore en cours ou une erreur est survenue lors de la récupération des données.
          </p>
          <button 
            @click="reportStore.fetchReport(sessionId)"
            class="px-6 py-2 rounded-xl bg-white text-surface font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-colors"
          >
            Réessayer
          </button>
        </div>

        <!-- Report Content -->
        <div v-else-if="reportStore.report" class="max-w-5xl mx-auto report-container">
          <!-- Page Header -->
          <div class="flex justify-between items-end mb-10 border-b border-outline-variant/20 pb-8">
            <div>
              <h1 class="text-3xl font-bold text-white uppercase tracking-tight">Rapport ARIA</h1>
              <p class="text-primary font-bold mt-1 tracking-widest uppercase text-xs">Examen Clinique Biomécanique</p>
            </div>
            
            <div class="flex gap-3 report-actions">
              <button 
                @click="handleDownload"
                class="flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-surface-container-high transition-all"
              >
                <span class="material-symbols-outlined text-lg">download</span>
                Télécharger PDF
              </button>
              <button 
                @click="handleNewSession"
                class="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold uppercase tracking-widest text-[10px] hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
              >
                <span class="material-symbols-outlined text-lg">add</span>
                Nouvelle session
              </button>
            </div>
          </div>

          <!-- Component Assembly -->
          <div class="space-y-4">
            <ReportHeader :report="reportStore.report" />
            <MetricsTable :metriques="reportStore.report.metriques" />
            <AnomaliesList :anomalies="reportStore.report.anomalies" />
            <AlerteEquipement :alerte="reportStore.report.alerte_equipement" />
            <ProtocoleSection :protocole="reportStore.report.protocole" />
            <SourcesList :sources="reportStore.report.sources" />
            <ReportFooter :meta="reportStore.report.meta" />
          </div>

          <!-- Bottom Actions (Mobile/Print safety) -->
          <div class="mt-16 flex justify-center gap-4 report-actions pb-10">
             <button 
                @click="window.print()"
                class="flex items-center gap-2 px-8 py-4 rounded-2xl bg-surface-container border border-outline-variant/30 text-white font-bold uppercase tracking-widest text-xs hover:bg-surface-container-high transition-all"
              >
                <span class="material-symbols-outlined">print</span>
                Imprimer le rapport
              </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
