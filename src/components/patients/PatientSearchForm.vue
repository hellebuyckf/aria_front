<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'search', 'new-patient'])

const localQuery = ref({ ...props.modelValue })

// NIR Formatting logic
function formatNir(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 15)
  return digits
    .replace(/^(\d{1})/, '$1 ')
    .replace(/^(\d{1} \d{2})/, '$1 ')
    .replace(/^(\d{1} \d{2} \d{2})/, '$1 ')
    .replace(/^(\d{1} \d{2} \d{2} \d{2})/, '$1 ')
    .replace(/^(\d{1} \d{2} \d{2} \d{2} \d{3})/, '$1 ')
    .replace(/^(\d{1} \d{2} \d{2} \d{2} \d{3} \d{3})/, '$1 ')
    .trim()
}

watch(() => localQuery.value.nir, (newNir) => {
  if (newNir) {
    localQuery.value.nir = formatNir(newNir)
  }
})

// Debounce timer
let debounceTimer = null

watch(localQuery, (newValue) => {
  emit('update:modelValue', newValue)
  
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('search', newValue)
  }, 300)
}, { deep: true })

function handleNewPatient() {
  emit('new-patient')
}
</script>

<template>
  <div class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm mb-8">
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between border-b border-outline-variant pb-4">
        <h2 class="text-[11px] uppercase tracking-[0.15em] font-bold text-on-surface-variant">
          Rechercher un patient
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col gap-2">
          <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/70 ml-1">
            Nom du patient
          </label>
          <div class="relative group">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary">
              person
            </span>
            <input 
              v-model="localQuery.name"
              type="text" 
              placeholder="Ex: MARTIN"
              class="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            >
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/70 ml-1">
            Numéro de sécurité sociale (NIR)
          </label>
          <div class="relative group">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary">
              fingerprint
            </span>
            <input 
              v-model="localQuery.nir"
              type="text" 
              placeholder="1 00 00 00 000 000 00"
              class="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            >
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between mt-2 pt-4 border-t border-outline-variant">
        <button 
          @click="handleNewPatient"
          class="flex items-center gap-2 text-primary font-semibold text-sm hover:bg-primary/5 px-4 py-2 rounded-lg transition-all"
        >
          <span class="material-symbols-outlined text-lg">add_circle</span>
          Nouveau patient
        </button>
        
        <button 
          @click="emit('search', localQuery)"
          class="flex items-center gap-2 bg-primary text-white font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md shadow-primary/20"
        >
          <span class="material-symbols-outlined text-lg">search</span>
          Rechercher
        </button>
      </div>
    </div>
  </div>
</template>
