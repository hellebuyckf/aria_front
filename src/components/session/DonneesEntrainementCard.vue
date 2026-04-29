<script setup>
import { ref } from 'vue'

const props = defineProps({
  stravaConnecte: {
    type: Boolean,
    required: true
  },
  garminConnecte: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['connecter-strava', 'connecter-garmin'])

const stravaLoading = ref(false)
const garminLoading = ref(false)

const handleConnect = (type) => {
  if (type === 'strava') stravaLoading.value = true
  if (type === 'garmin') garminLoading.value = true

  // Simulated delay for MVP
  setTimeout(() => {
    emit(`connecter-${type}`)
    stravaLoading.value = false
    garminLoading.value = false
  }, 800)
}
</script>

<template>
  <div class="p-6 rounded-2xl bg-white border border-outline-variant/50 shadow-sm flex flex-col h-full">
    <div class="mb-6">
      <h2 class="text-xs font-bold uppercase tracking-widest text-on-surface">Données d'Entraînement</h2>
    </div>

    <div class="flex-1 flex flex-col gap-4 justify-center">
      <!-- Strava -->
      <div class="flex items-center justify-between p-4 rounded-xl border border-outline-variant/20 bg-surface-container-low/30">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-orange-50/50 flex items-center justify-center p-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Strava_Logo.svg" alt="Strava" class="w-full h-full object-contain opacity-50 grayscale" />
          </div>
          <span class="text-sm font-medium text-on-surface">Strava</span>
        </div>
        
        <div v-if="stravaConnecte" class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 font-bold text-[10px] uppercase tracking-wider border border-green-200">
          <span class="material-symbols-outlined text-sm">check_circle</span>
          Connecté
        </div>
        <button 
          v-else
          @click="handleConnect('strava')"
          :disabled="stravaLoading"
          class="px-6 py-2 rounded-lg text-xs font-bold border border-outline-variant/50 bg-white text-on-surface hover:bg-surface-container-low transition-all disabled:opacity-50"
        >
          {{ stravaLoading ? 'Connexion...' : 'Connecter Strava' }}
        </button>
      </div>

      <!-- Garmin -->
      <div class="flex items-center justify-between p-4 rounded-xl border border-outline-variant/20 bg-surface-container-low/30">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-white text-lg font-bold shadow-sm">G</div>
          <span class="text-sm font-medium text-on-surface">Garmin</span>
        </div>

        <div v-if="garminConnecte" class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 font-bold text-[10px] uppercase tracking-wider border border-green-200">
          <span class="material-symbols-outlined text-sm">check_circle</span>
          Connecté
        </div>
        <button 
          v-else
          @click="handleConnect('garmin')"
          :disabled="garminLoading"
          class="px-6 py-2 rounded-lg text-xs font-bold bg-[#4FC3F7] text-white hover:bg-[#29B6F6] transition-all shadow-sm disabled:opacity-50"
        >
          {{ garminLoading ? 'Connexion...' : 'Connecter Garmin' }}
        </button>
      </div>
    </div>
  </div>
</template>
