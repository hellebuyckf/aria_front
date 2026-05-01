# Data Model: Shoe Dropdown Refinement

## Filtering Logic (Refined)

The `useShoeStore.search` method will be the core logic provider.

| Parameter | Source | logic |
|-----------|--------|-------|
| `brand` | `modelValue.marque` | Exact match (case insensitive) |
| `gender` | `gender` prop (mapped) | `(shoe.sexe === gender \|\| shoe.sexe === 'mixte')` |
| `query` | Input field text | `shoe.name.toLowerCase().includes(query)` |

## State Reset

When `modelValue.marque` changes:
1. `modelValue.modele` MUST be reset to `''`.
2. All technical fields (drop, stability, etc.) remain as-is or are reset? (Decision: Reset all technical fields to avoid inconsistency with the new brand).
