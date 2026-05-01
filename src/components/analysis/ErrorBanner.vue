<script setup>
defineProps({
  message: {
    type: String,
    required: true
  },
  etape: {
    type: String,
    default: ''
  }
})

defineEmits(['retry', 'cancel'])
</script>

<template>
  <div class="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
    <div class="bg-red-900/90 backdrop-blur-md border border-red-500/50 rounded-2xl p-6 shadow-2xl flex items-start gap-5">
      <div class="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-white text-3xl">close</span>
      </div>
      
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-bold uppercase tracking-widest text-red-300">Erreur de pipeline</span>
          <span v-if="etape" class="text-[10px] bg-red-800 text-red-200 px-2 py-0.5 rounded-full uppercase">{{ etape }}</span>
        </div>
        <p class="text-sm font-medium text-white mb-4 leading-relaxed">{{ message }}</p>
        
        <div class="flex items-center gap-3">
          <button 
            @click="$emit('retry')"
            class="px-5 py-2 rounded-xl bg-white text-red-900 text-xs font-bold uppercase tracking-wider hover:bg-red-50 transition-colors"
          >
            Réessayer
          </button>
          <button 
            @click="$emit('cancel')"
            class="px-5 py-2 rounded-xl bg-red-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors border border-red-700"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
