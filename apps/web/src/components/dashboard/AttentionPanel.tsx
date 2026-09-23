import { Pill, Syringe, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router'
import type { PetDashboardResponse } from '../../api/types'
import { formatDateOnly as formatDate } from '../../dates'
import {
  collectAttention,
  describeDaysAway,
  type AttentionItem,
} from './attention'

function Row({ item }: { item: AttentionItem }) {
  const Icon = item.kind === 'immunization' ? Syringe : Pill
  const isLate = item.daysAway < 0
  const verb = item.kind === 'immunization' ? 'due' : 'ends'

  return (
    <li className="flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-line py-2 last:border-b-0">
      <Icon
        size={14}
        aria-hidden="true"
        className={`shrink-0 ${isLate ? 'text-danger' : 'text-secondary'}`}
      />
      <Link to={`/pets/${item.petId}`} className="font-semibold text-heading no-underline">
        {item.petName}
      </Link>
      <span className="text-[0.9rem]">
        {item.name} {verb} {formatDate(item.date)}
      </span>
      {/* ml-auto so the timing lines up down the right, whatever the name */}
      <span
        className={`ml-auto text-[0.75rem] font-semibold tracking-[0.04em] whitespace-nowrap uppercase text-danger`}
      >
        {describeDaysAway(item.daysAway)}
      </span>
    </li>
  )
}

export function AttentionPanel({ pets }: { pets: PetDashboardResponse[] }) {
  const items = collectAttention(pets)

  // Nothing to act on is not worth a box saying so — the stat row already
  // reports the counts.
  if (items.length === 0) return null

  return (
    <section className="mb-6 rounded-lg border border-secondary bg-secondary/9 p-4">
      <h2 className="m-0 mb-1 flex items-center gap-1.5 text-[0.8rem] font-semibold tracking-[0.04em] text-secondary uppercase">
        <TriangleAlert size={14} aria-hidden="true" />
        Needs attention
       
      </h2>

      <ul className="m-0 list-none p-0">
        {items.map((item) => (
          <Row key={item.key} item={item} />
        ))}
      </ul>
    </section>
  )
}
