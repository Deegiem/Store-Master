interface Props {
  page: number
  totalPages: number
  onNext: () => void
  onPrev: () => void
}

export function Pagination({ page, totalPages, onNext, onPrev }: Props) {
  return (
    <div className="flex items-center justify-between mt-4">
      <button
        disabled={page <= 1}
        onClick={onPrev}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Previous
      </button>

      <span className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={onNext}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  )
}