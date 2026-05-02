<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  norme: {
    type: String,
    required: true
  },
  valeur: {
    type: String,
    default: null
  },
  statut: {
    type: String,
    default: null // 'anormal' | 'limite' | 'normal'
  }
})

const STATUT_STYLES = {
  anormal: { text: 'text-red-400', bg: 'bg-red-900/30', label: 'Anormal' },
  limite: { text: 'text-orange-400', bg: 'bg-orange-900/30', label: 'Limite' },
  normal: { text: 'text-green-400', bg: 'bg-green-900/30', label: 'Normal' },
}
</script>

<template>
  <tr class="border-b border-surface-container/50 hover:bg-primary/5 transition-colors group">
    <td class="py-4 pl-4 text-sm font-medium text-white">{{ label }}</td>
    <td class="py-4 text-sm text-surface-variant/80 italic">{{ norme }}</td>
    <td class="py-4 text-sm font-bold text-white tabular-nums">
      <span v-if="valeur">{{ valeur }}</span>
      <span v-else class="text-surface-variant/50 italic">—</span>
    </td>
    <td class="py-4 pr-4 text-center">
      <div v-if="statut && STATUT_STYLES[statut]" 
        :class="[STATUT_STYLES[statut].bg, STATUT_STYLES[statut].text]"
        class="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest min-w-[80px]"
      >
        {{ STATUT_STYLES[statut].label }}
      </div>
      <span v-else class="text-surface-variant/30">—</span>
    </td>
  </tr>
</template>
