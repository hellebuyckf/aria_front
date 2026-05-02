<script setup>
defineProps({
  timestamp: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true // 'INFO' | 'OK' | 'WARN' | 'ERROR' | 'ACTION'
  },
  message: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex items-center gap-2 py-0.5 whitespace-nowrap overflow-hidden">
    <span class="text-yellow-200/60 shrink-0">[{{ timestamp }}]</span>
    
    <span 
      class="text-[9px] font-bold px-1.5 py-0.5 rounded leading-none shrink-0 min-w-[45px] text-center"
      :class="{
        'bg-blue-500/10 text-blue-400': level === 'INFO',
        'bg-green-500/10 text-green-400': level === 'OK',
        'bg-orange-500/10 text-orange-400': level === 'WARN',
        'bg-red-500/10 text-red-400': level === 'ERROR',
        'bg-accent/10 text-accent': level === 'ACTION'
      }"
    >
      {{ level }}
    </span>

    <span 
      class="text-white text-ellipsis overflow-hidden"
      :class="{ 'text-accent font-medium': level === 'ACTION' }"
    >
      <span v-if="level === 'ACTION'" class="mr-1">>>></span>
      {{ message }}
    </span>
  </div>
</template>
