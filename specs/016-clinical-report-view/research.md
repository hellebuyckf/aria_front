# Research: Clinical Report View

## Decision: 409 Conflict Handling

- **Decision**: Treat the HTTP 409 status code as a specific "In Progress" state.
- **Rationale**: The `generate` endpoint might be called before the background RAG pipeline is 100% complete. Returning 409 allows the frontend to show a friendly "Analysis still in progress" message instead of a generic error.
- **Implementation**: Catch the error in the Axios call and check `error.response.status === 409`.

## Decision: PDF Export Method

- **Decision**: Use `window.open` to trigger the PDF download.
- **Rationale**: The backend returns a generated file via `GET /api/sessions/{session_id}/report`. Opening in a new tab is the standard browser behavior for downloading or viewing PDFs without disrupting the current SPA state.

## Decision: Confidence Badge Logic

- **Decision**: Map confidence levels to specific Tailwind colors using a computed map.
- **Rationale**: Ensures clinical accuracy in the visual representation of AI certainty.
- **Mapping**:
    - `élevée`: `bg-red-100 text-red-700` (Urgent/Critical attention)
    - `modérée`: `bg-orange-100 text-orange-700` (Balanced)
    - `faible`: `bg-green-100 text-green-700` (Low risk/Healthy)
