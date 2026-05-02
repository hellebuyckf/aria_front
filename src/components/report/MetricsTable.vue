<script setup>
import MetricRow from './MetricRow.vue'

defineProps({
  metriques: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="mt-10">
    <h2 class="text-lg font-bold text-cyan-400 mb-5 px-1 uppercase tracking-tight flex items-center gap-2">
      <span class="material-symbols-outlined text-xl">monitoring</span>
      Métriques biomécaniques
    </h2>
    
    <div class="bg-surface-container rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-surface-container-high/50 border-b border-outline-variant/20 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70">
            <th class="py-3 px-6 w-2/5">Métrique</th>
            <th class="py-3 w-1/5">Norme</th>
            <th class="py-3 w-1/5">Patient</th>
            <th class="py-3 px-6 text-center w-1/5">Statut</th>
          </tr>
        </thead>
        <tbody>
          <MetricRow 
            v-for="m in metriques" 
            :key="m.id"
            :label="m.label"
            :norme="m.norme"
            :valeur="m.valeur"
            :statut="m.statut"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>
