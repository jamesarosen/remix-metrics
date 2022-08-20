import type { Metric } from "~/data/metrics/types";

type HistoricalDataParams = {
  metric: Metric;
};

export default function MetricTable(params: HistoricalDataParams) {
  return (
    <table>
      <thead>
        <tr>
          <td>Timestamp</td>
          <td>Value</td>
        </tr>
      </thead>
      <tbody>
        {params.metric.data.map((entry) => (
          <tr key={entry.timestamp}>
            <td>{entry.timestamp}</td>
            <td>{entry.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
