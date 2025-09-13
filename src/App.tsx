import { useEffect, useState } from 'react'
import ControlPanel from './components/ControlPanel'
import OutcomeCard from './components/OutcomeCard'
import {
  basePrice,
  calculateExperienceScore,
  calculatePriceScore,
  generateExperienceRecommendations,
  generatePriceRecommendations,
} from './lib/scoring'
import type { Config } from './lib/scoring'

const defaultConfig: Config = {
  scope: [],
  sla: 'Bronze',
  term: 1,
  incentivesPct: 0,
  refCommit: false,
  serviceCoverage: 0,
}

function App() {
  const [config, setConfig] = useState<Config>(() => {
    const stored = localStorage.getItem('renewal-config')
    return stored ? (JSON.parse(stored) as Config) : defaultConfig
  })

  useEffect(() => {
    localStorage.setItem('renewal-config', JSON.stringify(config))
  }, [config])

  const reset = () => setConfig(defaultConfig)

  const { priceScore, deltaPct } = calculatePriceScore(config)
  const experienceScore = calculateExperienceScore(config)
  const priceRecs = generatePriceRecommendations(config)
  const expRecs = generateExperienceRecommendations(config)

  const priceBadge = deltaPct <= 0 ? 'günstiger als Basis' : 'teurer als Basis'
  const expBadgeClass =
    experienceScore < 70
      ? 'bg-red-200 text-red-800'
      : experienceScore < 85
      ? 'bg-yellow-200 text-yellow-800'
      : 'bg-green-200 text-green-800'

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <h1 className="text-xl font-bold">Renewal Trade-off Konfigurator</h1>
        <button
          className="text-sm text-blue-600"
          onClick={reset}
        >
          Zurücksetzen
        </button>
      </header>
      <div className="p-4 lg:grid lg:grid-cols-2 gap-4">
        <ControlPanel config={config} onChange={setConfig} />
        <div className="mt-4 lg:mt-0 flex flex-col gap-4">
          <OutcomeCard title="Preis-Outcome & Kompromisse">
            <div className="mb-2">
              <div className="text-2xl font-bold">{priceScore.toFixed(2)}</div>
              <div className="text-sm">
                Preis im Vergleich zur Basis: {deltaPct.toFixed(2)}%
              </div>
              <span
                className={`inline-block mt-1 px-2 py-1 text-xs rounded ${
                  deltaPct <= 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {priceBadge}
              </span>
            </div>
            <div>
              <h3 className="font-semibold mt-2">
                Kompromisse, um den Preis weiter zu senken
              </h3>
              <ul className="list-disc list-inside text-sm">
                {priceRecs.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </OutcomeCard>

          <OutcomeCard title="Experience-Outcome & Kompromisse">
            <div className="mb-2 flex items-center gap-2">
              <div className="text-2xl font-bold">{experienceScore}</div>
              <span className={`px-2 py-1 text-xs rounded ${expBadgeClass}`}>
                {experienceScore < 70
                  ? 'Niedrig'
                  : experienceScore < 85
                  ? 'Mittel'
                  : 'Hoch'}
              </span>
            </div>
            <div>
              <h3 className="font-semibold mt-2">
                Kompromisse, um die Experience zu verbessern
              </h3>
              <ul className="list-disc list-inside text-sm">
                {expRecs.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </OutcomeCard>

          <details className="bg-white rounded shadow p-4">
            <summary className="cursor-pointer font-semibold">
              Wie werden die Scores berechnet?
            </summary>
            <div className="mt-2 text-sm space-y-2">
              <p>basePrice = {basePrice}</p>
              <p>
                Preis-Score = basePrice × slaMult × termMult × incentivesMult ×
                serviceMult
              </p>
              <p>serviceMult = 0.90 + (serviceCoverage / 100) × 0.30</p>
              <p>
                Experience-Score = Durchschnitt aus SLA- und
                Service-Abdeckung-Beitrag
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}

export default App
