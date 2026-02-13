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
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const msSinceStart = now.getTime() - startOfDay.getTime();
    const intervalMs = 20 * 60 * 1000;
    const nextIntervalMs = Math.ceil((msSinceStart + 1) / intervalMs) * intervalMs;
    const nextInterval = new Date(startOfDay.getTime() + nextIntervalMs);

    const diff = nextInterval.getTime() - now.getTime();
    const remainingMinutes = Math.floor((diff / 1000 / 60) % 60);
    const remainingSeconds = Math.floor((diff / 1000) % 60);

    return `${remainingMinutes}m ${remainingSeconds}s`;
};
