# Research: Patient Analysis Report

## Decision: PDF Download Strategy

- **Decision**: Use `responseType: 'blob'` with Axios to fetch the PDF and `URL.createObjectURL` to trigger the browser download.
- **Rationale**: This is the most reliable way to handle authenticated binary file downloads in a SPA. It allows the frontend to manage the filename and ensures the session headers are correctly passed.

## Decision: Print CSS Implementation

- **Decision**: Implement a dedicated `@media print` block in `src/assets/main.css` to strip out navigation and interaction elements.
- **Rationale**: The clinician needs the web view to be perfectly formatted for physical paper printing. Standard Tailwind classes like `print:hidden` will be used as a primary method, supplemented by global overrides for layout adjustments (removing sidebar width, etc.).

## Decision: Progressive Rendering (Skeleton Loaders)

- **Decision**: Use a centralized `v-if="report"` state in the view to show a full-page skeleton state while fetching.
- **Rationale**: Matches the ARIA v2.0 design language and prevents "layout shift" as different sections of the complex report load.

## Alternatives Considered

- **Native Browser Print**: Considered relying on browser print alone. Rejected because the sidebar and topbar would clutter the clinical record.
- **Direct Link for PDF**: Considered a simple `<a href="...">`. Rejected due to authentication requirements and the need for custom filenames.
