# Data Model: Multipart Session Mapping

This document describes the mapping from the `useSessionStore` state to the `multipart/form-data` payload sent to `POST /api/sessions`.

## Mapping Table

| Store Field (camelCase) | Form Key (snake_case) | Type | Transformation |
|-------------------------|-----------------------|------|----------------|
| `patientId` | `patient_id` | String | |
| `videos.sagittale` | `video_sagittale` | File | Required (MP4) |
| `videos.posterieure` | `video_posterieure` | File | Optional (MP4) |
| `pathologie.type` | `pathologie_declaree` | String | |
| `profil.age` | `age` | Integer | |
| `profil.taille` | `taille_cm` | Integer | |
| `profil.poids` | `poids_kg` | Float | |
| `profil.kmSemaine` | `km_semaine` | Integer | |
| `profil.niveauPratique` | `niveau_pratique` | String | |
| `chaussure` | `profil_chaussure` | String | `JSON.stringify({ marque, drop_mm: drop })` |

## Validation Logic

- **Required**: `patient_id` and `video_sagittale`.
- **Formatting**: Integer fields should be coerced from strings if coming from text inputs.
- **Empty Values**: Optional fields with null/empty values should not be appended to `FormData` to avoid "None" or "undefined" strings on the backend.
