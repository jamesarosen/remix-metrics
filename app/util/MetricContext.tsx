import type { ReactNode } from 'react'
import type { Metric, MetricDatum } from '~/data/metrics/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createContext, useContext } from 'react'
import NullMetric from '~/data/metrics/Null'
import useMetricDataStream from './useMetricDataStream'

/**
 * This metric class accepts, rather than generates, data. It is meant
 * to be used client-side to hold data received from the server.
 */
class WindowedMetric implements Metric {
	name: string
	start: number
	end: number
	data: Array<MetricDatum>

	constructor({ name, start, end, data }: Metric) {
		this.name = name
		this.start = start
		this.end = end
		this.data = data
	}

	push(newData: Array<MetricDatum>) {
		const data = [...this.data, ...newData].slice(newData.length)
		return new WindowedMetric({
			name: this.name,
			data,
			start: data[0]?.timestamp ?? NaN,
			end: data.at(-1)?.timestamp ?? NaN,
		})
	}
}

const MetricContext = createContext<Metric>(NullMetric)

export function useMetricContext() {
	return useContext(MetricContext)
}

/**
 * Defines a React Context for a Metric.
 *
 * On the client only, this will subscribe to an event-stream of data changes
 * and update the metric as they stream in.
 */
export function MetricProvider({
	metric: initialData,
	children,
}: {
	metric: Metric
	children: ReactNode
}) {
	const initialMetric = useMemo<WindowedMetric>(
		() => new WindowedMetric(initialData),
		[initialData]
	)
	const [metric, setMetric] = useState<WindowedMetric>(initialMetric)

	// We need these hooks to fire when the _starting_ data changes, but not
	// when we get streaming updates.
	/* eslint-disable react-hooks/exhaustive-deps */
	let latestMetric = metric
	useEffect(() => {
		latestMetric = new WindowedMetric(initialData)
		setMetric(latestMetric)
	}, [initialMetric])

	const onNewData = useCallback(
		(newData: Array<MetricDatum>) => {
			latestMetric = latestMetric.push(newData)
			setMetric(latestMetric)
		},
		[initialMetric]
	)
	/* eslint-enable react-hooks/exhaustive-deps */

	useMetricDataStream(initialMetric.end, onNewData)

	return <MetricContext.Provider value={latestMetric} children={children} />
}
