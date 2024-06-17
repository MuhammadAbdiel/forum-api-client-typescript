function postedAt(date: string | number | Date): string {
  const now: Date = new Date()
  const posted: Date = new Date(date)
  const diff: number = now.getTime() - posted.getTime()
  const diffDays: number = Math.floor(diff / (1000 * 60 * 60 * 24))
  const diffHours: number = Math.floor(diff / (1000 * 60 * 60))
  const diffMinutes: number = Math.floor(diff / (1000 * 60))
  const diffSeconds: number = Math.floor(diff / 1000)

  if (diffDays > 0) {
    return `${diffDays} days ago`
  }
  if (diffHours > 0) {
    return `${diffHours} hours ago`
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} minutes ago`
  }
  if (diffSeconds > 0) {
    return `${diffSeconds} seconds ago`
  }
  return 'just now'
}

export { postedAt }
