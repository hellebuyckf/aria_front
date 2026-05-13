<script setup>
import { onMounted, ref } from 'vue'
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

const launching = ref(false)
const launchError = ref('')

const onLancerAnalyse = async () => {
  launching.value = true
  launchError.value = ''
  try {
    const sessionId = await sessionStore.lancerAnalyse()
    if (sessionId) {
      router.push(`/session/${sessionId}/analysis`)
    } else {
      launchError.value = 'Réponse inattendue du serveur (pas de session_id)'
    }
  } catch (e) {
    launchError.value = e?.response?.data?.detail ?? e?.message ?? 'Erreur réseau'
    console.error('Analyse start failed', e)
  } finally {
    launching.value = false
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
                <div class="flex flex-col items-end gap-2">
                  <div class="flex items-center gap-3">
                    <button
                      @click="onAnnuler"
                      :disabled="launching"
                      class="px-6 py-2.5 rounded-lg text-sm font-medium border border-outline-variant bg-white text-on-surface hover:bg-surface-container-low disabled:opacity-50 transition-all"
                    >
                      Annuler
                    </button>
                    <button
                      @click="onLancerAnalyse"
                      :disabled="!sessionStore.formulaireValide || launching"
                      class="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0D2B6B] text-white shadow-md hover:bg-[#091F4D] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <span v-if="launching" class="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                      <span v-else class="material-symbols-outlined text-lg">play_arrow</span>
                      <span class="text-sm font-bold">{{ launching ? 'Envoi en cours…' : 'Lancer l\'analyse ARIA' }}</span>
                    </button>
                  </div>
                  <p v-if="launchError" class="text-xs text-red-500 font-medium">{{ launchError }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
