import { useCallback, useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { AddPetModal } from '../components/modals/AddPetModal'
import { PetCard } from '../components/dashboard/PetCard'
import { DashboardStats } from '../components/dashboard/DashboardStats'
import { getDashboard } from '../api/client'
import type { PetDashboardResponse } from '../api/types'
import { CTA_BUTTON } from '../styles'

export function Dashboard() {
  const [ownerId, setOwnerId] = useState<string | null>(null)
  const [pets, setPets] = useState<PetDashboardResponse[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingPet, setIsAddingPet] = useState(false)

  const load = useCallback(() => {
    return getDashboard()
      .then((dashboard) => {
        setOwnerId(dashboard.ownerId)
        setPets(dashboard.pets)
        setError(null)
      })
      .catch((cause: Error) => setError(cause.message))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  return (
    <div className="mx-auto w-full max-w-6xl">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="mb-6 font-heading text-[1.75rem] font-medium text-primary">Pet dashboard</h1>
        <button
          type="button"
          className={`${CTA_BUTTON} mb-6 inline-flex items-center gap-2`}
          onClick={() => setIsAddingPet(true)}
          disabled={ownerId === null}
        >
          <Plus size={18} aria-hidden="true" />
          Add Pet
        </button>
      </header>

      {!isLoading && !error && pets.length > 0 && <DashboardStats pets={pets} />}

      {isLoading && <p>Loading…</p>}
      {error && <p className="text-danger">Could not load dashboard: {error}</p>}
      {!isLoading && !error && pets.length === 0 && <p className="opacity-55">No pets yet.</p>}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
        {pets.map((pet) => (
          <PetCard key={pet.petId} pet={pet} />
        ))}
      </div>

      {/* Adding a pet is a task, not a place, so it stays a modal rather than
          becoming a route of its own. */}
      {isAddingPet && ownerId !== null && (
        <AddPetModal
          ownerId={ownerId}
          onClose={() => setIsAddingPet(false)}
          onCreated={() => {
            setIsAddingPet(false)
            void load()
          }}
        />
      )}
    </div>
  )
}
