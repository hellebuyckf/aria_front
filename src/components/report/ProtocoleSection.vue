<script setup>
import PhaseCard from './PhaseCard.vue'

defineProps({
  protocole: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="mt-10">
    <h2 class="text-lg font-bold text-cyan-400 mb-2 px-1 uppercase tracking-tight flex items-center gap-2">
      <span class="material-symbols-outlined text-xl">rebase_edit</span>
      Protocole de rééducation
    </h2>
    <p class="text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest mb-4 px-1">ARIA-ft (MedGemma 4B-it fine-tune)</p>
    
    <p class="italic text-sm text-surface-variant/80 mb-8 px-1 leading-relaxed border-l-2 border-outline-variant/30 pl-4 py-1">
      {{ protocole.intro }}
    </p>
    
    <div class="flex flex-col gap-6">
      <PhaseCard 
        v-for="phase in protocole.phases" 
        :key="phase.numero"
        :numero="phase.numero"
        :titre="phase.titre"
        :semaines="phase.semaines"
        :exercices="phase.exercices"
      />
    </div>
  </div>
</template>
