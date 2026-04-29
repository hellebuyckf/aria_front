# Feature Specification: Saisie Patient / Configuration de Session

**Feature Branch**: `002-patient-session-setup`  
**Created**: 2026-04-27  
**Status**: Draft  
Input: Spec 002 provided by user

## Clarifications

### Session 2026-04-27
- Q: How should the video deposition zones handle files for the MVP? → A: Real File Selection (use `<input type="file">` and keep `File` objects in memory).
- Q: When should form data be saved to the session store? → A: Sequential Save (one-time save of the whole form upon clicking "Lancer").
- Q: How should the sessionId be generated and managed for the redirection? → A: Client-side Only (generated and stored in Pinia `useSessionStore`).
- Q: How should mockup colors (#0D3878, #5EC8F2) be handled? → A: Unified Interface (mockup colors mapped to `primary` and `cyan` tokens).

## Context & Problem

Une fois le patient identifié, le praticien doit renseigner les informations cliniques nécessaires à l'analyse ARIA avant de lancer le traitement vidéo. Ces données constituent le contexte fourni au LLM ARIA-ft pour générer un protocole de rééducation personnalisé. Sans ces informations (pathologie, chaussure, vidéos), l'agent ne peut ni corréler les anomalies biomécaniques à la blessure, ni générer d'alerte équipement pertinente.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Vérification et complétion du profil patient (Priority: P1)

En tant que praticien, je veux vérifier et compléter les données anthropométriques du patient (âge, taille, poids, kilométrage), afin de fournir un contexte précis à l'analyse.

**Acceptance Scenarios**:
1. **Given** l'ID Patient est affiché, **When** je tente de le modifier, **Then** le champ reste en lecture seule.
2. **Given** les champs âge, taille, poids et km/semaine, **When** je saisis des valeurs négatives, **Then** la validation bloque la soumission.
3. **Given** les 4 niveaux de pratique, **When** je sélectionne "Intermédiaire", **Then** la valeur est surlignée avec le style Cyan défini (`#5EC8F2`).

---

### User Story 2 - Saisie de la pathologie déclarée (Priority: P1)

En tant que praticien, je veux renseigner la pathologie du patient, son côté atteint et la sévérité estimée, afin qu'ARIA cible son analyse sur les anomalies biomécaniques correspondantes.

**Acceptance Scenarios**:
1. **Given** la liste des pathologies, **When** je sélectionne "Lombalgie", **Then** le badge dans la barre latérale affiche "Lombalgie" en temps réel.
2. **Given** la sélection du côté et de la sévérité, **When** je change de valeur, **Then** le store de session est mis à jour immédiatement.

---

### User Story 3 - Téléchargement des vidéos d'analyse (Priority: P1)

En tant que praticien, je veux déposer les deux vidéos de la session (sagittale + postérieure), afin qu'ARIA puisse les analyser après soumission du formulaire.

**Acceptance Scenarios**:
1. **Given** aucune vidéo déposée, **When** je regarde le bouton "Lancer l'analyse ARIA", **Then** il est désactivé (opacité 50%).
2. **Given** le dépôt de la vidéo sagittale, **When** le fichier est accepté, **Then** l'icône de dépôt est remplacée par une icône de succès et le bouton "Lancer" devient actif.
3. **Given** une vidéo postérieure optionnelle, **When** je ne la dépose pas, **Then** je peux toujours lancer l'analyse si la sagittale est présente.

---

### User Story 4 - Renseignement du profil chaussure (Priority: P2)

En tant que praticien, je veux saisir les caractéristiques de la chaussure du patient, afin qu'ARIA puisse détecter une incompatibilité équipement avec la pathologie déclarée.

**Acceptance Scenarios**:
1. **Given** le formulaire chaussure, **When** je ne remplis aucun champ, **Then** je peux toujours lancer l'analyse (l'alerte équipement sera simplement désactivée).

---

### User Story 5 - Connexion aux données d'entraînement (Priority: P3)

