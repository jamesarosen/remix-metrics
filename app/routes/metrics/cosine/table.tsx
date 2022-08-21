import { useMetricContext } from "~/util/MetricContext";

export default function Table() {
  const metric = useMetricContext()

  return (
    <table>
      <thead>
        <tr><td colSpan={2}>{metric.name}</td></tr>
        <tr>
          <td>Timestamp</td>
          <td>Value</td>
        </tr>
      </thead>
      <tbody>
        {metric.data.map((entry) => (
          <tr key={entry.timestamp}>
            <td>{entry.timestamp}</td>
            <td>{entry.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
