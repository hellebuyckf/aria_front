<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    default: null
  },
  unit: {
    type: String,
    default: ''
  },
  indicator: {
    type: String,
    default: null // 'red' | 'orange' | 'green' | null
  }
})
</script>

<template>
  <div class="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between group hover:border-accent/50 transition-all duration-300">
    <div class="flex flex-col gap-0.5">
      <span class="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant group-hover:text-accent transition-colors">{{ label }}</span>
      <Transition name="fade" mode="out-in">
        <div :key="value" class="flex items-baseline gap-1">
          <span v-if="value !== null" class="text-sm font-bold text-on-surface">
            {{ value }}
            <span v-if="unit" class="text-[10px] font-medium text-on-surface-variant ml-0.5">{{ unit }}</span>
          </span>
          <span v-else class="text-[10px] font-medium text-on-surface-variant/50 italic animate-pulse">Calcul...</span>
        </div>
      </Transition>
    </div>

    <!-- Normative Indicator Dot -->
    <div 
      v-if="value !== null && indicator" 
      class="w-2.5 h-2.5 rounded-full shadow-sm"
      :class="{
        'bg-red-400': indicator === 'red',
        'bg-orange-400': indicator === 'orange',
        'bg-green-400': indicator === 'green'
      }"
    ></div>
    <div v-else-if="value !== null" class="w-2.5 h-2.5 rounded-full bg-outline-variant/30"></div>
  </div>
</template>
