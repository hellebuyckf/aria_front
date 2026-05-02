# Implementation Plan: Multipart Session Upload

**Branch**: `008-fix-session-multipart` | **Date**: Thursday, April 30, 2026 | **Spec**: [specs/008-fix-session-multipart/spec.md](spec.md)
**Input**: Feature specification from `/specs/008-fix-session-multipart/spec.md`

## Summary

Migrate the `POST /api/sessions` call from a JSON payload to `multipart/form-data` to support video file uploads and complex metadata. This involves updating the `useSessionStore` to construct a `FormData` object with the correct field names and types required by the backend.

## Technical Context

**Language/Version**: JavaScript / Vue 3 (Composition API)  
**Primary Dependencies**: Axios (centralized instance), FormData API  
**Storage**: N/A (Transient session upload)  
**Testing**: Manual E2E with local backend and file selection  
**Target Platform**: Web (Desktop browsers)
**Project Type**: Web application (Frontend)  
**Performance Goals**: Support multi-megabyte video uploads without blocking UI  
**Constraints**: Do not manually set `Content-Type: multipart/form-data` (let browser handle boundary)  
**Scale/Scope**: Update `src/stores/session.js` and `src/views/SessionSetupView.vue`

## Constitution Check

| Principle | Status | Note |
|-----------|--------|------|
| I. Component Architecture | ✅ PASS | Logic remains in store; view remains orchestrator. |
| II. State Management | ✅ PASS | Store centralizes the API logic and payload construction. |
| III. Communication | ✅ PASS | Leverages centralized Axios instance (`src/services/api.js`). |
| IV. Workflow & UX | ✅ PASS | Enables the linear workflow by successfully initiating step 2. |
| V. Design System | ✅ PASS | N/A (Data/API logic focus). |

## Project Structure

### Documentation (this feature)

```text
specs/008-fix-session-multipart/
├── plan.md              # This file
├── research.md          # Axios multipart configuration
├── data-model.md        # Mapping of Session Store to FormData
├── quickstart.md        # Verification guide
└── checklists/
    └── requirements.md  # Quality checklist
```

### Source Code (repository root)

```text
src/
├── stores/
│   └── session.js       # Payload construction logic
└── services/
    └── api.js           # API communication layer
```

**Structure Decision**: Single project structure focusing on the session store and its integration with the backend API.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Manual FormData construction | Native browser API required for file uploads. | JSON cannot carry binary video data directly. |
