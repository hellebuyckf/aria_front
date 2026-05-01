# UI Contract: Patient Profile Card

## Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `patientId` | String | Yes | Displayed ID of the patient |
| `modelValue` | Object | Yes | Reactive profile data object |

## modelValue Schema

```json
{
  "age": "number | string",
  "taille": "number | string",
  "poids": "number | string",
  "sexe": "'Homme' | 'Femme' | ''",
  "kmSemaine": "number | string",
  "niveauPratique": "'debutant' | 'intermediaire' | 'avance' | 'competiteur'"
}
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `Object` | Emitted whenever a field is changed |

## Visual Components

- **Input Fields**: Age, Taille, Poids, Km/Semaine (Numeric inputs)
- **Selection Buttons (Radio behavior)**:
  - **Sexe**: Two buttons [Homme, Femme]
  - **Niveau de pratique**: Four buttons [Débutant, Intermédiaire, Avancé, Compétiteur]
