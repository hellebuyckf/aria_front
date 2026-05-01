<script setup>
defineProps({
  pct: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'running' // 'running' | 'done' | 'error'
  }
})
</script>

<template>
  <div class="p-6 rounded-2xl bg-white border border-outline-variant/50 shadow-sm">
    <div class="mb-4 flex items-end justify-between">
      <div>
        <h2 class="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Progression Globale</h2>
        <div class="text-4xl font-bold text-on-surface tabular-nums leading-none">
          {{ pct }}%
        </div>
      </div>
      
      <div class="flex flex-col items-end gap-1">
        <div 
          class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
          :class="{
            'bg-accent/10 text-accent': status === 'running',
            'bg-green-100 text-green-600': status === 'done',
            'bg-red-100 text-red-600': status === 'error'
          }"
        >
          {{ status === 'running' ? 'Traitement en cours' : status === 'done' ? 'Analyse terminée' : 'Erreur critique' }}
        </div>
        <div class="text-[10px] text-on-surface-variant font-medium italic">
          {{ status === 'running' ? 'Pipeline ARIA v2.0' : 'Attente redirection' }}
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="w-full h-3 bg-surface-container rounded-full overflow-hidden">
      <div 
        class="h-full transition-[width] duration-600 ease-in-out"
        :class="{
          'bg-accent': status === 'running',
          'bg-green-500': status === 'done',
          'bg-red-500': status === 'error'
        }"
        :style="{ width: `${pct}%` }"
      ></div>
    </div>
  </div>
</template>
