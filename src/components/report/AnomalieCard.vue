<script setup>
defineProps({
  titre: {
    type: String,
    required: true
  },
  corps: {
    type: String,
    required: true
  },
  refs: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="border-l-4 border-red-500 bg-red-900/10 rounded-r-2xl p-5 mb-4 shadow-sm group hover:bg-red-900/15 transition-colors">
    <h3 class="font-bold text-white mb-2 group-hover:text-red-300 transition-colors">{{ titre }}</h3>
    <p class="text-sm text-surface-variant/90 leading-relaxed">
      {{ corps }}
      <template v-if="refs.length > 0">
        <a 
          v-for="r in refs" 
          :key="r" 
          href="#sources" 
          class="text-blue-400 hover:underline ml-1 font-bold"
        >[{{ r }}]</a>
      </template>
    </p>
  </div>
</template>
