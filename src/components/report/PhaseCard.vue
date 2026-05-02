<script setup>
import ExerciceItem from './ExerciceItem.vue'

defineProps({
  numero: {
    type: Number,
    required: true
  },
  titre: {
    type: String,
    required: true
  },
  semaines: {
    type: String,
    required: true
  },
  exercices: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm bg-surface-container">
    <div class="bg-[#1e3a5f] px-6 py-4 flex justify-between items-center">
      <h3 class="font-bold text-white text-base">Phase {{ numero }} — {{ titre }}</h3>
      <span class="text-surface-variant text-xs font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-lg">Semaines {{ semaines }}</span>
    </div>
    
    <div class="p-6">
      <div v-if="exercices.length > 0" class="flex flex-col gap-2">
        <ExerciceItem 
          v-for="(ex, index) in exercices" 
          :key="index"
          :nom="ex.nom"
          :description="ex.description"
        />
      </div>
      <div v-else class="text-center py-4 text-surface-variant/40 italic text-sm">
        Exercices en cours de définition pour cette phase.
      </div>
    </div>
  </div>
</template>
