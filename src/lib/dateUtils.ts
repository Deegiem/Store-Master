// src/lib/dateUtils.ts

// Add this constant for your local timezone
const LOCAL_TIMEZONE = 'Africa/Lagos'; // Nigeria/WAT (UTC+1)

export function formatDate(dateString: string | undefined | null, format: 'short' | 'long' | 'full' = 'short'): string {
  if (!dateString) return '-'
  
  const date = new Date(dateString)
  
  switch (format) {
    case 'short':
      return date.toLocaleDateString(undefined, {
        timeZone: LOCAL_TIMEZONE,
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    case 'long':
      return date.toLocaleDateString(undefined, {
        timeZone: LOCAL_TIMEZONE,
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    case 'full':
      return date.toLocaleString(undefined, {
        timeZone: LOCAL_TIMEZONE,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false  // Use 24-hour format
      })
    default:
      return date.toLocaleDateString(undefined, {
        timeZone: LOCAL_TIMEZONE,
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
  }
}

export function formatDateRange(startDate: string | undefined | null, endDate: string | undefined | null): string {
  const start = formatDate(startDate, 'short')
  const end = formatDate(endDate, 'short')
  return `${start} — ${end}`
}

// Optional: Add a function to format full datetime with time
export function formatDateTime(dateString: string | undefined | null): string {
  if (!dateString) return '-'
  
  const date = new Date(dateString)
  return date.toLocaleString(undefined, {
    timeZone: LOCAL_TIMEZONE,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}