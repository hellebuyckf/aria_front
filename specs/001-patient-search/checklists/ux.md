# Requirements Quality Checklist: UX & Accessibility

**Purpose**: "Unit Tests for English" - Validating the quality and completeness of UX and Accessibility requirements.
**Created**: 2026-04-27
**Feature**: [specs/001-patient-search/spec.md]

## Requirement Completeness
- [ ] CHK001 - Are the exact layout dimensions and grid spacing specified for the 1440x900 desktop target? [Clarity, Spec §Assumptions]
- [ ] CHK002 - Does the spec define the loading state requirements for the pagination bar during page transitions? [Gap]
- [ ] CHK003 - Are the visual properties (color, weight) of the skeleton pulse animation explicitly defined? [Clarity, Spec §FR-006]
- [ ] CHK004 - Is the behavior of the NIR mask defined for when the input field is active/focused vs idle? [Coverage, Edge Case]

## Requirement Clarity
- [ ] CHK005 - Is the "scroll automatically toward the top" behavior quantified with duration and easing? [Clarity, Spec §US5]
- [ ] CHK006 - Does the spec define the visual distinction between a "Logical AND" result and a single field match? [Clarity, Spec §Assumptions]
- [ ] CHK007 - Is the "short date" format DD/MM/YYYY consistent with the browser's locale requirements? [Consistency, Spec §Clarifications]

## Requirement Consistency
- [ ] CHK008 - Are interaction states (hover, focus, active, disabled) defined consistently for both the 'run' icon and 'Nouveau patient' button? [Consistency, Spec §US3/US4]
- [ ] CHK009 - Do the primary action colors and typography align with the ARIA constitution's design tokens? [Consistency, Plan §Constitution]

## Accessibility & Coverage
- [ ] CHK010 - Are ARIA labels or screen-reader descriptions specified for the icon-only 'directions_run' button? [Accessibility, Gap]
- [ ] CHK011 - Is the tab order and keyboard navigation flow defined for the search form and results table? [Coverage, Accessibility]
- [ ] CHK012 - Is the color contrast ratio specified for the "Partial Mask" text (**) to ensure readability for low-vision users? [Accessibility, Spec §FR-005]
- [ ] CHK013 - Are requirements defined for "No results" visual hierarchy (e.g., placement of the "Nouveau patient" prompt)? [Coverage, Edge Case]

## Traceability
- [ ] CHK014 - Is there a measurable requirement for the debounce threshold impact on user perception? [Measurability, Spec §FR-001]
