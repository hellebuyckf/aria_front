# Quickstart: Multipart Session Upload

## Verification Guide

### 1. Manual Submission Test
- Start the application: `npm run dev`.
- Ensure the backend is running at `http://localhost:8000`.
- Search for a patient (e.g., "PAT-2026-042").
- Drop an MP4 video into the "Sagittale" area.
- Fill in optional profile data (Age: 35, Poids: 75).
- Click "Lancer l'analyse ARIA".

**Expected Result**:
- The browser Network tab shows a `POST /api/sessions` request.
- Request Header `Content-Type` includes `multipart/form-data; boundary=----WebKitFormBoundary...`.
- Payload contains all form parts (patient_id, video_sagittale, age, weight_kg, etc.).
- Backend returns `201 Created` with a `session_id`.
- Frontend redirects to `/session/:id/analysis`.

### 2. Error Handling Test
- Attempt submission without a video.
- **Expected Result**: "Lancer l'analyse" button is disabled or triggers a validation alert.

### 3. Shoe Profile Verification
- Add a shoe (e.g., Brooks Ghost 16, 12mm drop).
- Submit analysis.
- **Expected Result**: Form part `profil_chaussure` contains `'{"marque":"Brooks","drop_mm":12}'`.
