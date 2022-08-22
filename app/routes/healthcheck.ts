export async function loader() {
	return new Response('OK', {
		status: 200,
		headers: {
			'Cache-Control': 'no-store, no-transform',
			'Content-Type': 'text/plain',
		},
	})
}
