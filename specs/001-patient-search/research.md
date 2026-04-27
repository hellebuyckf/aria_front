# Research: Patient Search Screen

**Feature**: 001-patient-search
**Date**: 2026-04-27

## Decision: Vite 6 + Vue 3.5 Project Structure
- **Rationale**: Vue 3.5 provides improved reactive performance and better DevTools support. Vite 6 (using Rolldown) ensures ultra-fast HMR (< 50ms) and optimized production builds.
- **Alternatives considered**: Webpack 5 (too slow/legacy), NiceGUI (rejected in constitution for SPA complexity).

## Decision: Pinia 2 for State Management
- **Rationale**: Official standard for Vue 3. Supports Composition API out-of-the-box. Ideal for managing mock data during MVP phase while allowing easy migration to Axios services.
- **Alternatives considered**: Vuex (deprecated/verbose), Provide/Inject (harder to debug at scale).

## Decision: Tailwind CSS 3 + Material Symbols Outlined
- **Rationale**: Tailwind provides consistent design tokens as per ARIA constitution. Material Symbols Outlined offer a professional, clinical look.
- **Alternatives considered**: FontAwesome (heavy), Custom SVG (harder to maintain for MVP).

## Decision: Composition API (`<script setup>`)
- **Rationale**: Mandatory as per project constitution. Better type safety and code organization.
- **Alternatives considered**: Options API (forbidden).

## Decision: Debounced Local Filtering
- **Rationale**: For MVP (< 200 patients), local filtering in a computed property is instantaneous. Debounce (300ms) on input prevents excessive reactivity updates during typing.
- **Alternatives considered**: Server-side search (out of scope for MVP).

## Best Practices for NIR Formatting
- Use a watcher or an input event handler to clean and format the NIR string in real-time.
- Store the raw value (digits only) in the store, format only for display/input feedback.
- Ensure NIR is NEVER displayed in clear in the results table (only ID, Name, Last Session).
