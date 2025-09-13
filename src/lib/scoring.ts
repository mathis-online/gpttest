export type SLA = 'Bronze' | 'Silver' | 'Gold'
export type Term = 1 | 3 | 5

export interface Config {
  scope: string[]
  sla: SLA
  term: Term
  incentivesPct: number
  refCommit: boolean
  serviceCoverage: number
}

export const basePrice = 100

export function calculatePriceScore(cfg: Config) {
  const slaMultMap: Record<SLA, number> = { Bronze: 1, Silver: 1.05, Gold: 1.12 }
  const termMultMap: Record<Term, number> = { 1: 1, 3: 0.92, 5: 0.85 }
  const slaMult = slaMultMap[cfg.sla]
  const termMult = termMultMap[cfg.term]
  const incentivesMult = 1 - cfg.incentivesPct / 100
  const serviceMult = 0.9 + (cfg.serviceCoverage / 100) * (1.2 - 0.9)
  const priceScore = basePrice * slaMult * termMult * incentivesMult * serviceMult
  const deltaPct = ((priceScore - basePrice) / basePrice) * 100
  return { priceScore, deltaPct }
}

export function calculateExperienceScore(cfg: Config) {
  const slaExpMap: Record<SLA, number> = { Bronze: 60, Silver: 75, Gold: 90 }
  const slaExp = slaExpMap[cfg.sla]
  const serviceExp = 50 + (cfg.serviceCoverage / 100) * (100 - 50)
  return Math.round((slaExp + serviceExp) / 2)
}

export function generatePriceRecommendations(cfg: Config) {
  const recs: string[] = []
  if (cfg.term === 1) {
    recs.push('Verlängere auf 3 Jahre (mehr Rabatt, keine Experience-Änderung).')
  } else if (cfg.term === 3) {
    recs.push('Verlängere auf 5 Jahre (mehr Rabatt, keine Experience-Änderung).')
  }
  if (!cfg.refCommit) {
    recs.push('Referenzstory zusagen → mehr Incentives möglich.')
  } else if (cfg.incentivesPct < 5) {
    recs.push('Incentives auf bis zu 5 % erhöhen.')
  }
  if (cfg.sla !== 'Bronze') {
    recs.push('SLA um 1 Stufe senken (Achtung: Experience sinkt).')
  }
  if (cfg.serviceCoverage > 0) {
    recs.push('Mehr Self-Service wählen (Achtung: Experience sinkt).')
  }
  return recs.slice(0, 4)
}

export function generateExperienceRecommendations(cfg: Config) {
  const recs: string[] = []
  if (cfg.sla !== 'Gold') {
    recs.push('SLA erhöhen (Preis steigt).')
  }
  if (cfg.serviceCoverage < 100) {
    recs.push('Mehr Fully Managed (Preis steigt).')
  }
  return recs
}
