<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'idle' // 'idle' | 'running' | 'done' | 'error'
  },
  elapsedMs: {
    type: Number,
    default: null
  },
  showConnector: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-start gap-4">
      <!-- Icon/Circle Column -->
      <div class="flex flex-col items-center">
        <div 
          class="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
          :class="{
            'bg-surface-container border border-outline-variant/30': status === 'idle',
            'border-2 border-accent border-t-transparent animate-spin': status === 'running',
            'bg-green-500 shadow-sm shadow-green-200': status === 'done',
            'bg-red-500 shadow-sm shadow-red-200': status === 'error'
          }"
        >
          <span v-if="status === 'done'" class="material-symbols-outlined text-white text-base font-bold">check</span>
          <span v-if="status === 'error'" class="material-symbols-outlined text-white text-base font-bold">close</span>
        </div>
        
        <!-- Connector -->
        <div 
          v-if="showConnector" 
          class="w-0.5 h-8 bg-outline-variant/20 my-1"
          :class="{ 'bg-green-500/30': status === 'done' }"
        ></div>
      </div>

      <!-- Text Column -->
      <div class="flex-1 pt-0.5">
        <div class="flex items-baseline justify-between gap-4">
          <span 
            class="text-sm font-medium transition-colors duration-300"
            :class="{
              'text-on-surface-variant/50': status === 'idle',
              'text-on-surface font-bold': status === 'running',
              'text-on-surface': status === 'done',
              'text-red-500': status === 'error'
            }"
          >
            {{ label }}
          </span>
          
          <span v-if="status === 'done' && elapsedMs !== null" class="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
            {{ (elapsedMs / 1000).toFixed(1) }}s
          </span>
        </div>

        <div 
          v-if="status === 'running'" 
          class="text-[10px] font-medium text-accent italic mt-0.5 animate-pulse"
        >
          En cours...
        </div>
        
        <div 
          v-if="status === 'error'" 
          class="text-[10px] font-medium text-red-400 italic mt-0.5"
        >
          Échec de l'étape
        </div>
      </div>
    </div>
  </div>
</template>
