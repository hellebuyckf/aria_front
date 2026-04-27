<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['page-change'])

function handlePrev() {
  if (props.currentPage > 1) {
    emit('page-change', props.currentPage - 1)
  }
}

function handleNext() {
  if (props.currentPage < props.totalPages) {
    emit('page-change', props.currentPage + 1)
  }
}
</script>

<template>
  <div class="flex items-center justify-between bg-surface-container-low px-6 py-4 rounded-xl border border-outline-variant mt-4">
    <div class="text-xs text-on-surface-variant font-medium">
      Affichage de 
      <span class="font-bold text-on-surface">{{ (currentPage - 1) * perPage + 1 }}</span>
      à 
      <span class="font-bold text-on-surface">{{ Math.min(currentPage * perPage, totalItems) }}</span>
      sur 
      <span class="font-bold text-on-surface">{{ totalItems }}</span> patients
    </div>

    <div class="flex items-center gap-2">
      <button 
        @click="handlePrev"
        :disabled="currentPage === 1"
        :class="[
          'p-2 rounded-lg border border-outline-variant transition-all flex items-center justify-center',
          currentPage === 1 ? 'opacity-30 cursor-not-allowed bg-surface' : 'hover:bg-primary/5 hover:border-primary/50 text-primary active:scale-95 bg-surface-container-lowest shadow-sm'
        ]"
      >
        <span class="material-symbols-outlined text-xl">chevron_left</span>
      </button>

      <div class="flex items-center gap-1">
        <button 
          v-for="n in totalPages" 
          :key="n"
          @click="emit('page-change', n)"
          :class="[
            'w-10 h-10 rounded-lg text-sm font-bold transition-all',
            n === currentPage 
              ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105' 
              : 'text-on-surface-variant hover:bg-primary/5 hover:text-primary'
          ]"
        >
          {{ n }}
        </button>
      </div>

      <button 
        @click="handleNext"
        :disabled="currentPage === totalPages || totalPages === 0"
        :class="[
          'p-2 rounded-lg border border-outline-variant transition-all flex items-center justify-center',
          (currentPage === totalPages || totalPages === 0) ? 'opacity-30 cursor-not-allowed bg-surface' : 'hover:bg-primary/5 hover:border-primary/50 text-primary active:scale-95 bg-surface-container-lowest shadow-sm'
        ]"
      >
        <span class="material-symbols-outlined text-xl">chevron_right</span>
      </button>
    </div>
  </div>
</template>
