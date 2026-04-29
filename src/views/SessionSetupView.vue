<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePatientsStore } from '../stores/patients'
import { useSessionStore } from '../stores/session'

import AppSideNav from '../components/layout/AppSideNav.vue'
import AppTopBar from '../components/layout/AppTopBar.vue'
import ProfilPatientCard from '../components/session/ProfilPatientCard.vue'
import PathologieCard from '../components/session/PathologieCard.vue'
import VideoDepotCard from '../components/session/VideoDepotCard.vue'
import ProfilChaussureCard from '../components/session/ProfilChaussureCard.vue'
import DonneesEntrainementCard from '../components/session/DonneesEntrainementCard.vue'

const router = useRouter()
const patientsStore = usePatientsStore()
const sessionStore = useSessionStore()

onMounted(() => {
  if (!patientsStore.activePatient) {
    router.push('/patients')
    return
  }
  sessionStore.initialiser(patientsStore.activePatient)
})

const onLancerAnalyse = () => {
  sessionStore.lancerAnalyse()
  router.push(`/session/${sessionStore.sessionId}/analysis`)
}

const onAnnuler = () => {
  sessionStore.reset()
  router.push('/patients')
}
</script>

<template>
  <div class="flex h-screen bg-surface overflow-hidden">
    <!-- Side Navigation -->
    <AppSideNav 
      :badge-patient="sessionStore.badgeSidebar"
      :nouvelle-session-actif="true"
    />

    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top Bar -->
      <AppTopBar />

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto p-8 bg-[#F8FAFC]">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-col gap-8">
            <!-- Grid Layout -->
            <div class="grid grid-cols-12 gap-8 items-start">
              <!-- Left Column: Patient Profile & Shoe -->
              <div class="col-span-7 flex flex-col gap-8">
                <ProfilPatientCard 
                  :patient-id="sessionStore.patientId || ''"
                  v-model="sessionStore.profil"
                />
                <ProfilChaussureCard v-model="sessionStore.chaussure" />
              </div>

              <!-- Right Column: Pathology, Videos & Training -->
              <div class="col-span-5 flex flex-col gap-8">
                <PathologieCard v-model="sessionStore.pathologie" />
                <VideoDepotCard 
                  v-model:sagittale="sessionStore.videos.sagittale"
                  v-model:posterieure="sessionStore.videos.posterieure"
                />
                <DonneesEntrainementCard 
                  :strava-connecte="sessionStore.entrainement.stravaConnecte"
                  :garmin-connecte="sessionStore.entrainement.garminConnecte"
                  @connecter-strava="sessionStore.connecterStrava"
                  @connecter-garmin="sessionStore.connecterGarmin"
                />
              </div>
            </div>

            <!-- Bottom Action Bar -->
            <div class="flex items-center justify-end gap-4 mt-4">
              <button 
                @click="onAnnuler"
                class="px-10 py-3 rounded-lg text-sm font-medium border border-outline-variant bg-white text-on-surface hover:bg-surface-container-low transition-all"
              >
                Annuler
              </button>
              
              <button 
                @click="onLancerAnalyse"
                :disabled="!sessionStore.formulaireValide"
                class="flex items-center gap-3 px-10 py-3 rounded-lg bg-[#0D2B6B] text-white shadow-md hover:bg-[#091F4D] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <span class="material-symbols-outlined text-lg">play_arrow</span>
                <span class="text-sm font-bold">Lancer l'analyse ARIA</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
