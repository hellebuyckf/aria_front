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

const pathologies = [
  "Lombalgie (douleur lombaire à l'effort)",
  "Tendinite rotulienne (syndrome fémoro-patellaire)",
  "Syndrome de la bandelette ilio-tibiale (SBIT)",
  "Périostite tibiale (shin splints)",
  "Tendinite du tendon d'Achille",
  "Fasciite plantaire"
]

const sides = [
  { id: 'bilateral', label: 'Bilatéral' },
  { id: 'gauche', label: 'Gauche' },
  { id: 'droit', label: 'Droit' }
]

const severities = [
  { id: 'legere', label: 'Légère' },
  { id: 'moderee', label: 'Modérée' },
  { id: 'severe', label: 'Sévère' }
]
</script>

<template>
  <div class="p-6 rounded-2xl bg-white border border-outline-variant/50 shadow-sm">
    <div class="mb-6">
      <h2 class="text-xs font-bold uppercase tracking-widest text-on-surface">Pathologie Déclarée</h2>
    </div>

    <div class="flex flex-col gap-6">
      <!-- Pathology Type -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-on-surface px-1">Type de pathologie</label>
        <div class="relative">
          <select 
            :value="modelValue.type"
            @change="updateField('type', $event.target.value)"
            class="w-full h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-sm focus:border-primary outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled selected>Sélectionner une pathologie</option>
            <option v-for="p in pathologies" :key="p" :value="p">{{ p }}</option>
          </select>
          <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <!-- Side -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-on-surface px-1">Côté atteint</label>
          <div class="relative">
            <select 
              :value="modelValue.cote"
              @change="updateField('cote', $event.target.value)"
              class="w-full h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-sm focus:border-primary outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled selected>Côté</option>
              <option v-for="side in sides" :key="side.id" :value="side.id">{{ side.label }}</option>
            </select>
            <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
          </div>
        </div>

        <!-- Severity -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-on-surface px-1">Sévérité estimée</label>
          <div class="relative">
            <select 
              :value="modelValue.severite"
              @change="updateField('severite', $event.target.value)"
              class="w-full h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-sm focus:border-primary outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled selected>Sévérité</option>
              <option v-for="sev in severities" :key="sev.id" :value="sev.id">{{ sev.label }}</option>
            </select>
            <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
