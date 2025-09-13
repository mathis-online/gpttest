import type { FC, ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
}

const OutcomeCard: FC<Props> = ({ title, children }) => (
  <div className="bg-white rounded shadow p-4">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    {children}
  </div>
)

export default OutcomeCard
