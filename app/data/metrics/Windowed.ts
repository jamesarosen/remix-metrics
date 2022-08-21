import type { Metric, MetricDatum } from "~/data/metrics/types";

/**
 * This metric class accepts, rather than generates, data. It is meant
 * to be used client-side to hold data received from the server.
 */
export default class WindowedMetric implements Metric {
  name: string;
  start: number;
  end: number;
  data: Array<MetricDatum>;

  constructor({ name, start, end, data }: Metric) {
    this.name = name;
    this.start = start;
    this.end = end;
    this.data = data;
  }

  push(newData: Array<MetricDatum>) {
    const data = [...this.data, ...newData].slice(newData.length);
    return new WindowedMetric({
      name: this.name,
      data,
      start: this.data[0]?.timestamp ?? NaN,
      end: this.data.at(-1)?.timestamp ?? NaN,
    });
  }
}
