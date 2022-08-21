import { LineChart, Line, XAxis, YAxis } from "recharts";
import { useMetricContext } from "~/util/MetricContext";

const X_AXIS_TICK_COUNT = 10;
const firstTickFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
});
const lastTickFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
});

function formatXAxisTick(value: string, index: number) {
  if (index === 0) {
    return firstTickFormatter.format(parseInt(value, 10));
  }

  if (index === X_AXIS_TICK_COUNT - 1) {
    return lastTickFormatter.format(parseInt(value, 10));
  }

  return "";
}

export default function Graph() {
  const metric = useMetricContext();

  return (
    <LineChart width={600} height={300} data={metric.data}>
      <XAxis
        dataKey="timestamp"
        interval={0}
        padding={{ left: 50, right: 50 }}
        tickCount={X_AXIS_TICK_COUNT}
        tickFormatter={formatXAxisTick}
      />
      <YAxis />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
}
