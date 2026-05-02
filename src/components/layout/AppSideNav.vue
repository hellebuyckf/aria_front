<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  badgePatient: {
    type: String,
    default: null
  },
  nouvelleSessionActif: {
    type: Boolean,
    default: false
  },
  activeStep: {
    type: Number,
    default: 1
  }
})

const route = useRoute()
const isPatientManagement = computed(() => route.path === '/patients')

const steps = computed(() => {
  const baseSteps = [
    { id: 1, name: 'Saisie patient' },
    { id: 2, name: 'Analyse' },
    { id: 3, name: 'Rapport' },
    { id: 4, name: 'Recommandations' },
  ]

  return baseSteps.map(step => {
    let status = 'En attente'
    let state = 'waiting' // 'waiting' | 'active' | 'done'

    if (step.id === props.activeStep) {
      status = 'En cours...'
      state = 'active'
    } else if (step.id < props.activeStep) {
      status = 'Validé'
      state = 'done'
    }

    return { ...step, status, state }
  })
})
</script>

<template>
  <nav class="w-64 border-r border-slate-200 bg-white flex flex-col h-screen">
    <!-- Header: Logo & Slogan -->
    <div class="pt-2 pb-4 flex flex-col items-center">
      <img src="/logo-aria.png" alt="ARIA Logo" class="h-56 w-auto object-contain mb-2">
      <div class="text-[9px] uppercase tracking-[0.2em] font-bold text-[#0D2B6B]/40 text-center leading-relaxed px-4">
        Le analyse et retour /<br>intelligent sur l'allure
      </div>
    </div>

    <!-- Case 1: Patient Management (Search Mode) -->
    <div v-if="isPatientManagement" class="flex-1 mt-6">
      <div class="relative flex items-center bg-[#F1F5F9] border-l-4 border-[#0D2B6B] py-3 px-6 mx-3 rounded-r-md">
        <span class="material-symbols-outlined text-[#0D2B6B] mr-3 text-xl font-bold">search</span>
        <span class="text-[#0D2B6B] font-bold text-xs tracking-tight">Recherche du patient</span>
      </div>
    </div>

    <!-- Case 2: Session Setup / Steps Tracker -->
    <template v-else>
      <!-- Active Patient Card -->
      <div v-if="badgePatient" class="mx-4 mb-10 p-4 rounded-xl border border-slate-100 bg-[#F8FAFC]">
        <div class="text-[8px] uppercase tracking-widest font-bold text-slate-400 mb-1">Patient</div>
        <div class="text-xs font-bold text-[#0D2B6B] truncate">{{ badgePatient }}</div>
      </div>

      <!-- Step Tracker -->
      <div class="flex-1 px-6 relative">
        <!-- Vertical Line -->
        <div class="absolute left-[43px] top-6 bottom-6 w-0.5 bg-slate-100"></div>

        <div class="flex flex-col gap-8">
          <div v-for="step in steps" :key="step.id" class="flex items-center gap-5 relative z-10">
            <!-- Icon Circle -->
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-300"
              :class="{
                'bg-[#0D2B6B] text-white shadow-[#0D2B6B]/20': step.state === 'active',
                'bg-green-400 text-white shadow-green-100': step.state === 'done',
                'bg-slate-100 text-slate-400': step.state === 'waiting'
              }"
            >
              <span class="material-symbols-outlined text-lg">
                {{ step.state === 'active' ? 'sync' : step.state === 'done' ? 'check' : 'lock' }}
              </span>
            </div>

            <!-- Label & Status -->
            <div class="flex flex-col">
              <span 
                class="text-[11px] font-bold uppercase tracking-wider transition-colors duration-300" 
                :class="{
                  'text-[#0D2B6B]': step.state === 'active',
                  'text-[#0D2B6B]/70': step.state === 'done',
                  'text-slate-300': step.state === 'waiting'
                }"
              >
                {{ step.name }}
              </span>
              <span 
                class="text-[9px] font-medium transition-colors duration-300" 
                :class="{
                  'text-blue-400': step.state === 'active',
                  'text-green-500 font-bold': step.state === 'done',
                  'text-slate-300': step.state === 'waiting'
                }"
              >
                {{ step.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Bottom Actions -->
    <div class="px-4 py-4 flex flex-col gap-1">
      <button 
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all"
        :class="nouvelleSessionActif ? 'text-[#0D2B6B] hover:bg-slate-50' : 'text-slate-300 cursor-not-allowed'"
      >
        <span class="material-symbols-outlined text-lg">add</span>
        Nouvelle session
      </button>
      <button 
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-slate-300 cursor-not-allowed"
      >
        <span class="material-symbols-outlined text-lg">lock</span>
        Historique patient
      </button>
    </div>

    <!-- Footer -->
    <div class="px-8 pb-8 flex flex-col gap-0.5">
      <div class="text-[8px] uppercase tracking-widest font-bold text-slate-300">
        MVP v2.0 · PFE
      </div>
      <div class="text-[8px] uppercase tracking-widest font-bold text-slate-300">
        ARIA-ft · MedGemma 4B
      </div>
    </div>
  </nav>
</template>
