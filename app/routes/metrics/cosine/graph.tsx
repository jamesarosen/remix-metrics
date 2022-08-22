import { LineChart, Line, Text, XAxis, YAxis } from "recharts";
import { useMetricContext } from "~/util/MetricContext";

const longTickFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
});
const shortTickFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
});

function XAxisTick({ payload: { index, value }, count, ...props }: any) {
  if (index === 0 || index === count - 1) {
    return <Text {...props}>{shortTickFormatter.format(value)}</Text>
  }

  if (index === count / 2) {
    return <Text {...props}>{longTickFormatter.format(value)}</Text>
  }

  return <></>
}

export default function Graph() {
  const metric = useMetricContext();

  return (
    <LineChart width={600} height={300} data={metric.data}>
      <XAxis
        className="stroke-black dark:stroke-white"
        dataKey="timestamp"
        interval={0}
        padding={{ left: 50, right: 50 }}
        stroke="inherit"
        tick={<XAxisTick count={metric.data.length} />}
        tickMargin={6}
      />
      <YAxis tickMargin={6} />
      <Line className="stroke-blue-900 dark:stroke-blue-100" type="monotone" dataKey="value" stroke="inherit" isAnimationActive={false} />
    </LineChart>
  );
}
