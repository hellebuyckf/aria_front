<script setup>
import { computed, ref, watch } from 'vue'
import MetricCell from './MetricCell.vue'

const props = defineProps({
  metrics: {
    type: Object,
    default: null
  },
  metriquesAnormales: {
    type: Array,
    default: () => []
  }
})

const revealedKeys = ref(new Set())

const METRICS_ORDER = [
  { key: 'cadence', label: 'Cadence', unit: 'foulées/min', group: 'sagittale' },
  { key: 'angle_attaque_pied', label: 'Attaque pied', unit: '°', group: 'sagittale' },
  { key: 'flexion_genou_impact', label: 'Flexion genou impact', unit: '°', group: 'sagittale' },
  { key: 'inclinaison_tronc', label: 'Inclinaison tronc', unit: '°', group: 'sagittale' },
  { key: 'oscillation_verticale', label: 'Oscillation verticale', unit: 'cm', group: 'sagittale' },
  { key: 'ratio_contact_suspension', label: 'Contact / suspension', unit: '', group: 'sagittale' },
  // Postérieures
  { key: 'pelvic_drop', label: 'Pelvic drop', unit: '°', group: 'posterieure' },
  { key: 'valgus_genou', label: 'Valgus genou', unit: '°', group: 'posterieure' },
  { key: 'asymetrie_charge', label: 'Asymétrie charge', unit: '%', group: 'posterieure' },
  { key: 'oscillation_laterale_hanche', label: 'Oscillation latérale', unit: 'cm', group: 'posterieure' },
  { key: 'pronation_pied', label: 'Pronation', unit: '°', group: 'posterieure' },
]

const startRevealSequence = () => {
  if (!props.metrics) return
  
  revealedKeys.value.clear()
  const visibles = METRICS_ORDER.filter(m => props.metrics[m.key] !== null)
  
  visibles.forEach((m, i) => {
    setTimeout(() => {
      revealedKeys.value.add(m.key)
    }, i * 120)
  })
}

watch(() => props.metrics, (newVal, oldVal) => {
  if (!newVal) return

  const isFirstTime = !oldVal
  const posteriorNowAvailable = newVal.vue_posterieure_disponible && (!oldVal || !oldVal.vue_posterieure_disponible)

  if (isFirstTime || posteriorNowAvailable) {
    // If it's the first time or we just unlocked posterior, run/continue the reveal sequence
    const visibles = METRICS_ORDER.filter(m => newVal[m.key] !== null)
    visibles.forEach((m, i) => {
      // If already revealed, don't delay
      if (revealedKeys.value.has(m.key)) return
      
      const delay = i * 120
      setTimeout(() => {
        revealedKeys.value.add(m.key)
      }, delay)
    })
  } else {
    // Just sync any existing keys that might have appeared (though replacement logic says they should all be there)
    METRICS_ORDER.forEach(m => {
      if (newVal[m.key] !== null) revealedKeys.value.add(m.key)
    })
  }
}, { immediate: true })

const showPosterior = computed(() => {
  if (!props.metrics) return false
  return props.metrics.vue_posterieure_disponible === true
})

const getStatus = (key, value) => {
  if (value === null) return null
  return props.metriquesAnormales.includes(key) ? 'red' : null
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
  return typeof value === 'number' ? value.toFixed(1).replace('.0', '') : value
}

const sagittalMetrics = computed(() => METRICS_ORDER.filter(m => m.group === 'sagittale'))
const posteriorMetrics = computed(() => METRICS_ORDER.filter(m => m.group === 'posterieure'))
</script>

<template>
  <div class="p-6 rounded-2xl bg-white border border-outline-variant/50 shadow-sm flex flex-col h-full overflow-y-auto custom-scrollbar">
    <div class="mb-6 flex items-baseline justify-between px-1">
      <h2 class="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Métriques Extraites (Aperçu)</h2>
      <span class="text-[10px] font-medium text-accent italic flex items-center gap-1">
        <span class="w-1 h-1 rounded-full bg-accent animate-pulse"></span>
        Mise à jour en direct
      </span>
    </div>

    <!-- Sagittale Section -->
    <div class="grid grid-cols-2 gap-3 mb-6">
      <MetricCell 
        v-for="m in sagittalMetrics" 
        :key="m.key"
        :label="m.label"
        :unit="m.unit"
        :value="formatValue(m.key, metrics?.[m.key])"
        :indicator="getStatus(m.key, metrics?.[m.key])"
        :visible="revealedKeys.has(m.key)"
      />
    </div>

    <!-- Postérieure Section -->
    <Transition name="fade">
      <div v-if="showPosterior" class="flex flex-col gap-4">
        <div class="flex items-center gap-2 px-1">
          <div class="h-px flex-1 bg-outline-variant/30"></div>
          <span class="text-[9px] font-bold uppercase tracking-tighter text-on-surface-variant/50">Vue Postérieure</span>
          <div class="h-px flex-1 bg-outline-variant/30"></div>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <MetricCell 
            v-for="m in posteriorMetrics" 
            :key="m.key"
            :label="m.label"
            :unit="m.unit"
            :value="formatValue(m.key, metrics?.[m.key])"
            :indicator="getStatus(m.key, metrics?.[m.key])"
            :visible="revealedKeys.has(m.key)"
          />
        </div>
      </div>
    </Transition>
    
    <div v-if="metrics && !showPosterior" class="mt-auto py-4 text-center border-t border-dashed border-outline-variant/30">
      <span class="text-[10px] font-medium text-on-surface-variant/40 italic">Vue postérieure non disponible</span>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-outline-variant);
  border-radius: 10px;
}
</style>
