<script setup>
import { useAuthStore } from '../../stores/auth'
import avatarUrl from '../../assets/avatar-placeholder.png'

const auth = useAuthStore()
</script>

<template>
  <header class="h-16 border-b border-outline-variant bg-surface-container-lowest px-8 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <h1 class="text-[11px] uppercase tracking-[0.15em] font-bold text-on-surface-variant">
        Portail de Diagnostic ARIA
      </h1>
    </div>
    
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-3">
        <div class="flex flex-col items-end">
          <span class="text-sm font-semibold text-on-surface">{{ auth.practitioner.name }}</span>
          <span class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/70">
            {{ auth.practitioner.role }}
          </span>
        </div>
        <img :src="avatarUrl" alt="Practitioner Avatar" class="w-10 h-10 rounded-full border border-outline-variant object-cover">
      </div>
      
      <button 
        @click="auth.logout"
        class="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors pl-4 border-l border-outline-variant"
      >
        <span class="material-symbols-outlined">logout</span>
      </button>
    </div>
  </header>
</template>
