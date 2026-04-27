<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const steps = [
  { id: 1, name: 'Recherche du patient', icon: 'person_search', route: '/patients' },
  { id: 2, name: 'Analyse vidéo', icon: 'videocam', locked: true },
  { id: 3, name: 'Génération protocole', icon: 'psychology', locked: true },
  { id: 4, name: 'Rapport PDF', icon: 'description', locked: true },
]

const visibleSteps = computed(() => {
  // On ne montre que l'étape active pour l'écran actuel
  return steps.filter(step => step.route && route.path.startsWith(step.route))
})
</script>

<template>
  <nav class="w-64 border-r border-outline-variant bg-surface-container-lowest flex flex-col">
    <div class="p-8 pb-4">
      <div class="mb-8">
        <img src="/logo-aria.png" alt="ARIA Logo" class="h-36 w-auto object-contain">
      </div>
    </div>

    <div class="flex-1 flex flex-col gap-1 px-4">
      <div 
        v-for="step in visibleSteps" 
        :key="step.id"
        :class="[
          'flex items-center gap-4 px-4 py-3 rounded-lg transition-all bg-primary/5 text-primary'
        ]"
      >
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">
          {{ step.icon }}
        </span>
        <div class="flex flex-col">
          <span class="text-[10px] uppercase tracking-widest font-bold opacity-70">Étape {{ step.id }}</span>
          <span class="text-sm font-semibold">{{ step.name }}</span>
        </div>
      </div>
    </div>

    <div class="p-8">
      <div class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/50">
        MVP v2.0.0 · ARIA-FT
      </div>
    </div>
  </nav>
</template>
