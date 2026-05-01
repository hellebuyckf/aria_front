<script setup>
import PipelineStepItem from './PipelineStepItem.vue'

defineProps({
  steps: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="p-6 rounded-2xl bg-white border border-outline-variant/50 shadow-sm flex flex-col h-full">
    <h2 class="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6 px-1">Étapes du Pipeline</h2>
    
    <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      <PipelineStepItem 
        v-for="(step, index) in steps" 
        :key="index"
        :label="step.label"
        :status="step.status"
        :elapsedMs="step.elapsedMs"
        :showConnector="index < steps.length - 1"
      />
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-outline-variant);
  border-radius: 10px;
}
</style>
