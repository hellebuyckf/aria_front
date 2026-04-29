/**
 * Normalizes database strings from chaussure_all.jsonl to UI enum values.
 */

export function mapShoeToUI(dbShoe) {
  return {
    marque: dbShoe.brand || '',
    modele: dbShoe.name || '',
    drop: parseDrop(dbShoe.Drop),
    stabilite: mapStability(dbShoe.Stabilité),
    amorti: mapCushioning(dbShoe.Amorti),
    poidsType: mapWeight(dbShoe.Poids),
    dynamisme: mapDynamism(dbShoe.Dynamisme)
  }
}

function parseDrop(dropStr) {
  if (!dropStr) return 0
  const match = dropStr.match(/(\d+)/)
  return match ? parseInt(match[1]) : 0
}

function mapStability(dbValue) {
  if (!dbValue) return 'neutre'
  const val = dbValue.toLowerCase()
  if (val.includes('neutre')) return 'neutre'
  if (val.includes('pronation') || val.includes('stabilité')) return 'pronation'
  if (val.includes('supination')) return 'supination'
  return 'neutre'
}

function mapCushioning(dbValue) {
  if (!dbValue) return 'standard'
  const val = dbValue.toLowerCase()
  if (val.includes('excellent') || val.includes('maximal') || val.includes('très bon')) return 'maximal'
  if (val.includes('bon') || val.includes('standard')) return 'standard'
  return 'minimal'
}

function mapWeight(dbValue) {
  if (!dbValue) return 'moyen'
  const match = dbValue.match(/(\d+)/)
  if (!match) return 'moyen'
  const weight = parseInt(match[1])
  if (weight < 240) return 'leger'
  if (weight > 300) return 'lourd'
  return 'moyen'
}

function mapDynamism(dbValue) {
  if (!dbValue) return 'moyen'
  const val = dbValue.toLowerCase()
  if (val.includes('excellent') || val.includes('très bon')) return 'eleve'
  if (val.includes('bon') || val.includes('moyen')) return 'moyen'
  return 'faible'
}
