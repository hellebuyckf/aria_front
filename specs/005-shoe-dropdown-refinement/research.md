# Research: Shoe Dropdown Refinement

## Decision: Searchable Dropdown Implementation

- **Decision**: Implement the "Brand" and "Model" selects as custom searchable dropdown components rather than native `<select>`.
- **Rationale**: The shoe database contains thousands of entries and dozens of brands. A native select would be overwhelming and difficult to navigate. A custom dropdown allows for "search-as-you-type" functionality while maintaining the "dropdown" appearance requested by the user.
- **Alternatives considered**: Native `<select>` with standard filtering. Rejected due to poor UX with large datasets.

## Decision: Dependent Filtering Logic

- **Decision**: The "Model" list will be dynamically computed based on the selected "Brand" AND the "Gender" passed via props.
- **Rationale**: This fulfills the requirement for dependent dropdowns and gender-aware suggestions.
- **Implementation**: `shoeStore.search` will be used with empty query but specific brand/gender parameters when the model dropdown is opened.

## Decision: Gender Mapping Refinement

- **Decision**: Map patient gender from "Homme"/"Femme" to database keys "homme"/"femme".
- **Rationale**: The database uses lowercase "homme" and "femme". "Mixte" shoes will always be included in the results for both genders.
