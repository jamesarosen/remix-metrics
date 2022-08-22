import { Link } from '@remix-run/react'

export default function Index() {
	return (
		<>
			<p>
				This app demonstrates using{' '}
				<a href='https://remix.run/' target='_blank' rel='noreferrer'>
					Remix
				</a>
				,{' '}
				<a href='https://recharts.org/' target='_blank' rel='noreferrer'>
					Recharts
				</a>
				, and streaming data via{' '}
				<a
					href='https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream'
					target='_blank'
					rel='noreferrer'
				>
					ReadableStream
				</a>
			</p>
			<p className='mt-4'>
				It supports a single metric:{' '}
				<Link to='/metrics/cosine/table'>cosine</Link>.
			</p>
		</>
	)
}
