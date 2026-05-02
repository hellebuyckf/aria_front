# Research: Multipart Session Upload

## Decision: FormData Construction

- **Decision**: Manually construct a `FormData` instance within the `lancerAnalyse` action of `useSessionStore`.
- **Rationale**: The backend requires a flat multipart structure where files are distinct from metadata. Standard browser `FormData` is the idiomatic way to handle this in Vue 3.
- **Implementation**: 
  ```javascript
  const fd = new FormData()
  fd.append('video_sagittale', videos.value.sagittale) // File object
  if (videos.value.posterieure) fd.append('video_posterieure', videos.value.posterieure)
  ```

## Decision: Content-Type Header

- **Decision**: Explicitly avoid setting the `Content-Type: multipart/form-data` header in the Axios call.
- **Rationale**: When Axios receives a `FormData` object as the request body, it automatically sets the correct header AND generates the unique `boundary` required for the server to parse the parts. Overriding this header manually often causes "missing boundary" errors (422/400).

## Decision: Metadata Mapping

- **Decision**: Map existing camelCase store fields to the snake_case required by the backend.
- **Rationale**: The frontend uses `kmSemaine` and `niveauPratique`, while the backend expects `km_semaine` and `niveau_pratique`.
- **Shoe Profile**: The `profil_chaussure` must be sent as a stringified JSON object: `JSON.stringify({ marque, drop_mm: drop })`.
