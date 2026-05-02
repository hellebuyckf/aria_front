# Feature Specification: Progressive Metrics Display

**Feature Branch**: `012-progressive-metrics-display`  
**Created**: Thursday, April 30, 2026  
**Status**: Draft  
**Input**: User description: "Progressive display of metrics block upon receiving a WebSocket event. Metrics appear one by one with a 120ms delay in a specific order. Posterior view is conditionally hidden."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Real-time Result Discovery (Priority: P1)

As a practitioner, I want to see the analysis metrics appear progressively on the screen rather than all at once, so that I can focus on each result as it arrives and perceive the system's "intelligence" in real-time.

**Why this priority**: Core UX enhancement that makes the analysis feel dynamic and engaging. It provides immediate visual confirmation that the backend has finished its complex calculations.

**Independent Test**: Can be tested by receiving a `metrics` WebSocket event and observing the UI as each metric row populates sequentially with a visible delay.

**Acceptance Scenarios**:

1. **Given** the analysis screen is waiting for results, **When** a `metrics` event is received, **Then** the first metric (Cadence) appears, followed by the next ones every 120ms.
2. **Given** a received payload, **When** some metrics are `null`, **Then** those metrics are skipped entirely in the progressive sequence.

---

### User Story 2 - Context-Aware Metric Layout (Priority: P2)

As a practitioner, I want the metrics grid to automatically hide sections related to the posterior view if that view was not recorded, so that the interface remains clean and relevant to the actual data available.

**Why this priority**: Prevents user confusion about "missing" data by explicitly hiding sections that aren't applicable to the current session.

**Independent Test**: Start an analysis without a posterior video and verify that the "Vue postérieure" section is either hidden or marked as "Non disponible".

**Acceptance Scenarios**:

1. **Given** a session without posterior video, **When** metrics are displayed, **Then** the posterior-specific metrics (Pelvic drop, Valgus genou, etc.) are not shown.

---

### Edge Cases

- **Multiple Metrics Events**: If the backend sends multiple `metrics` events, the UI should ideally handle the update gracefully without restarting the full 120ms sequence from scratch for already displayed values.
- **Rapid Stage Transitions**: If the analysis completes immediately after metrics are sent, the progressive display should still finish before any automatic navigation occurs.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST trigger a progressive display sequence upon receiving a WebSocket message of `type: "metrics"`.
- **FR-002**: The system MUST display metrics in the following strict order: Cadence, Angle attaque pied, Flexion genou impact, Inclinaison tronc, Oscillation verticale, Ratio contact/suspension, then posterior metrics (Pelvic drop, Valgus genou, Asymétrie charge, Oscillation latérale, Pronation).
- **FR-003**: Each visible metric MUST appear with a 120ms delay relative to the previous one.
- **FR-004**: The system MUST filter out metrics with `null` values from the display sequence.
- **FR-005**: The system MUST hide the "Vue postérieure" section if the `vue_posterieure_disponible` flag is `false` or if all posterior metrics are `null`.

### Key Entities *(include if feature involves data)*

- **Metric Object**: Contains `key`, `label`, `unite`, and `norme`.
- **Metrics Event**: WebSocket payload with `type: "metrics"` and a `metrics` data map.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Perceived latency between receiving the event and the start of the first metric appearance is under 50ms.
- **SC-002**: The full sequence for 11 metrics completes in exactly 1.32 seconds (11 * 120ms).
- **SC-003**: 100% accuracy in mapping backend keys to UI labels and units as per the provided configuration.

## Assumptions

- **Single Event Delivery**: The backend sends all available metrics in a single `metrics` type event once calculations are complete.
- **CSS Animations**: Standard CSS transitions or Vue `<TransitionGroup>` will be used for the "arrival" effect.
- **Theme Consistency**: The metrics will be styled according to the existing ARIA v2.0 design tokens.
