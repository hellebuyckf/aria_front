# Quickstart: Patient Shoe Selection

## Implementation Steps

### 1. Create Shoe Store
- Create `src/stores/shoes.js`.
- Implement `loadDatabase()` using `fetch` or a local import (if bundled).
- Add `search` logic to filter by brand and model name.

### 2. Implement Mapping Utility
- Create a function to convert database strings like "Excellent" to internal UI IDs like "maximal".

### 3. Update Session Store
- Add `resetChaussure()` action to `src/stores/session.js`.

### 4. Refactor ProfilChaussureCard Component
- Replace the "Modèle" select with a text input.
- Implement an autocomplete dropdown using the `shoes` store.
- Bind all fields to allow manual editing (changing selects to searchable selects or ensuring they accept custom input if possible).
- Add the "Vider" button next to the title.

## Verification

1. Start a new session.
2. Type "Gel" in the model field.
3. Select "Gel-Kayano 30".
4. Verify all fields (Brand, Drop, etc.) are filled.
5. Manually change the Drop to "12".
6. Click "Vider" and verify the card is empty.
