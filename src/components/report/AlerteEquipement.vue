<script setup>
defineProps({
  alerte: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <div v-if="alerte" class="mt-10">
    <h2 class="text-lg font-bold text-orange-400 mb-5 px-1 uppercase tracking-tight flex items-center gap-2">
      <span class="material-symbols-outlined text-xl">warning</span>
      Alerte équipement
    </h2>
    
    <div class="border border-orange-500 bg-orange-900/10 rounded-2xl p-6 shadow-sm flex items-start gap-4">
      <div class="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-orange-400">inventory_2</span>
      </div>
      <div>
        <h3 class="font-bold text-orange-400 mb-2">{{ alerte.titre }}</h3>
        <p class="text-sm text-surface-variant/90 leading-relaxed">{{ alerte.corps }}</p>
      </div>
    </div>
  </div>
</template>
