import type { FC } from 'react'
import ScopeBadges from './ScopeBadges'
import type { Config, SLA, Term } from '../lib/scoring'

interface Props {
  config: Config
  onChange: (cfg: Config) => void
}

const scopeOptions = [
  'SD-WAN',
  'ZTNA',
  'Web Proxy (Local Breakout)',
  'Cloud Web Proxy',
  'CASB',
  'Advanced Threat Protection',
]
const slaOptions: SLA[] = ['Bronze', 'Silver', 'Gold']
const termOptions: Term[] = [1, 3, 5]

const ControlPanel: FC<Props> = ({ config, onChange }) => {
  const toggleScope = (item: string) => {
    const selected = config.scope.includes(item)
      ? config.scope.filter((s) => s !== item)
      : [...config.scope, item]
    onChange({ ...config, scope: selected })
  }

  const update = <K extends keyof Config>(key: K, value: Config[K]) =>
    onChange({ ...config, [key]: value })

  const handleRefCommit = (checked: boolean) => {
    let incentivesPct = config.incentivesPct
    if (!checked && incentivesPct > 2) incentivesPct = 2
    onChange({ ...config, refCommit: checked, incentivesPct })
  }

  const maxIncentives = config.refCommit ? 5 : 2

  return (
    <div className="bg-white rounded shadow p-4 space-y-4">
      <div>
        <h3 className="font-semibold">Scope</h3>
        <div className="space-y-1 mt-1">
          {scopeOptions.map((s) => (
            <label key={s} className="block">
              <input
                type="checkbox"
                checked={config.scope.includes(s)}
                onChange={() => toggleScope(s)}
                className="mr-2"
              />
              {s}
            </label>
          ))}
        </div>
        <ScopeBadges selected={config.scope} />
      </div>

      <div>
        <h3 className="font-semibold">SLA</h3>
        <div className="mt-1 flex flex-col gap-1">
          {slaOptions.map((s) => (
            <label key={s} className="flex items-center">
              <input
                type="radio"
                name="sla"
                value={s}
                checked={config.sla === s}
                onChange={() => update('sla', s)}
                className="mr-2"
              />
              {s}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold">Vertragslaufzeit</h3>
        <div className="mt-1 flex flex-col gap-1">
          {termOptions.map((t) => (
            <label key={t} className="flex items-center">
              <input
                type="radio"
                name="term"
                value={t}
                checked={config.term === t}
                onChange={() => update('term', t)}
                className="mr-2"
              />
              {t} Jahr{t > 1 ? 'e' : ''}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold">Commercial Incentives</h3>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="range"
            min={0}
            max={maxIncentives}
            step={1}
            value={config.incentivesPct}
            onChange={(e) => update('incentivesPct', parseInt(e.target.value))}
            aria-label="Commercial Incentives Prozent"
            className="flex-grow"
          />
          <span className="w-8 text-sm">{config.incentivesPct}%</span>
        </div>
        <label className="block mt-1">
          <input
            type="checkbox"
            checked={config.refCommit}
            onChange={(e) => handleRefCommit(e.target.checked)}
            className="mr-2"
          />
          Referenzstory/Case Study zugesagt
        </label>
      </div>

      <div>
        <h3 className="font-semibold">Service-Abdeckung</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs">Self-Service (0)</span>
          <input
            type="range"
            min={0}
            max={100}
            value={config.serviceCoverage}
            onChange={(e) => update('serviceCoverage', parseInt(e.target.value))}
            aria-label="Service Abdeckung"
            className="flex-grow"
          />
          <span className="text-xs">Fully Managed (100)</span>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel
