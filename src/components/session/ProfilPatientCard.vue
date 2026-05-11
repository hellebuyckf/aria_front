<script setup>
import { computed } from 'vue'

const props = defineProps({
  patientId: {
    type: String,
    required: true
  },
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const updateField = (field, value) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}

const levels = [
  { id: 'debutant', label: 'Débutant' },
  { id: 'intermediaire', label: 'Intermédiaire' },
  { id: 'avance', label: 'Avancé' },
  { id: 'competiteur', label: 'Pro/Elite' }
]
</script>

<template>
  <div class="p-6 rounded-2xl bg-white border border-outline-variant/50 shadow-sm">
    <div class="mb-6">
      <h2 class="text-xs font-bold uppercase tracking-widest text-on-surface">Profil Patient</h2>
    </div>

    <div class="grid grid-cols-2 gap-x-6 gap-y-4">
      <!-- Readonly ID -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-on-surface px-1">ID Patient</label>
        <div class="h-11 px-4 flex items-center rounded-xl border border-outline-variant/50 bg-white text-sm text-on-surface">
          {{ patientId }}
        </div>
      </div>

      <!-- Age -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-on-surface px-1">Âge</label>
        <input 
          type="number" 
          min="0"
          :value="modelValue.age"
          @input="updateField('age', $event.target.value)"
          class="h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-sm focus:border-primary outline-none transition-all"
        />
      </div>

      <!-- Taille -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-on-surface px-1">Taille (cm)</label>
        <input 
          type="number" 
          min="0"
          :value="modelValue.taille"
          @input="updateField('taille', $event.target.value)"
          class="h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-sm focus:border-primary outline-none transition-all"
        />
      </div>

      <!-- Poids -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-on-surface px-1">Poids kg</label>
        <input 
          type="number" 
          min="0"
          :value="modelValue.poids"
          @input="updateField('poids', $event.target.value)"
          class="h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-sm focus:border-primary outline-none transition-all"
        />
      </div>

      <!-- Sexe -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-on-surface px-1">Sexe</label>
        <div class="flex gap-2">
          <button 
            v-for="gender in ['Homme', 'Femme']" 
            :key="gender"
            @click="updateField('sexe', gender)"
            class="flex-1 h-11 rounded-xl text-sm font-medium transition-all border"
            :class="modelValue.sexe === gender 
              ? 'bg-blue-50 border-blue-400 text-blue-600 shadow-sm' 
              : 'bg-white border-outline-variant/50 text-on-surface hover:bg-surface-container-low'"
          >
            {{ gender }}
          </button>
        </div>
      </div>

      <!-- Km / Semaine -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-on-surface px-1">Km moyen par semaine</label>
        <input 
          type="number" 
          min="0"
          :value="modelValue.kmSemaine"
          @input="updateField('kmSemaine', $event.target.value)"
          class="h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-sm focus:border-primary outline-none transition-all"
        />
      </div>
    </div>

    <!-- Niveau de Pratique -->
    <div class="mt-6 flex flex-col gap-3">
      <label class="text-xs font-medium text-on-surface px-1">Niveau de pratique</label>
      <div class="flex flex-wrap gap-3">
        <button 
          v-for="level in levels" 
          :key="level.id"
          @click="updateField('niveauPratique', level.id)"
          class="px-6 py-2.5 rounded-full text-sm font-medium transition-all border"
          :class="modelValue.niveauPratique === level.id 
            ? 'bg-blue-50 border-blue-400 text-blue-600 shadow-sm' 
            : 'bg-white border-outline-variant/50 text-on-surface hover:bg-surface-container-low'"
        >
          {{ level.label }}
        </button>
      </div>
    </div>
  </div>
</template>
