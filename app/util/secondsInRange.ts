/**
 * Returns an array of integers representing the Unix timestamps at each second
 * between startTimestamp (inclusive) and endTimestamp (exclusive).
 * @param startTime
 */
export default function secondsInRange(
	startTimestamp: number,
	endTimestamp: number
): Array<number> {
	const start = Math.ceil(startTimestamp / 1000)
	const end = Math.floor(endTimestamp / 1000)
	return Array.from({ length: 1 + end - start }, (_, i) => (start + i) * 1000)
}
