# Implementation Plan: Patient Analysis Report

**Branch**: `015-patient-analysis-report` | **Date**: Thursday, April 30, 2026 | **Spec**: [specs/015-patient-analysis-report/spec.md](spec.md)
**Input**: Feature specification from `/specs/015-patient-analysis-report/spec.md`

## Summary

Implement a comprehensive, interactive clinical report view (`ReportView.vue`) that displays biomechanical analysis results, identified anomalies, and a personalized rehabilitation protocol. The feature mirrors the official 2-page PDF report and includes a specialized print mode and PDF download capability.

## Technical Context

**Language/Version**: JavaScript / Vue 3 (Composition API)  
**Primary Dependencies**: Pinia, Axios, Tailwind CSS v4, Material Symbols  
**Storage**: N/A (Data fetched via API and held in `useReportStore`)  
**Testing**: Manual visual verification and Mock mode testing  
**Target Platform**: Web (Desktop)  
**Project Type**: Web application (Frontend)  
**Performance Goals**: Page load < 500ms, smooth skeleton transitions  
**Constraints**: sequential workflow locking (Step 3), RGPDArt. 9 disclaimer  
**Scale/Scope**: 1 View, 1 Store, 11 specialized components

## Constitution Check

| Principle | Status | Note |
|-----------|--------|------|
| I. Component Architecture | ✅ PASS | Components organized in `src/components/report/`. |
| II. State Management | ✅ PASS | Business logic centralized in `useReportStore`. |
| III. Communication | ✅ PASS | Uses centralized Axios service. |
| IV. Workflow & UX | ✅ PASS | Step 3 of the 4-stage sequential workflow. |
| V. Design System | ✅ PASS | Uses Tailwind tokens and Material Symbols. |

## Project Structure

### Documentation (this feature)

```text
specs/015-patient-analysis-report/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Print and PDF strategies
├── data-model.md        # ARIAReport interface
├── quickstart.md        # Verification guide
└── contracts/
    └── report-ui-contract.md # Component I/O specs
```

### Source Code (repository root)

```text
src/
├── components/
│   └── report/           # Specialized report components
│       ├── ReportHeader.vue
│       ├── MetricsTable.vue
│       ├── MetricRow.vue
│       ├── AnomaliesList.vue
│       ├── AnomalieCard.vue
│       ├── AlerteEquipement.vue
│       ├── ProtocoleSection.vue
│       ├── PhaseCard.vue
│       ├── ExerciceItem.vue
│       ├── SourcesList.vue
│       └── ReportFooter.vue
├── stores/
│   └── report.js         # Report data management
├── views/
│   └── ReportView.vue    # Orchestrator view
└── assets/
    └── main.css          # @media print overrides
```

**Structure Decision**: Domain-specific component grouping under `src/components/report/` to maintain the non-negotiable architectural structure while scaling the complex report UI.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Multiple child components | High visual complexity of the 2-page report. | A single giant component would be unmaintainable. |
| @media print overrides | Precise clinical formatting requirements. | Browser default print is too cluttered for a medical record. |
