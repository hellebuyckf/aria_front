# UI Contract: Patient Analysis Report

## Main Orchestrator: `ReportView.vue`

- **Endpoint**: `GET /api/sessions/:id/report`
- **Mock Trigger**: `VITE_MOCK_API=true`

## Component Contracts

### `ReportHeader.vue`
- **Input**: `ARIAReport` object.
- **Visuals**: 5-column grid with `bg-surface-container`.

### `MetricsTable.vue`
- **Input**: `MetriqueRapport[]` array.
- **Rendering**: Maps statuses to `STATUT_STYLES`.

### `AnomaliesList.vue`
- **Input**: `Anomalie[]` array.
- **Refs**: Renders clickable indices `[n]` linking to `#sources`.

### `AlerteEquipement.vue`
- **Input**: `AlerteEquipement | null`.
- **Visibility**: Uses `v-if` to hide if null.

### `ProtocoleSection.vue`
- **Input**: `Protocole` object.
- **Structure**: Renders 3 `PhaseCard` components.
