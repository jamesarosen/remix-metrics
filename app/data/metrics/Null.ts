import type { Metric } from '~/data/metrics/types'

const NullMetric: Metric = {
	name: 'Not Found',
	start: NaN,
	end: NaN,
	data: [],
}

export default NullMetric
