<script setup>
import { computed } from 'vue'

const props = defineProps({
  report: {
    type: Object,
    required: true
  }
})

const formattedDate = computed(() => {
  if (!props.report.date) return '—'
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(props.report.date))
})
</script>

<template>
  <div class="bg-surface-container rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-surface-container-high/50 border-b border-outline-variant/20 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70">
          <th class="py-3 px-6 border-r border-outline-variant/10 w-1/5">Patient</th>
          <th class="py-3 px-6 border-r border-outline-variant/10 w-1/5">Pathologie</th>
          <th class="py-3 px-6 border-r border-outline-variant/10 w-1/5">Séance</th>
          <th class="py-3 px-6 border-r border-outline-variant/10 w-1/5">Chaussure</th>
          <th class="py-3 px-6 w-1/5">Profil</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-sm font-medium">
          <!-- Patient -->
          <td class="py-5 px-6 border-r border-outline-variant/10 align-top">
            <div class="text-white font-bold">{{ report.patient_id }}</div>
            <div class="text-[10px] text-surface-variant font-bold mt-1">ID UNIQUE</div>
          </td>

          <!-- Pathologie -->
          <td class="py-5 px-6 border-r border-outline-variant/10 align-top">
            <div class="text-white font-bold">{{ report.pathologie }}</div>
            <div class="flex items-center gap-1.5 mt-1">
              <span class="w-1.5 h-1.5 rounded-full" :class="{
                'bg-green-500': report.confiance === 'élevée',
                'bg-orange-500': report.confiance === 'modérée',
                'bg-red-500': report.confiance === 'faible'
              }"></span>
              <span class="text-[10px] text-surface-variant capitalize">Confiance {{ report.confiance }}</span>
            </div>
          </td>

          <!-- Séance -->
          <td class="py-5 px-6 border-r border-outline-variant/10 align-top">
            <div class="text-white">{{ formattedDate }}</div>
            <div class="text-[10px] text-primary/80 font-bold mt-1 uppercase tracking-tighter">SÉANCE #{{ report.numero_session }}</div>
          </td>

          <!-- Chaussure -->
          <td class="py-5 px-6 border-r border-outline-variant/10 align-top">
            <div class="text-white leading-tight">
              <span class="font-bold">{{ report.chaussure.marque }}</span>
              <span class="block text-xs text-surface-variant mt-0.5">{{ report.chaussure.modele }}</span>
            </div>
            <div class="mt-2 flex items-center gap-1.5">
              <span :class="report.chaussure.drop_mm > 8 ? 'text-orange-400 font-bold' : 'text-surface-variant'" class="text-[10px]">
                Drop {{ report.chaussure.drop_mm }}mm
              </span>
              <div v-if="report.chaussure.drop_mm > 8" class="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
            </div>
          </td>

          <!-- Profil -->
          <td class="py-5 px-6 align-top">
            <div class="text-white text-xs leading-relaxed">
              {{ report.profil.age }} ans · {{ report.profil.poids_kg }}kg · {{ report.profil.taille_cm }}cm
            </div>
            <div class="text-[10px] text-surface-variant mt-1">
              {{ report.profil.km_semaine }} km/sem · {{ report.profil.niveau }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
