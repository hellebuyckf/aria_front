# Research: Progressive Metrics Display

## Decision: Staggered Reveal Strategy

- **Decision**: Use a local reactive array `revealedKeys` in `MetricsPreviewGrid.vue`. When a `metrics` event is received, clear the array and use a `setTimeout` loop to push keys into it every 120ms.
- **Rationale**: This provides precise control over the 120ms requirement. The `MetricCell.vue` will only display its content if its key is present in the `revealedKeys` array.
- **Animation**: Combine the staggered push with a Vue `<Transition name="fade">` inside `MetricCell.vue` for a smooth 300ms arrival.

## Decision: Posterior View Logic

- **Decision**: Treat the posterior view as a distinct visual group in the grid. If the backend payload contains the `vue_posterieure_disponible: false` flag, or if all keys in the posterior set (`pelvic_drop`, `valgus_genou`, etc.) are `null`, the entire section remains hidden.
- **Rationale**: Keeps the UI focused on actionable data.

## Alternatives Considered

- **CSS Animation Delays**: Using `animation-delay` based on index. Rejected because the metrics order is fixed but the presence of values is dynamic (non-null filtering). Logic in JS is more robust for filtering + ordering.
