# ARIA Spec Guidelines (Vibe Coding)

## Stack Technique
- Framework: Vue 3.5.3 (Composition API, <script setup>)
- Build Tool: Vite 8.0.8
- State: Pinia 3.0.4
- Communication: Axios + WebSocket natif (pas de lib tierce pour WS)

## Règles de Design & Style
- Thème: Biomechanical Precision (Clinical High-Tech).
- Couleurs: aria-navy (#0D3878), aria-sky (#5EC8F2), aria-bg (#F0F4F8).
- Radius: rounded-aria (12px).
- Pas de framework CSS (Vuetify/Quasar). Utiliser Tailwind pur.

## Notations & Conventions
- Toujours utiliser des notations de Data Science / Deep Learning pour le code et les commentaires (ex: $\mathcal{S}$ pour l'état, $\Delta$ pour les mutations).
- Nommage des variables clinique et précis (ex: cadence_spm, trunk_angle_deg).
