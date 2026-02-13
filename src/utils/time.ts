export const timeAgo = (input: string | Date): string => {
    const date = input instanceof Date ? input : new Date(input)
    const now = new Date()

    const diffMs = now.getTime() - date.getTime()

    // Future dates or invalid
    if (isNaN(date.getTime()) || diffMs < 0) return "just now"

    const seconds = Math.floor(diffMs / 1000)
    if (seconds < 5) return "just now"
    if (seconds < 60) return `${seconds}s ago`

    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`

    const days = Math.floor(hours / 24)
    if (days < 30) return `${days}d ago`

    const months = Math.floor(days / 30)
    if (months < 12) return `${months}mo ago`

    const years = Math.floor(months / 12)
    return `${years}y ago`
}

export const timeLeft = (): string => {
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(now.getHours() + 1, 0, 0, 0);

    const diff = nextHour.getTime() - now.getTime();
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${minutes}m ${seconds}s`;
};
