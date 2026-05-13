<script setup>
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useSessionStore } from '../../stores/session'
import avatarUrl from '../../assets/avatar-placeholder.png'

const route = useRoute()
const auth = useAuthStore()
const session = useSessionStore()

const formatDate = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  const d = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
  const t = date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
  return `${d} · ${t}`
}
</script>

<template>
  <header class="h-16 border-b border-outline-variant bg-white px-8 flex items-center justify-between">
    <div class="flex flex-col">
      <div v-if="session.patientId && route.path !== '/patients'" class="flex flex-col">
        <h1 class="text-sm font-bold text-on-surface">
          ID Patient: {{ session.patientId }}
        </h1>
        <span class="text-xs text-on-surface-variant/70">
          {{ formatDate(session.horodatage) }}
        </span>
      </div>
      <h1 v-else class="text-[11px] uppercase tracking-[0.15em] font-bold text-on-surface-variant">
        Portail de Diagnostic ARIA
      </h1>
    </div>
    
    <div class="flex items-center gap-8">
      <button 
        @click="auth.logout"
        class="flex items-center gap-2 text-on-surface hover:text-primary transition-colors text-sm"
      >
        <span class="material-symbols-outlined text-lg">logout</span>
        <span>Déconnexion</span>
      </button>

      <div class="flex items-center gap-3">
        <div class="flex flex-col items-end">
          <span class="text-sm font-semibold text-on-surface">{{ auth.practitioner.name }}</span>
          <span class="text-[10px] text-on-surface-variant">
            {{ auth.practitioner.role }}
          </span>
        </div>
        <img :src="avatarUrl" alt="Practitioner Avatar" class="w-10 h-10 rounded-full border border-outline-variant object-cover">
      </div>
    </div>
  </header>
</template>
