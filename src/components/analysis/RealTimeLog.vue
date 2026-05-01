<script setup>
import { ref, watch, nextTick } from 'vue'
import LogLine from './LogLine.vue'

const props = defineProps({
  entries: {
    type: Array,
    required: true
  }
})

const logContainer = ref(null)

watch(() => props.entries.length, () => {
  nextTick(() => {
    if (logContainer.value) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight
    }
  })
})
</script>

<template>
  <div class="p-6 rounded-2xl bg-white border border-outline-variant/50 shadow-sm flex flex-col">
    <h2 class="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4 px-1">Log Temps Réel</h2>
    
    <div 
      ref="logContainer"
      class="flex-1 bg-[#1a1a2e] border border-surface-container rounded-xl p-4 h-48 overflow-y-auto font-mono text-[11px] custom-scrollbar scroll-smooth"
    >
      <TransitionGroup name="fade">
        <LogLine 
          v-for="(entry, index) in entries" 
          :key="`${entry.timestamp}-${index}`"
          :timestamp="entry.timestamp"
          :level="entry.level"
          :message="entry.message"
        />
      </TransitionGroup>
      
      <div v-if="entries.length === 0" class="h-full flex items-center justify-center text-on-surface-variant/30 italic">
        Attente d'événements système...
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #111122;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #2a2a44;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #3a3a5a;
}
</style>
