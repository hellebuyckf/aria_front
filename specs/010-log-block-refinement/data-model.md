# Data Model: Log Block UI State

This document describes the reactive state used to drive the Log Block refinements.

## UI State (RealTimeLog.vue)

| Field | Type | Description |
|-------|------|-------------|
| `logContainer` | Template Ref | Reference to the scrollable DOM element. |
| `entries.length`| Watcher | Triggers the auto-scroll calculation. |

## Visual Mapping (LogLine.vue)

| Section | Token | Value |
|---------|-------|-------|
| Timestamp | `text-yellow-200` | Pastel Yellow (#FEF9C3) |
| Message | `text-white` | Pure White (#FFFFFF) |
| Container BG| `bg-[#1a1a2e]` | Dark Midnight Blue |
