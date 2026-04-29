<script setup>
import { ref } from 'vue'

const props = defineProps({
  sagittale: {
    type: [Object, null], // File object or null
    required: true
  },
  posterieure: {
    type: [Object, null], // File object or null
    required: true
  }
})

const emit = defineEmits(['update:sagittale', 'update:posterieure'])

const inputSagit = ref(null)
const inputPost = ref(null)
const error = ref('')

const handleFile = (event, type) => {
  const file = event.target.files[0]
  if (!file) return

  // 2GB Limit validation
  if (file.size > 2 * 1024 * 1024 * 1024) {
    error.value = "Fichier trop volumineux (max 2Go)"
    return
  }

  error.value = ''
  emit(`update:${type}`, file)
}

const removeFile = (type) => {
  emit(`update:${type}`, null)
}
</script>

<template>
  <div class="p-6 rounded-2xl bg-white border border-outline-variant/50 shadow-sm">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xs font-bold uppercase tracking-widest text-on-surface">Vidéos d'Analyse</h2>
      <span v-if="error" class="text-[10px] font-bold text-red-500 uppercase tracking-wider">{{ error }}</span>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <!-- Sagittal Zone -->
      <div class="flex flex-col items-center gap-2">
        <span class="text-xs font-medium text-on-surface">Vidéo Sagittale</span>
        <div 
          @click="!sagittale && inputSagit.click()"
          class="relative w-full h-24 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group"
          :class="sagittale 
            ? 'border-blue-500/50 bg-blue-50/20' 
            : 'border-outline-variant/30 hover:border-blue-400 hover:bg-blue-50/10'"
        >
          <template v-if="!sagittale">
            <span class="material-symbols-outlined text-on-surface-variant/40 text-xl">videocam</span>
            <div class="flex items-center gap-1 text-blue-600">
              <span class="material-symbols-outlined text-sm">upload</span>
              <span class="text-[11px] font-bold">Télécharger</span>
            </div>
            <input 
              ref="inputSagit" 
              type="file" 
              accept=".mp4,.mov,.avi" 
              class="hidden" 
              @change="handleFile($event, 'sagittale')" 
            />
          </template>
          <template v-else>
            <span class="material-symbols-outlined text-blue-600">check_circle</span>
            <span class="text-[10px] font-bold text-blue-700 truncate max-w-[80%] px-4">{{ sagittale.name }}</span>
            <button 
              @click.stop="removeFile('sagittale')"
              class="absolute top-1 right-1 text-red-500 hover:bg-red-50 p-1 rounded-lg transition-colors"
            >
              <span class="material-symbols-outlined text-xs">close</span>
            </button>
          </template>
        </div>
      </div>

      <!-- Posterior Zone -->
      <div class="flex flex-col items-center gap-2">
        <span class="text-xs font-medium text-on-surface">Vidéo Postérieure</span>
        <div 
          @click="!posterieure && inputPost.click()"
          class="relative w-full h-24 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group"
          :class="posterieure 
            ? 'border-blue-500/50 bg-blue-50/20' 
            : 'border-outline-variant/30 hover:border-blue-400 hover:bg-blue-50/10'"
        >
          <template v-if="!posterieure">
            <span class="material-symbols-outlined text-on-surface-variant/40 text-xl">videocam</span>
            <div class="flex items-center gap-1 text-blue-600">
              <span class="material-symbols-outlined text-sm">upload</span>
              <span class="text-[11px] font-bold">Télécharger</span>
            </div>
            <input 
              ref="inputPost" 
              type="file" 
              accept=".mp4,.mov,.avi" 
              class="hidden" 
              @change="handleFile($event, 'posterieure')" 
            />
          </template>
          <template v-else>
            <span class="material-symbols-outlined text-blue-600">check_circle</span>
            <span class="text-[10px] font-bold text-blue-700 truncate max-w-[80%] px-4">{{ posterieure.name }}</span>
            <button 
              @click.stop="removeFile('posterieure')"
              class="absolute top-1 right-1 text-red-500 hover:bg-red-50 p-1 rounded-lg transition-colors"
            >
              <span class="material-symbols-outlined text-xs">close</span>
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
