<script setup>
defineProps({
  sources: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div id="sources" class="mt-16 pt-8 border-t border-outline-variant/30 scroll-mt-10">
    <h2 class="text-lg font-bold text-white mb-6 px-1 uppercase tracking-tight flex items-center gap-2">
      <span class="material-symbols-outlined text-xl">library_books</span>
      Sources médicales — RAG PubMed (ChromaDB)
    </h2>
    
    <div class="flex flex-col gap-4">
      <div 
        v-for="s in sources" 
        :key="s.index"
        class="flex gap-4 p-4 rounded-xl bg-surface-container/30 border border-outline-variant/10 text-sm"
      >
        <span class="text-cyan-400 font-bold shrink-0">[{{ s.index }}]</span>
        <div class="text-surface-variant/90 leading-relaxed">
          <span class="text-on-surface font-medium">{{ s.auteurs }} ({{ s.annee }}).</span>
          <span class="italic font-medium text-white mx-1">{{ s.titre }}</span>
          <span class="font-bold italic text-surface-variant">{{ s.revue }}.</span>
          <span class="block mt-1 text-[10px] font-bold text-blue-400 uppercase tracking-widest">PMID: {{ s.pmid || '—' }}</span>
        </div>
      </div>
      <div v-if="sources.length === 0" class="p-8 text-center text-surface-variant/40 italic border border-dashed border-outline-variant/20 rounded-2xl">
        Aucune source bibliographique spécifique référencée.
      </div>
    </div>
  </div>
</template>
