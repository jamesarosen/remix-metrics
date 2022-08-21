import { LineChart, Line, XAxis, YAxis } from "recharts";
import { useMetricContext } from "~/util/MetricContext";

export default function Graph() {
  const metric = useMetricContext()

  return (
    <LineChart width={500} height={300} data={metric.data}>
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
}
