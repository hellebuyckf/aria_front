# Research: Analysis View UX Refinement

## Decision: Log Contrast Refinement

- **Decision**: Update the log text color from gray to white (`text-white` or `text-on-surface`).
- **Rationale**: The log container uses a very dark background (`#1a1a2e`). Gray text (`text-on-surface-variant/80`) provided insufficient contrast for some clinical users. White text ensures optimal legibility for technical monitoring.
- **Implementation**: Specifically target the message text in `LogLine.vue`.

## Decision: Manual Redirection Logic

- **Decision**: Disable the `setTimeout` currently responsible for automatic redirection to the report screen.
- **Rationale**: Clinicians reported that the 2-second auto-redirect was too fast, preventing them from reviewing the final log messages and metrics summary on the analysis screen.
- **Implementation**: Remove the `setTimeout(() => goToReport(), 2000)` from `AnalysisView.vue` while ensuring the `showReportButton` correctly triggers the visibility of the "Voir le rapport" button.

## Alternatives Considered

- **Adjustable Redirect Timer**: Considered allowing users to set a redirect delay. Rejected as unnecessarily complex for an MVP; a manual button is the most reliable way to give control back to the clinician.
