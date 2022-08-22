import type { Metric, MetricDatum } from './types'
import secondsInRange from '~/util/secondsInRange'

// The period, in milliseconds, of the cosine wave
const PERIOD = 10000

function value(timestamp: number): number {
	return Math.cos(((2 * Math.PI) / PERIOD) * timestamp)
}
export default class Cosine implements Metric {
	name = 'Cosine'
	start: number
	end: number
	data: Array<MetricDatum>

	constructor(start: number, end: number) {
		this.start = start
		this.end = end
		this.data = secondsInRange(start, end).map((timestamp) => ({
			timestamp,
			value: value(timestamp),
		}))
	}
}
