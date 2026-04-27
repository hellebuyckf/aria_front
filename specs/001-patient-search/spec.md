# Feature Specification: Recherche Patient

**Feature Branch**: `001-patient-search`  
**Created**: 2026-04-27  
**Status**: Draft  
**Input**: User description provided for Spec 001 — Écran Recherche Patient

## Clarifications

### Session 2026-04-27
- Q: Should the NIR search use partial (prefix) matching or full 15-digit matching? → A: Partial Search (prefix matching as you type).
- Q: Should the name search field filter by last name only or both first and last names? → A: Full Name Search (matches both first and last names).
- Q: Which format should be used for the "Dernière session" date in the table? → A: Short Date (DD/MM/YYYY).
- Q: Should the feature use real API integration or mock data for the MVP? → A: Mock Data Only (using static local files).
- Q: Where should the search state and results be managed? → A: Local Component State (Ref/Reactive only).
- Q: Should the search trigger automatically as the user types or manually via a button? → A: Automatic (Triggered after 300ms debounce).
- Q: How should the patient selection be passed to the session setup page? → A: Patient ID in Route (URL: `/session/:patientId/setup`).
- Q: What masking format should be used for the NIR in the results table? → A: Partial Mask (e.g., `1 80 ** ** *** *** **`).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Recherche par nom (Priority: P1)

En tant que praticien, je veux rechercher un patient par son nom de famille, afin de retrouver rapidement son dossier sans devoir parcourir la liste complète.

**Why this priority**: Point d'entrée critique du workflow clinique pour retrouver les dossiers existants.

**Independent Test**: Recherche d'un nom connu (ex: "MARTIN") affiche les résultats correspondants sans rechargement complet de la page.

**Acceptance Scenarios**:

1. **Given** la liste contient "MARTIN", "MARTINEZ" et "BERNARD", **When** je saisis "MART" dans le champ nom, **Then** seuls "MARTIN" et "MARTINEZ" sont affichés.
2. **Given** le champ nom est vide, **When** je vide ma recherche, **Then** les 4 patients les plus récents s'affichent par défaut.

---

### User Story 2 - Recherche par NIR (Priority: P2)

En tant que praticien, je veux rechercher un patient par son numéro de sécurité sociale (NIR), afin d'identifier sans ambiguïté un patient homonyme.

**Why this priority**: Garantit l'identification unique du patient, cruciale pour la sécurité des données de santé.

**Independent Test**: Saisie d'un NIR valide filtre la liste pour n'afficher qu'un seul patient unique.

**Acceptance Scenarios**:

1. **Given** un patient avec le NIR "1 80 01 75 001 002 03", **When** je saisis ce numéro, **Then** le dossier correspondant est l'unique résultat.
2. **Given** la saisie du NIR, **When** je tape des chiffres, **Then** des espaces sont automatiquement ajoutés pour respecter le formatage standard.

---

### User Story 3 - Sélection et lancement de session (Priority: P1)

En tant que praticien, je veux cliquer sur l'icône "run" d'un patient pour initier immédiatement une session ARIA, afin de démarrer l'analyse sans étapes superflues.

**Why this priority**: Fonctionnalité métier principale (MVP) permettant de passer à l'étape suivante du workflow ARIA.

**Independent Test**: Clic sur l'icône redirige vers la page de configuration de session avec le bon patient actif.

**Acceptance Scenarios**:

1. **Given** un résultat de recherche, **When** je clique sur `directions_run`, **Then** je suis redirigé vers `/session/:patientId/setup`.
2. **Given** un clic sur l'icône, **When** la redirection s'opère, **Then** le `activePatient` dans le store est mis à jour avec les données du patient sélectionné.

---

### User Story 4 - Création d'un nouveau patient (Priority: P2)

En tant que praticien, je veux créer un nouveau dossier patient si le patient n'existe pas, afin d'enregistrer un premier coureur sans session préalable.

**Why this priority**: Permet l'acquisition de nouveaux patients non présents dans la base.

**Independent Test**: Clic on "Nouveau patient" opens the patient creation view.

**Acceptance Scenarios**:

1. **Given** n'importe quel état de recherche, **When** je clique sur "Nouveau patient", **Then** je suis redirigé vers `/patients/new`.

---

### User Story 5 - Pagination des résultats (Priority: P3)

En tant que praticien, je veux naviguer entre les pages de résultats quand la liste dépasse 4 patients, afin de consulter l'ensemble du registre.

**Why this priority**: Confort d'utilisation et gestion des gros volumes de données patients.

**Independent Test**: Navigation entre les pages 1 et 2 met à jour le contenu du tableau.

**Acceptance Scenarios**:

1. **Given** 6 patients en base, **When** je suis sur la page 1, **Then** je vois 4 patients et les boutons de pagination sont actifs.
2. **Given** la navigation vers une autre page, **When** le clic est effectué, **Then** le tableau scrolle automatiquement vers le haut.

---

### Edge Cases

- **Aucun résultat** : Afficher un message clair "Aucun patient trouvé" et proposer la création d'un dossier.
- **Caractères spéciaux** : La recherche doit ignorer les accents et être insensible à la casse.
- **Simulated Latency** : Bien qu'utilisant des données mock, le système doit simuler un délai de chargement (ex: 500ms) pour valider l'UX des loaders.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le système MUST filtrer les patients par nom (nom et prénom) avec un debounce de 300ms.
- **FR-002**: Le système MUST formater automatiquement le NIR à la saisie (`1 00 00 00 000 000 00`).
- **FR-003**: Le système MUST supporter la recherche par NIR partiel (prefix matching) dès les premiers chiffres saisis.
- **FR-004**: Le système MUST limiter l'affichage à 4 patients par page.
- **FR-005**: Le système MUST masquer partiellement le NIR dans le tableau (format: `1 80 ** ** *** *** **`).
- **FR-006**: Le système MUST utiliser des skeleton loaders pendant la simulation du chargement.
- **FR-007**: La date de dernière session MUST être affichée au format court `JJ/MM/AAAA`.
- **FR-008**: Les données patients MUST être chargées depuis un fichier JSON local statique pour le MVP.

### Key Entities *(include if feature involves data)*

- **Patient**: Représente un coureur/patient (ID, Nom, Prénom, NIR, Dernière Session).
- **Session**: L'entité de diagnostic liée à un patient unique.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: L'affichage de la liste initiale (données mock locales) se fait en moins de 100ms.
- **SC-002**: Le filtrage local des résultats répond en moins de 50ms (hors debounce).
- **SC-003**: 100% des navigations via l'icône "run" initialisent correctement le patient actif dans le store.
- **SC-004**: Zéro fuite de donnée NIR en clair dans l'interface de liste.

## Assumptions

- Les données mock sont suffisantes pour valider l'UX en phase MVP.
- Le praticien est déjà authentifié avant d'accéder à cette vue.
- L'écran cible est un desktop (1440x900) comme défini dans la constitution.
- La recherche s'effectue en mode "AND" logique si le Nom et le NIR sont saisis.
