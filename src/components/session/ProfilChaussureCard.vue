<script setup>
import { ref, watch, onMounted } from 'vue'
import { useShoeStore } from '../../stores/shoes'
import { useSessionStore } from '../../stores/session'
import { mapShoeToUI } from '../../utils/shoeMapping'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  gender: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const shoeStore = useShoeStore()
const sessionStore = useSessionStore()

const modelSearch = ref(props.modelValue.modele)
const showSuggestions = ref(false)
const suggestions = ref([])

onMounted(() => {
  shoeStore.loadDatabase()
})

const updateField = (field, value) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}

const onModelInput = (e) => {
  const val = e.target.value
  modelSearch.value = val
  updateField('modele', val)
  
  if (val.length > 1) {
    suggestions.value = shoeStore.search(val, props.modelValue.marque, props.gender)
    showSuggestions.value = true
  } else {
    showSuggestions.value = false
  }
}

const selectShoe = (shoe) => {
  const mapped = mapShoeToUI(shoe)
  emit('update:modelValue', mapped)
  modelSearch.value = mapped.modele
  showSuggestions.value = false
}

const onVider = () => {
  sessionStore.resetChaussure()
  modelSearch.value = ''
}

// Sync modelSearch if modelValue.modele changes externally (e.g. on reset)
watch(() => props.modelValue.modele, (newVal) => {
  modelSearch.value = newVal
})

const drops = [0, 4, 8, 10, 12]
const stabilities = [
  { id: 'neutre', label: 'Neutre' },
  { id: 'pronation', label: 'Pronation' },
  { id: 'supination', label: 'Supination' }
]
const cushionings = [
  { id: 'maximal', label: 'Maximal' },
  { id: 'standard', label: 'Standard' },
  { id: 'minimal', label: 'Minimal' }
]
const weightTypes = [
  { id: 'leger', label: 'Léger' },
  { id: 'moyen', label: 'Moyen' },
  { id: 'lourd', label: 'Lourd' }
]
const dynamisms = [
  { id: 'faible', label: 'Faible' },
  { id: 'moyen', label: 'Moyen' },
  { id: 'eleve', label: 'Élevé' }
]
</script>

<template>
  <div class="p-6 rounded-2xl bg-white border border-outline-variant/50 shadow-sm relative">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-xs font-bold uppercase tracking-widest text-on-surface">Profil Chaussure</h2>
      <button 
        @click="onVider"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-red-500 hover:bg-red-50 transition-all border border-red-100"
      >
        <span class="material-symbols-outlined text-sm">delete</span>
        Vider
      </button>
    </div>

    <div class="grid grid-cols-3 gap-6">
      <!-- Marque -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-on-surface px-1">Marque</label>
        <div class="relative">
          <input 
            type="text"
            :value="modelValue.marque"
            @input="updateField('marque', $event.target.value)"
            placeholder="Ex: Asics"
            class="w-full h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-sm focus:border-primary outline-none transition-all"
            list="brand-list"
          />
          <datalist id="brand-list">
            <option v-for="b in shoeStore.brands" :key="b" :value="b" />
          </datalist>
        </div>
      </div>

      <!-- Modèle -->
      <div class="flex flex-col gap-1.5 relative">
        <label class="text-xs font-medium text-on-surface px-1">Modèle</label>
        <input 
          type="text"
          :value="modelSearch"
          @input="onModelInput"
          @blur="setTimeout(() => showSuggestions = false, 200)"
          placeholder="Ex: Nimbus 25"
          class="w-full h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-sm focus:border-primary outline-none transition-all"
        />
        
        <!-- Suggestions Dropdown -->
        <div v-if="showSuggestions && suggestions.length > 0" class="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-outline-variant/50 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          <div 
            v-for="shoe in suggestions" 
            :key="shoe.url"
            @mousedown="selectShoe(shoe)"
            class="px-4 py-3 hover:bg-surface-container-low cursor-pointer border-b border-outline-variant/30 last:border-0"
          >
            <div class="text-xs font-bold text-on-surface">{{ shoe.name }}</div>
            <div class="text-[10px] text-on-surface-variant flex gap-2">
              <span>{{ shoe.brand }}</span>
              <span>·</span>
              <span>{{ shoe.Drop }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Drop -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-on-surface px-1">Drop (mm)</label>
        <div class="relative">
          <select 
            :value="modelValue.drop"
            @change="updateField('drop', parseInt($event.target.value))"
            class="w-full h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-sm focus:border-primary outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled selected>Drop</option>
            <option v-for="d in drops" :key="d" :value="d">{{ d }}</option>
          </select>
          <span class="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
        </div>
      </div>

      <!-- Stabilité -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-on-surface px-1">Stabilité</label>
        <div class="relative">
          <select 
            :value="modelValue.stabilite"
            @change="updateField('stabilite', $event.target.value)"
            class="w-full h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-sm focus:border-primary outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled selected>Stabilité</option>
            <option v-for="s in stabilities" :key="s.id" :value="s.id">{{ s.label }}</option>
          </select>
          <span class="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
        </div>
      </div>

      <!-- Amorti -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-on-surface px-1">Amorti</label>
        <div class="relative">
          <select 
            :value="modelValue.amorti"
            @change="updateField('amorti', $event.target.value)"
            class="w-full h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-sm focus:border-primary outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled selected>Amorti</option>
            <option v-for="c in cushionings" :key="c.id" :value="c.id">{{ c.label }}</option>
          </select>
          <span class="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
        </div>
      </div>

      <!-- Poids Coureur -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-on-surface px-1">Poids du coureur</label>
        <div class="relative">
          <select 
            :value="modelValue.poidsType"
            @change="updateField('poidsType', $event.target.value)"
            class="w-full h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-sm focus:border-primary outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled selected>Poids</option>
            <option v-for="w in weightTypes" :key="w.id" :value="w.id">{{ w.label }}</option>
          </select>
          <span class="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
        </div>
      </div>

      <!-- Dynamisme -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-on-surface px-1">Dynamisme</label>
        <div class="relative">
          <select 
            :value="modelValue.dynamisme"
            @change="updateField('dynamisme', $event.target.value)"
            class="w-full h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-sm focus:border-primary outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled selected>Dynamisme</option>
            <option v-for="d in dynamisms" :key="d.id" :value="d.id">{{ d.label }}</option>
          </select>
          <span class="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
        </div>
      </div>
    </div>
  </div>
</template>
