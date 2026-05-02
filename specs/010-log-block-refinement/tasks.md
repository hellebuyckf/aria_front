# Tasks: Log Block Refinement

**Input**: Design documents from `/specs/010-log-block-refinement/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

## Phase 1: Setup (Infrastructure)

*N/A - This feature is a surgical refinement of existing components.*

---

## Phase 2: Foundational (Blocking Prerequisites)

*N/A - Leverages existing props and state in the analysis domain.*

---

## Phase 3: User Story 1 - Optimized Log Visibility (Priority: P1)

**Goal**: Ensure the log block has a fixed height of 10 lines and automatically scrolls to show the latest entries.

**Independent Test**: Trigger multiple log entries and verify that the container maintains its height and snaps to the bottom for each new line.

- [x] T001 [US1] Set fixed container height (approx. 200px/10 lines) in `src/components/analysis/RealTimeLog.vue`
- [x] T002 [US1] Implement/Verify automatic scroll to bottom using `nextTick` and `scrollTop` in `src/components/analysis/RealTimeLog.vue`

---

## Phase 4: User Story 2 - Pastel Visual Distinctions (Priority: P2)

**Goal**: Style timestamps with a pastel yellow color for better metadata separation.

**Independent Test**: Verify that timestamps in the log panel appear in pastel yellow (`text-yellow-200`).

- [x] T003 [US2] Update timestamp text color to pastel yellow in `src/components/analysis/LogLine.vue`

---

## Phase 5: Polish & Verification

- [x] T004 Run all manual verification scenarios from `specs/010-log-block-refinement/quickstart.md`
- [x] T005 [P] Perform final build check with `npm run build`

---

## Dependencies & Execution Order

1. **User Story 1 (Phase 3)** and **User Story 2 (Phase 4)** are independent and can be implemented in any order.
2. **Polish (Phase 5)** is the final step after both refinements are complete.

## Implementation Strategy

1. **Height Calculation**: Use a fixed pixel height (e.g., `h-[200px]`) in `RealTimeLog.vue` as decided in research to ensure predictability across browsers.
2. **Color Tokens**: Stick to the ARIA v2.0 design tokens (Tailwind `yellow-200`) as specified in the data model.
