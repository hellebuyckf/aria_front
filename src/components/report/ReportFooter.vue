<script setup>
defineProps({
  meta: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <footer class="mt-20 pb-10 flex flex-col items-center">
    <!-- Disclaimer -->
    <div class="max-w-3xl text-center">
      <p class="text-[10px] text-surface-variant/60 italic leading-relaxed">
        Ce rapport est généré automatiquement par le système ARIA (PFE — Intelligence Artificielle). 
        Il constitue une aide à la décision clinique et ne se substitue pas au jugement du professionnel de santé. 
        Données traitées localement — aucun transfert cloud — conformité RGPD Art. 9.
      </p>
    </div>

    <!-- Separator -->
    <div class="w-24 h-px bg-outline-variant/30 my-6"></div>

    <!-- Technical Meta -->
    <div class="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-surface-variant/40">
      <span>ARIA MVP v2.0</span>
      <span class="w-1 h-1 rounded-full bg-surface-variant/20"></span>
      <span>{{ meta.modele }}</span>
      <span class="w-1 h-1 rounded-full bg-surface-variant/20"></span>
      <span>Confiance keypoints : {{ meta.confiance_keypoints }}%</span>
      <span class="w-1 h-1 rounded-full bg-surface-variant/20"></span>
      <span>{{ meta.nb_cycles }} cycles analysés</span>
    </div>
  </footer>
</template>
