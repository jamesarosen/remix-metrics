export type MetricDatum = {
  timestamp: number,
  value: number,
}

export type Metric = {
  name: string,
  data: Array<MetricDatum>,
}