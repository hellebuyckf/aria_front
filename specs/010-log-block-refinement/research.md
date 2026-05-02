# Research: Log Block Refinement

## Decision: Height Calculation (10 Lines)

- **Decision**: Set the container height using a fixed CSS value calculated as `line-height * 10`.
- **Rationale**: Clinicians need a predictable layout. The "10 lines" constraint ensures the log block doesn't push other critical components (like Metrics) off-screen on smaller displays.
- **Implementation**: Assuming a standard `text-[11px]` with `leading-relaxed` (approx. 20px line-height), the height will be set to `h-[200px]` or `max-h-[200px]`.

## Decision: Auto-Scroll Logic

- **Decision**: Use a Vue `watch` on the log entries array combined with `nextTick` to set `scrollTop = scrollHeight`.
- **Rationale**: Ensures that every time a new system event arrives, the UI instantly snaps to it, providing the requested "always see most recent" behavior.
- **Implementation**: 
  ```javascript
  watch(() => props.entries.length, () => {
    nextTick(() => {
      if (logContainer.value) {
        logContainer.value.scrollTop = logContainer.value.scrollHeight
      }
    })
  })
  ```

## Decision: Pastel Yellow Color Token

- **Decision**: Use Tailwind's `text-yellow-200` for the timestamp section.
- **Rationale**: Provides a soft, non-aggressive distinction for metadata while maintaining high contrast against the `#1a1a2e` background.
- **Alternatives considered**: `text-yellow-400` (too bright/distracting), `text-amber-200` (too orange).
