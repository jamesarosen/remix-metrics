import Cosine from '~/data/metrics/Cosine'
import eventStream from '~/util/eventStream'

export async function loader({ request }: { request: Request }) {
	const url = new URL(request.url)
	const start = parseInt(url.searchParams.get('since') || '', 10)

	if (isNaN(start)) {
		return new Response('Expected start to be a timestamp in milliseconds', {
			status: 422,
		})
	}

	let metric = new Cosine(start, Date.now())

	return eventStream(request, (send) => {
		const timer = setInterval(() => {
			if (metric.data.length) {
				send('metric', JSON.stringify(metric.data))
			}
			metric = new Cosine(metric.end, Date.now())
		}, 100) // 100ms to avoid skew from long JS tasks

		return () => {
			clearInterval(timer)
		}
	})
}
