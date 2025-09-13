import type { FC } from 'react'

interface Props {
  selected: string[]
}

const ScopeBadges: FC<Props> = ({ selected }) => {
  if (selected.length === 0) return null
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {selected.map((s) => (
        <span
          key={s}
          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
        >
          {s}
        </span>
      ))}
    </div>
  )
}

export default ScopeBadges
