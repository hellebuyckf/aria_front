<script setup>
defineProps({
  status: {
    type: String,
    required: true
  }
})

const reload = () => {
  window.location.reload()
}
</script>

<template>
  <Transition name="fade">
    <div v-if="status !== 'idle'" class="fixed bottom-4 right-4 z-50">
      <!-- Reconnecting -->
      <div v-if="status === 'reconnecting'" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-500 text-white shadow-lg border border-orange-400">
        <span class="material-symbols-outlined animate-spin text-xl">sync</span>
        <span class="text-sm font-medium">Connexion perdue — tentative de reconnexion...</span>
      </div>

      <!-- Failed -->
      <div v-if="status === 'failed'" class="flex items-center gap-4 px-4 py-3 rounded-xl bg-red-600 text-white shadow-lg border border-red-500">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-xl">error</span>
          <span class="text-sm font-medium">Connexion impossible</span>
        </div>
        <button 
          @click="reload"
          class="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-bold uppercase tracking-wider transition-colors border border-white/20"
        >
          Actualiser
        </button>
      </div>
    </div>
  </Transition>
</template>
