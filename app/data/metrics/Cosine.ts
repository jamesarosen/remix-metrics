import type { Metric, MetricDatum } from './types'
import secondsInRange from "~/util/secondsInRange"

export default class Cosine implements Metric {
  name = 'Cosine'

  data: Array<MetricDatum>

  constructor() {
    const now = Date.now()
    this.data = secondsInRange(now - 10000, now)
      .map(timestamp => ({ timestamp, value: Math.cos(timestamp) }))
  }
}