En tant que praticien, je veux connecter le compte Strava ou Garmin du patient, afin qu'ARIA contextualise l'analyse avec la charge d'entraînement récente.

**Acceptance Scenarios**:
1. **Given** les boutons Strava/Garmin, **When** je clique sur "Connecter", **Then** le bouton passe à l'état "Connecté ✓" (fond Cyan) sans quitter l'application (simulation).

---

### User Story 6 - Lancement de l'analyse (Priority: P1)

En tant que praticien, je veux cliquer sur "Lancer l'analyse ARIA" pour soumettre toutes les données et déclencher le pipeline, afin de passer à l'écran de suivi en temps réel.

**Acceptance Scenarios**:
1. **Given** le formulaire complet (avec vidéo sagittale), **When** je clique sur "Lancer", **Then** je suis redirigé vers `/session/:sessionId/analysis`.
2. **Given** une saisie en cours, **When** je clique sur "Annuler", **Then** je reviens à la liste des patients et les données de session sont réinitialisées.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le système MUST préremplir les données anthropométriques depuis `usePatientsStore.activePatient` au montage.
- **FR-002**: Le système MUST interdire l'édition de l'ID Patient (lecture seule).
- **FR-003**: Le système MUST valider que l'âge, la taille, le poids et le kilométrage sont des entiers positifs.
- **FR-004**: Le système MUST proposer une liste de 6 pathologies spécifiques (Lombalgie, Tendinite rotulienne, SBIT, Périostite, Tendinite Achille, Fasciite).
- **FR-005**: Le système MUST exiger la sélection d'un fichier vidéo sagittale réel (format `.mp4`, `.mov`, `.avi`, max 2Go) conservé en mémoire pour activer le lancement.
- **FR-006**: Le système MUST permettre le dépôt optionnel d'une vidéo postérieure.
- **FR-007**: Le système MUST proposer un profil chaussure optionnel avec 7 caractéristiques techniques.
- **FR-008**: Le système MUST simuler la connexion OAuth Strava/Garmin sans stockage permanent des tokens.
- **FR-009**: Le système MUST mettre à jour le badge "Pathologie" dans la barre latérale en temps réel lors de la sélection.
- **FR-010**: Le système MUST réinitialiser le store de session lors d'un clic sur "Annuler".
- **FR-011**: Le système MUST sauvegarder l'intégralité du formulaire (contexte clinique + fichiers) dans `useSessionStore` en une seule fois au clic sur "Lancer".

### Non-Functional Requirements

- **NFR-001**: **RGPD**: Aucune donnée de session (vidéos, anthropométrie, pathologie) ne doit être persistée dans le `localStorage`.
- **NFR-002**: **Performance**: La redirection vers l'écran d'analyse après clic sur "Lancer" doit se faire en moins de 300ms.
- **NFR-003**: **Design**: L'interface doit harmoniser les couleurs `#0D3878` et `#5EC8F2` avec les tokens Tailwind du projet.

### Key Entities *(include if feature involves data)*

- **SessionContext**: Regroupe les données anthropométriques, la pathologie, les fichiers vidéo, le profil chaussure et les indicateurs de connexion externe.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% des lancements d'analyse réussis redirigent vers la route `/analysis` avec le `sessionId` correct.
- **SC-002**: Zéro donnée de session est retrouvée dans le stockage persistant du navigateur après fermeture de l'onglet.
- **SC-003**: Le bouton "Lancer" reste désactivé dans 100% des cas où la vidéo sagittale est absente.

## Assumptions

- Le `sessionId` est généré côté client ou simulé pour le MVP lors du lancement.
- La dégradation silencieuse en l'absence de données Strava/Garmin signifie que l'analyse se poursuit sans erreur.
- Les fichiers vidéo sont gérés via `URL.createObjectURL` ou stockés temporairement en mémoire vive.
- L'harmonisation des couleurs signifie l'utilisation de `primary` pour le bleu marine et d'une variante `cyan` pour le bleu clair, mappées sur les tokens de la constitution.
