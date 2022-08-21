import type { Metric, MetricDatum } from './types'
import secondsInRange from "~/util/secondsInRange"

export default class Cosine implements Metric {
  name = 'Cosine'

  data: Array<MetricDatum>

  constructor(start: number, end: number) {
    this.data = secondsInRange(start, end)
      .map(timestamp => ({ timestamp, value: Math.cos(timestamp) }))
  }
}