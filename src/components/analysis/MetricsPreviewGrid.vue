<script setup>
import { computed } from 'vue'
import MetricCell from './MetricCell.vue'

const props = defineProps({
  metrics: {
    type: Object,
    default: null
  }
})

const getStatus = (key, value) => {
  if (value === null) return null
  
  switch (key) {
    case 'cadence':
      if (value < 165) return 'red'
      if (value < 175) return 'orange'
      return 'green'
    case 'oscillation_verticale':
      if (value > 12) return 'red'
      if (value > 10) return 'orange'
      return 'green'
    case 'angle_tibial':
      if (value > 15) return 'red'
      if (value > 12) return 'orange'
      return 'green'
    case 'flexion_genou':
      if (value < 15) return 'red'
      if (value < 20) return 'orange'
      return 'green'
    case 'penchee_tronc':
      if (value > 15) return 'red'
      if (value > 10) return 'orange'
      return 'green'
    case 'attaque_pied':
      if (value === 'talon_prononce') return 'red'
      if (value === 'avant_pied') return 'orange'
      return 'green'
    default:
      return null
  }
}

const formatValue = (key, value) => {
  if (value === null) return null
  if (key === 'attaque_pied') {
    const labels = {
      'talon_prononce': 'Talon prononcé',
      'midfoot': 'Midfoot',
      'avant_pied': 'Avant-pied'
    }
    return labels[value] || value
  }
  return value
}

const displayMetrics = computed(() => [
  { key: 'cadence', label: 'Cadence', unit: 'spm' },
  { key: 'oscillation_verticale', label: 'Oscillation vert.', unit: 'cm' },
  { key: 'angle_tibial', label: 'Angle tibial', unit: '°' },
  { key: 'flexion_genou', label: 'Flexion genou', unit: '°' },
  { key: 'penchee_tronc', label: 'Penchée tronc', unit: '°' },
  { key: 'attaque_pied', label: 'Attaque du pied', unit: '' },
  { key: 'longueur_foulee', label: 'Long. foulée', unit: '' },
  { key: 'stabilite_cheville', label: 'Stabilité cheville', unit: '' }
])
</script>

<template>
  <div class="p-6 rounded-2xl bg-white border border-outline-variant/50 shadow-sm flex flex-col h-full">
    <div class="mb-6 flex items-baseline justify-between px-1">
      <h2 class="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Métriques Extraites (Aperçu)</h2>
      <span class="text-[10px] font-medium text-accent italic flex items-center gap-1">
        <span class="w-1 h-1 rounded-full bg-accent animate-pulse"></span>
        Mise à jour en direct
      </span>
    </div>

    <div class="grid grid-cols-2 gap-3 flex-1">
      <MetricCell 
        v-for="m in displayMetrics" 
        :key="m.key"
        :label="m.label"
        :unit="m.unit"
        :value="formatValue(m.key, metrics?.[m.key])"
        :indicator="getStatus(m.key, metrics?.[m.key])"
      />
    </div>
  </div>
</template>
