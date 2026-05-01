# Research: Patient Shoe Selection Integration

## Decision: Data Loading Strategy

- **Decision**: Create a `useShoeStore` to load and hold the shoe database in memory.
- **Rationale**: Pre-loading the database (approx. 2000-5000 entries usually in such files) into memory ensures instant search results and autocomplete suggestions, which is critical for clinical UX.
- **Implementation**: The store will fetch the `jsonl` file once and parse it into an array of objects.

## Decision: UI Search & Filter UX

- **Decision**: Replace the current `<select>` for "Modèle" with a searchable autocomplete input.
- **Rationale**: With thousands of shoes, a standard dropdown is unusable.
- **Logic**:
  - If a Brand is selected, filter models by that brand.
  - If letters are typed in the Model field, show matching suggestions.
  - Selecting a suggestion auto-fills all other fields (Drop, Stability, etc.).

## Decision: Manual Entry & "Vider" Button

- **Decision**: Ensure all technical fields (Drop, Poids, etc.) remain editable after auto-fill.
- **Rationale**: Allows the practitioner to correct data or enter data for shoes not in the database.
- **"Vider" Button**: A clear button will be added to the top right of the "Profil Chaussure" card, triggering a reset of the shoe object in the session store.

## Decision: Mapping Database Values to UI Options

- **Decision**: Create a mapping utility to normalize database strings (e.g., "Excellent", "Régulier") to UI enum values (e.g., "maximal", "standard").
- **Rationale**: The `jsonl` data uses descriptive French strings, while the UI components use standardized internal IDs.
