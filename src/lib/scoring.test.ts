import { describe, it, expect } from 'vitest'
import {
  calculatePriceScore,
  calculateExperienceScore,
  basePrice,
} from './scoring'
import type { Config } from './scoring'

const baseCfg: Config = {
  scope: [],
  sla: 'Bronze',
  term: 1,
  incentivesPct: 0,
  refCommit: false,
  serviceCoverage: 0,
}

describe('scoring', () => {
  it('Gold + 5 Jahre + 5 % + Fully Managed → Preis > 100, Experience hoch', () => {
    const cfg: Config = {
      ...baseCfg,
      sla: 'Gold',
      term: 5,
      incentivesPct: 5,
      refCommit: true,
      serviceCoverage: 100,
    }
    const { priceScore } = calculatePriceScore(cfg)
    const exp = calculateExperienceScore(cfg)
    expect(priceScore).toBeGreaterThan(basePrice)
    expect(exp).toBeGreaterThanOrEqual(85)
  })

  it('Bronze + 5 Jahre + 5 % + Self-Service → Preis deutlich < 100, Experience moderat', () => {
    const cfg: Config = {
      ...baseCfg,
      sla: 'Bronze',
      term: 5,
      incentivesPct: 5,
      refCommit: true,
      serviceCoverage: 0,
    }
    const { priceScore } = calculatePriceScore(cfg)
    const exp = calculateExperienceScore(cfg)
    expect(priceScore).toBeLessThan(80)
    expect(exp).toBeGreaterThanOrEqual(50)
    expect(exp).toBeLessThan(80)
  })

  it('Term wirkt nicht auf Experience; Scope wirkt nirgends auf Scores', () => {
    const cfg1: Config = {
      ...baseCfg,
      sla: 'Silver',
      term: 1,
      serviceCoverage: 50,
    }
    const cfg2: Config = { ...cfg1, term: 5 }
    expect(calculateExperienceScore(cfg1)).toBe(calculateExperienceScore(cfg2))
    const cfg3: Config = { ...cfg1, scope: ['SD-WAN', 'ZTNA'] }
    expect(calculatePriceScore(cfg1).priceScore).toBeCloseTo(
      calculatePriceScore(cfg3).priceScore,
    )
    expect(calculateExperienceScore(cfg1)).toBe(
      calculateExperienceScore(cfg3),
    )
  })
})
