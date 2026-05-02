# Quickstart: Clinical Report View

## Local Verification Guide

### 1. Verification of "In Progress" State
- Navigate to `/session/SES-BUSY/report`.
- Intercept the API call and return a 409 status.
- **Expected**: The screen shows "Analyse encore en cours".

### 2. Full Report Rendering
- Navigate to `/session/SES-TEST/report`.
- Ensure the API returns the JSON mock provided in the specification.
- **Checklist**:
    - [ ] Pathology title is bold and prominent.
    - [ ] Confidence badge color matches (Faible -> Green).
    - [ ] Abnormal metrics have the ⚠️ icon.
    - [ ] Recommendations are numbered (1, 2, 3...).
    - [ ] Disclaimer is in small text at the bottom.

### 3. PDF Download
- Click the "Télécharger le PDF" button.
- **Expected**: A new browser tab opens pointing to `http://localhost:8000/api/sessions/SES-TEST/report`.
