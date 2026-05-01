# Data Model: Patient Shoe Selection

## Shoe Reference (Database Entry)

| Field | Type | Description |
|-------|------|-------------|
| `url` | String | Source URL |
| `brand` | String | Shoe brand (e.g., Asics) |
| `name` | String | Model name (e.g., Gel-Nimbus 25) |
| `sexe` | String | Intended gender |
| `Surface` | String | Running surface |
| `Usage` | String | Frequency/Usage type |
| `Drop` | String | Heel-to-toe drop (e.g., "8 mm") |
| `Stabilité` | String | Support type (e.g., "Neutre") |
| `Dynamisme` | String | Energy return rating |
| `Amorti` | String | Cushioning level |
| `Poids` | String | Weight in grams |

## Session Shoe State (Updated)

The `chaussure` object in `useSessionStore` will maintain the same structure but will be updated by the selection logic.

| Field | UI Type | Mapping from DB |
|-------|---------|-----------------|
| `marque` | String | `brand` |
| `modele` | String | `name` |
| `drop` | Number | `Drop` (parsed integer) |
| `stabilite` | String | `Stabilité` (mapped to enum) |
| `amorti` | String | `Amorti` (mapped to enum) |
| `poidsType` | String | `Poids` (mapped to weight range) |
| `dynamisme` | String | `Dynamisme` (mapped to enum) |

## State Transitions

### Load Database
1. `useShoeStore.loadDatabase()` reads `data/chaussure_all.jsonl`.
2. Data is stored in `shoeStore.allShoes`.

### Search & Filter
1. User types in Model field.
2. `shoeStore.search(query, brand, gender)` returns filtered list.

### Select Shoe
1. User clicks a suggestion.
2. `useSessionStore.chaussure` is updated with mapped values from the selected entry.

### Clear Selection
1. User clicks "Vider".
2. `useSessionStore.resetChaussure()` sets all fields in `chaussure` to empty values.
