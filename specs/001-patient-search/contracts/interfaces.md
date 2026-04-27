# Contracts: Patient Search

## Pinia Store: `usePatientsStore`

### State
- `list: Patient[]`
- `searchQuery: { name: string, nir: string }`
- `pagination: { page: number, perPage: number, total: number }`
- `activePatient: Patient | null`
- `loading: boolean`

### Actions
- `search(query: { name: string, nir: string }): void`
- `setActive(patient: Patient): void`
- `fetchPage(pageNumber: number): void`
- `loadMock(): void`

## UI Components

### `PatientSearchForm.vue`
- **Props**: `modelValue: { name: string, nir: string }`
- **Events**: 
  - `update:modelValue`: Sync search query
  - `search`: Trigger filtering
  - `new-patient`: Redirect to creation vue

### `PatientResultsTable.vue`
- **Props**: 
  - `patients: Patient[]` (NIR excluded)
  - `loading: boolean`
- **Events**:
  - `start-session(patient: Patient)`: Select patient and initiate workflow

### `PaginationBar.vue`
- **Props**:
  - `currentPage: number`
  - `totalPages: number`
  - `totalItems: number`
- **Events**:
  - `page-change(n: number)`
