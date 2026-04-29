# Quickstart: Patient Session Setup

## Local Development
1. Ensure the patient search feature is complete.
2. Search for a patient and click the 'run' icon to navigate to the setup view.
3. Observe the `SessionSetupView` pre-filled with the active patient's ID.

## Verification Steps
- **Field Pre-filling**: Verify that patient details are loaded from the store on mount.
- **Video Upload**: Select a dummy `.mp4` file for the Sagittal zone. Ensure the 'Launch' button enables.
- **Real-time Badge**: Select 'Lombalgie' in the pathology card and verify the sidebar badge updates to `PAT-XXX · Lombalgie`.
- **OAuth Simulation**: Click 'Connecter' on Strava and verify the state toggles to 'Connecté' after a brief delay.
- **Navigation**: Click 'Lancer l'analyse' and verify redirection to `/session/SES-XXX/analysis`.
