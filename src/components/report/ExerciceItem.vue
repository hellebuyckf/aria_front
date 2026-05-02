<script setup>
defineProps({
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex gap-3 text-sm py-1.5 group">
    <span class="text-cyan-400 mt-1 shrink-0 scale-75">■</span>
    <div class="leading-relaxed">
      <span class="font-bold text-white group-hover:text-cyan-400 transition-colors">{{ nom }}</span>
      <span class="text-surface-variant/80"> — {{ description }}</span>
    </div>
  </div>
</template>
