# Feature Specification: Log Block Refinement

**Feature Branch**: `010-log-block-refinement`  
**Created**: Thursday, April 30, 2026  
**Status**: Draft  
**Input**: User description: "dans l'ecran d'analyse, le bloc temps réel à une taille fixe 10 lignes, ensuite un assenceur s'affiche pour parcourir les logs, on voit toujours les logs les plus recent, l'ascenseur remonte automatiquement. dans ce même bloc les information de date sont en jaune pastel"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Optimized Log Visibility (Priority: P1)

As a practitioner, I want the log block to occupy a predictable space on the screen while always showing the latest processing events, so that I can monitor the analysis progress without manually managing the scrollbar.

**Why this priority**: High. Predictable layout and real-time feedback are core to the analysis monitoring experience.

**Independent Test**: Can be fully tested by triggering a sequence of logs (at least 15 entries) and verifying that only 10 lines are visible at once, with the container automatically scrolling to keep the latest entry at the bottom.

**Acceptance Scenarios**:

1. **Given** an ongoing analysis, **When** more than 10 log lines are generated, **Then** a scrollbar appears and the viewport height remains fixed at exactly 10 lines.
2. **Given** new log entries arriving, **When** the log panel updates, **Then** the container automatically scrolls to the bottom to reveal the most recent entry.

---

### User Story 2 - Pastel Visual Distinctions (Priority: P2)

As a practitioner, I want the timestamps in the log block to be visually distinct via color, so that I can easily separate metadata (time) from the actual event messages.

**Why this priority**: Medium. UX/Readability refinement.

**Independent Test**: Open the analysis view and verify that the date/time information is displayed in a pastel yellow color.

**Acceptance Scenarios**:

1. **Given** the real-time log entries, **When** displayed on screen, **Then** the timestamp section of each line uses a pastel yellow color token.

---

### Edge Cases

- **Manual Scrolling**: If a user manually scrolls up to read older logs, should auto-scroll be disabled? (Assumption: For MVP, auto-scroll will always snap to the latest entry on update as requested).
- **Variable Line Heights**: What if a log message wraps to multiple lines? (Requirement: The constraint is "10 lines". This implies a fixed-height container calculated based on line-height).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The real-time log container MUST have a fixed height equivalent to exactly 10 lines of text.
- **FR-002**: The container MUST show a vertical scrollbar only when the number of log entries exceeds the viewport capacity.
- **FR-003**: The system MUST automatically scroll the container to the bottom whenever a new log entry is added.
- **FR-004**: The timestamp information (Date/Time) MUST be styled with a pastel yellow color.

### Key Entities *(include if feature involves data)*

- **Log Entry**: Existing entity representing a system event with a timestamp and a message.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Log panel height remains constant regardless of the total number of entries (after reaching 10 lines).
- **SC-002**: Auto-scroll logic triggers within 100ms of a new event arrival.
- **SC-003**: Timestamp color contrast meets readable standards against the dark background.

## Assumptions

- **Component Context**: Assumes `RealTimeLog.vue` and `LogLine.vue` are the components being modified.
- **Color Token**: Assumes a pastel yellow token (e.g., Tailwind `yellow-200` or similar) will be used for the dates.
- **Line Height**: Assumes a standard monospace line height for the 10-line calculation.
