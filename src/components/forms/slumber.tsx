'use client'

import { Input } from '@inputs/index'
import { AddCircleIcon, MinusCircleIcon } from 'components/icons'
import { useRouter } from 'next/navigation'
import { type FormEventHandler, Fragment, useState, useTransition } from 'react'

const styles = {
  input: 'bg-transparent p-2 rounded-md focus-visible:ring-2 focus-visible:ring-blue-600',
}

export default function SlumberForm() {
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const [dreams, setDreams] = useState<number[]>([])
  const isMutating = isPending || isFetching
  const router = useRouter()

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    try {
      setIsFetching(true)
      const response = await fetch('/api/slumber', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start: form.getAll('start'),
          end: form.getAll('end'),
          rating: form.getAll('rating'),
          notes: form.getAll('notes'),
          dreamTitles: form.getAll('dreamTitle'),
          dreamRatings: form.getAll('dreamRating'),
          dreamContent: form.getAll('dreamContent'),
        }),
      })

      if (!response.ok) throw response

      startTransition(() => {
        router.refresh()
      })
    } catch (error) {
      console.error('Error occurred while fetching', error)
    } finally {
      setIsFetching(false)
    }
  }

  const removeDream = (id: number) => {
    const filtered = dreams.filter((dream) => dream !== id)
    setDreams(filtered)
  }

  const addDream = () => {
    const id = dreams.length === 0 ? 1 : dreams[dreams.length - 1] + 1
    setDreams((prev) => [...prev, id])
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="flex flex-col gap-px">
          <label htmlFor="Start">Start</label>
          <input
            disabled={isMutating}
            type="datetime-local"
            id="start"
            name="start"
            className={styles['input']}
          />
        </div>
        <div className="flex flex-col gap-px">
          <label htmlFor="end">End</label>
          <input
            disabled={isMutating}
            type="datetime-local"
            id="end"
            name="end"
            className={styles['input']}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-px">
          <label htmlFor="rating">How would you rate your sleep? J</label>
          <input
            disabled={isMutating}
            type="text"
            inputMode="numeric"
            pattern="[0-9]+"
            maxLength={2}
            minLength={1}
            id="rating"
            name="rating"
            className={styles['input']}
          />
        </div>
        <div className="flex flex-col gap-px">
          <label>Additional Notes</label>
          <input type="text" id="notes" name="notes" className={styles['input']} />
        </div>
      </div>

      {dreams.map((dream) => {
        return (
          <Fragment key={dream}>
            <DreamInput isMutating={isMutating} id={dream} removeDream={removeDream} />
          </Fragment>
        )
      })}
      <button
        className="flex flex-col items-center gap-2"
        type="button"
        onClick={addDream}
      >
        <AddCircleIcon className="w-5 h-5" />
        <span>Add Dream</span>
      </button>
      <button type="submit">Save</button>
    </form>
  )
}

type DreamInputProps = {
  id: number
  isMutating: boolean
  removeDream: (id: number) => void
}
function DreamInput({ id, removeDream, isMutating }: DreamInputProps) {
  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="flex flex-col gap-2">
        <div className="flex">
          <div className="grow flex flex-col gap-px">
            <label htmlFor="dreamTitle">Title</label>
            <input
              disabled={isMutating}
              className={styles['input']}
              type="text"
              id="dreamTitle"
              name="dreamTitle"
            />
          </div>
          <div>
            <label htmlFor="dreamRating">Rating</label>
            <input
              disabled={isMutating}
              type="text"
              inputMode="numeric"
              pattern="[0-9]+"
              maxLength={2}
              minLength={1}
              id="rating"
              name="rating"
              className={styles['input']}
            />
          </div>
        </div>
        <textarea className={styles['input']} id="dreamContent" name="dreamContent" />
      </div>
      <button type="button" onClick={() => removeDream(id)}>
        <MinusCircleIcon className="w-2 h-2" />
      </button>
    </div>
  )
}
