<!--
Sync Impact Report:
- Version change: [PROJECT_INITIAL] → 2.0.0
- List of modified principles:
  - PRINCIPLE_1: Component Architecture & Composition API
  - PRINCIPLE_2: State Management & Data Flow (Pinia)
  - PRINCIPLE_3: Backend Communication (Axios & WebSocket)
  - PRINCIPLE_4: Clinical Workflow & UX
  - PRINCIPLE_5: Design System & Performance
- Added sections:
  - Standards de Style & Typographie
  - Standards de Routing & Sécurité
- Templates requiring updates:
  - .specify/templates/plan-template.md (✅ updated/consistent)
  - .specify/templates/spec-template.md (✅ updated/consistent)
  - .specify/templates/tasks-template.md (✅ updated/consistent)
-->

# ARIA Frontend Constitution

## Core Principles

### I. Architecture des Composants & Composition API
Structure des dossiers non négociable (`layout/`, `ui/`, `patients/`, `session/`, `report/`). Aucune logique métier n'est autorisée dans les composants `layout/` et `ui/` qui sont purement présentationnels. L'usage de `<script setup>` (Composition API) est obligatoire pour tous les composants ; l'Options API est strictement interdite.
**Rationale**: Assurer une séparation claire des responsabilités, faciliter la maintenance et garantir une cohérence technique sur l'ensemble du projet Vue.js 3.

### II. State Management & Flux de Données (Pinia)
Les stores Pinia (`useAuthStore`, `usePatientsStore`, `useSessionStore`) centralisent l'état global et la logique métier. Les composants `ui/` et `layout/` ne peuvent pas importer directement un store ; ils communiquent via props et événements. Seules les vues et les composants domaines ont accès aux stores.
**Rationale**: Maintenir l'indépendance des composants UI réutilisables et centraliser la logique métier pour une meilleure testabilité et traçabilité.

### III. Communication Backend (Axios & WebSocket)
Toute communication REST passe par une instance Axios centralisée (`src/services/api.js`) avec gestion globale des erreurs via intercepteurs. Les communications temps réel utilisent un WebSocket unique par session, avec une fermeture impérative dans le hook `onUnmounted()` du composant pour éviter les fuites de ressources.
**Rationale**: Garantir une gestion robuste et uniforme des erreurs et assurer la stabilité des connexions persistantes.

### IV. Workflow Clinicien Séquentiel & UX
L'interface doit refléter un workflow linéaire en 4 étapes (Saisie, Analyse, Protocole, Rapport). La navigation est séquentielle et protégée par des guards. Un feedback temps réel (progression, logs) est obligatoire pendant les phases de traitement. Le système doit supporter une dégradation gracieuse en cas d'indisponibilité des services LLM.
**Rationale**: Offrir une expérience utilisateur fluide et sans jargon technique adaptée au contexte clinique, tout en restant résilient aux pannes de services secondaires.

### V. Standards de Design & Performance
Utilisation exclusive des design tokens Tailwind pour les couleurs et la typographie (pas de valeurs hexadécimales en dur). CSS Scoped obligatoire par composant. Lazy loading impératif pour toutes les vues (sauf la recherche patient). Respect des standards d'accessibilité (contraste ≥ 4.5:1).
**Rationale**: Assurer la cohérence visuelle, optimiser les temps de chargement (FCP ≤ 1.2s) et garantir l'inclusion via l'accessibilité.

## Standards de Style & Typographie

La palette est immuable et basée sur les tokens Tailwind (`primary`, `surface`, `on-surface`, etc.). La typographie utilise la police Manrope avec des règles strictes pour les labels (uppercase, tracking-widest) et les titres. Les icônes proviennent exclusivement de Material Symbols Outlined.
**Rationale**: Maintenir une identité visuelle forte et professionnelle pour l'outil clinique ARIA.

## Standards de Routing & Sécurité

Toutes les routes sensibles sont protégées par le guard `requiresAuth`. Aucune donnée patient ne doit être stockée dans le `localStorage` pour garantir la conformité RGPD (session en mémoire uniquement). Les nouvelles routes doivent être ajoutées avec le flag `requiresAuth: true` et être chargées de manière asynchrone.
**Rationale**: Garantir la sécurité des données de santé et la conformité aux réglementations en vigueur.

## Governance

Cette constitution est la source de vérité pour toutes les décisions d'architecture et de développement. Toute modification ou ajout de fonctionnalité doit être validé par rapport à ces principes. Avant chaque commit, le développeur doit s'assurer du respect du linting (ESLint), de l'absence de données patient en dur et de la fermeture correcte des WebSockets.
**Rationale**: Préserver l'intégrité technique et la qualité du projet sur le long terme.

**Version**: 2.0.0 | **Ratified**: 2026-04-27 | **Last Amended**: 2026-04-27
