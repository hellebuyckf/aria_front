<script setup>
const props = defineProps({
  patients: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['start-session'])

const formatDate = (iso) => iso ? new Intl.DateTimeFormat('fr-FR', { 
  day: '2-digit', 
  month: 'short', 
  year: 'numeric' 
}).format(new Date(iso)) : 'Aucune session'
</script>

<template>
  <div class="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-surface-container-low border-b border-outline-variant">
          <th class="py-4 px-6 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/70">ID Patient</th>
          <th class="py-4 px-6 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/70">Nom</th>
          <th class="py-4 px-6 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/70">Prénom</th>
          <th class="py-4 px-6 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/70">Dernière Session</th>
          <th class="py-4 px-6 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/70 text-right">Action</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loading Skeleton -->
        <tr v-if="loading" v-for="i in 4" :key="i" class="border-b border-outline-variant/50">
          <td v-for="col in 5" :key="col" class="py-5 px-6">
            <div class="h-4 bg-surface-container rounded animate-pulse w-3/4"></div>
          </td>
        </tr>

        <!-- Empty State -->
        <tr v-else-if="patients.length === 0">
          <td colspan="5" class="py-20 text-center">
            <div class="flex flex-col items-center gap-2 text-on-surface-variant/50">
              <span class="material-symbols-outlined text-4xl">search_off</span>
              <p class="text-sm font-medium">Aucun patient trouvé</p>
            </div>
          </td>
        </tr>

        <!-- Data Rows -->
        <tr 
          v-else 
          v-for="patient in patients" 
          :key="patient.id"
          class="border-b border-outline-variant/50 hover:bg-primary/5 transition-colors group"
        >
          <td class="py-4 px-6 text-sm font-mono text-on-surface-variant/80">{{ patient.id }}</td>
          <td class="py-4 px-6 text-sm font-bold text-on-surface">{{ patient.lastName }}</td>
          <td class="py-4 px-6 text-sm font-medium text-on-surface-variant">{{ patient.firstName }}</td>
          <td class="py-4 px-6 text-sm text-on-surface-variant/70">{{ formatDate(patient.lastSession) }}</td>
          <td class="py-4 px-6 text-right">
            <button 
              @click="emit('start-session', patient)"
              class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-low text-primary hover:bg-primary hover:text-white transition-all group-hover:shadow-lg active:scale-95"
              title="Initier session"
            >
              <span class="material-symbols-outlined" style='font-variation-settings: "FILL" 1;'>directions_run</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
