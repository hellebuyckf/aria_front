# UI Contract: Refined Shoe Card

## Props

- `modelValue`: Object (Session shoe state)
- `gender`: String ("Homme" | "Femme" | "")

## Interactions

- **Brand Dropdown**:
  - Displays all unique brands.
  - Searchable.
  - Selection updates `modelValue.marque` and triggers reset of `modele` and technical fields.
- **Model Dropdown**:
  - Disabled if `gender === ""`.
  - Filtered by `modelValue.marque` AND `gender`.
  - Searchable.
  - Selection updates all `modelValue` technical fields via mapping utility.
- **"Vider" Button**:
  - Resets all shoe fields to initial state.
