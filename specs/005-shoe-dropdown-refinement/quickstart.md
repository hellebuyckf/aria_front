# Quickstart: Shoe Dropdown Refinement

## Implementation Steps

### 1. Update Shoe Card UI
- Implement the "Searchable Dropdown" pattern for both Brand and Model.
- Ensure the "Modèle" field is disabled until a gender is provided.

### 2. Implement Dependent Logic
- Add a watcher or event handler on "Marque" change to reset technical fields.
- Integrate gender mapping ("Homme" -> "homme") before calling store search.

## Verification

1. Start session without gender -> Verify Model is disabled.
2. Select "Femme" -> Verify Model is enabled.
3. Select "Brooks" -> Verify Model list only shows Brooks shoes.
4. Select "Ghost 16" -> Verify technical data auto-fills.
5. Change brand to "Asics" -> Verify Model and technical fields are cleared.
