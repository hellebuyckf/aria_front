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

const onLancerAnalyse = async () => {
  try {
    const sessionId = await sessionStore.lancerAnalyse()
    if (sessionId) {
      router.push(`/session/${sessionId}/analysis`)
    }
  } catch (e) {
    // Error state is handled by the store (statut.value = 'erreur')
    console.error('Analyse start failed', e)
  }
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
      :active-step="1"
    />

    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top Bar -->
      <AppTopBar />

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto p-8 bg-[#F8FAFC]">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-col gap-8">
            <!-- Main Grid -->
            <div class="grid grid-cols-12 gap-8 items-start">
              <!-- Left Column: Patient Profile & Pathology -->
              <div class="col-span-6 flex flex-col gap-8">
                <ProfilPatientCard
                  :patient-id="sessionStore.patientId || ''"
                  v-model="sessionStore.profil"
                />
                <PathologieCard v-model="sessionStore.pathologie" />
              </div>

              <!-- Right Column: Shoe Profile, Videos & Actions -->
              <div class="col-span-6 flex flex-col gap-4">
                <ProfilChaussureCard
                  v-model="sessionStore.chaussure"
                  :gender="sessionStore.profil.sexe"
                />
                <VideoDepotCard
                  v-model:sagittale="sessionStore.videos.sagittale"
                  v-model:posterieure="sessionStore.videos.posterieure"
                />
                <div class="flex items-center justify-end gap-3">
                  <button
                    @click="onAnnuler"
                    class="px-6 py-2.5 rounded-lg text-sm font-medium border border-outline-variant bg-white text-on-surface hover:bg-surface-container-low transition-all"
                  >
                    Annuler
                  </button>
                  <button
                    @click="onLancerAnalyse"
                    :disabled="!sessionStore.formulaireValide"
                    class="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0D2B6B] text-white shadow-md hover:bg-[#091F4D] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <span class="material-symbols-outlined text-lg">play_arrow</span>
                    <span class="text-sm font-bold">Lancer l'analyse ARIA</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
