<script setup>
import AnomalieCard from './AnomalieCard.vue'

defineProps({
  anomalies: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="mt-10">
    <h2 class="text-lg font-bold text-cyan-400 mb-5 px-1 uppercase tracking-tight flex items-center gap-2">
      <span class="material-symbols-outlined text-xl">biotech</span>
      Anomalies identifiées et corrélations cliniques
    </h2>
    
    <div class="flex flex-col">
      <AnomalieCard 
        v-for="(a, index) in anomalies" 
        :key="index"
        :titre="a.titre"
        :corps="a.corps"
        :refs="a.refs"
      />
      <div v-if="anomalies.length === 0" class="p-8 text-center bg-surface-container/50 rounded-2xl border border-dashed border-outline-variant/30">
        <span class="text-sm text-surface-variant italic">Aucune anomalie majeure détectée.</span>
      </div>
    </div>
  </div>
</template>
