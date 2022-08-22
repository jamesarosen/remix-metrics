import type { MetricDatum } from '~/data/metrics/types'
import { useEffect } from 'react'

type Callback = (data: Array<MetricDatum>) => void

export default function useMetricDataStream(
	since: number,
	onNewData: Callback
) {
	useEffect(() => {
		if (since == null || isNaN(since)) {
			return
		}

		function handler(event: MessageEvent) {
			onNewData(JSON.parse(event.data))
		}

		const eventSource = new EventSource(`/metrics/cosine/stream?since=${since}`)
		eventSource.addEventListener('metric', handler)

		return () => {
			eventSource.removeEventListener('metric', handler)
		}
	}, [since, onNewData])
}
