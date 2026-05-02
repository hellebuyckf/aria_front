# Tasks: Multipart Session Upload

**Input**: Design documents from `/specs/008-fix-session-multipart/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

## Phase 1: Foundational (Store Refactoring)

- [x] T001 [P] Refactor `lancerAnalyse` in `src/stores/session.js` to initialize a `FormData` object

---

## Phase 2: User Story 1 - Reliable Session Creation with Video (Priority: P1)

**Goal**: Successfully upload mandatory session data and video to the backend.

**Independent Test**: Submit a session with only a patient ID and sagittal video; verify a 201 response and received session ID.

- [x] T002 [US1] Append `patient_id` and `video_sagittale` (File) to the `FormData` in `src/stores/session.js`
- [x] T003 [US1] Update the Axios POST call in `src/stores/session.js` to send the `FormData` without manual `Content-Type` headers
- [x] T004 [US1] Implement basic validation in `src/views/SessionSetupView.vue` to ensure video selection before allowing submission

---

## Phase 3: User Story 2 - Comprehensive Clinical Context (Priority: P2)

**Goal**: Include optional clinical metadata and shoe profile in the upload.

**Independent Test**: Submit a full session; inspect the network request to verify all fields (age, weight, JSON-encoded shoe) are present.

- [x] T005 [P] [US2] Map and append optional fields (`age`, `poids_kg`, `taille_cm`, `km_semaine`, `niveau_pratique`, `pathologie_declaree`) to `FormData` in `src/stores/session.js`
- [x] T006 [P] [US2] Append `video_posterieure` (File) to `FormData` if available in `src/stores/session.js`
- [x] T007 [US2] Encode the shoe profile as a JSON string and append as `profil_chaussure` in `src/stores/session.js`

---

## Phase 4: Polish & Verification

- [x] T008 [P] Perform final build check with `npm run build`
- [x] T009 Run all manual verification scenarios from `specs/008-fix-session-multipart/quickstart.md`

---

## Dependencies & Execution Order

1. **Foundational (Phase 1)** is required for all subsequent phases.
2. **User Story 1 (Phase 2)** must be completed and verified to establish baseline functionality.
3. **User Story 2 (Phase 3)** can be implemented once the `FormData` pipeline is working.
4. **Polish (Phase 4)** concludes the implementation.

## Implementation Strategy

1. **Multipart Transition**: Move away from JSON immediately to avoid 422 errors during development.
2. **Field Naming**: Strictly adhere to the snake_case keys required by the backend as defined in `data-model.md`.
3. **Binary Data**: Ensure the `File` objects from `useSessionStore.videos` are passed directly without transformation.
