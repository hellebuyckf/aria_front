<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const updateField = (field, value) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}

const brands = ["Brooks", "Asics", "Nike", "Hoka", "Saucony"]
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
  <div class="p-6 rounded-2xl bg-white border border-outline-variant/50 shadow-sm">
    <div class="mb-6">
      <h2 class="text-xs font-bold uppercase tracking-widest text-on-surface">Profil Chaussure</h2>
    </div>

    <div class="grid grid-cols-3 gap-6">
      <!-- Marque -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-on-surface px-1">Marque</label>
        <div class="relative">
          <select 
            :value="modelValue.marque"
            @change="updateField('marque', $event.target.value)"
            class="w-full h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-sm focus:border-primary outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled selected>Marque</option>
            <option v-for="b in brands" :key="b" :value="b">{{ b }}</option>
          </select>
          <span class="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
        </div>
      </div>

      <!-- Modèle -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-on-surface px-1">Modèle</label>
        <div class="relative">
          <select 
            :value="modelValue.modele"
            @change="updateField('modele', $event.target.value)"
            class="w-full h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-sm focus:border-primary outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled selected>Modèle</option>
            <option value="Ghost 16">Ghost 16</option>
            <option value="Ghost 15">Ghost 15</option>
            <option value="Adrenaline GTS">Adrenaline GTS</option>
          </select>
          <span class="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
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
