import MetricTable from "~/components/MetricTable";
import useDefaultParams from "~/util/useDefaultParams";
import { MetricProvider } from "~/util/MetricContext";

/**
 * This route uses `start` and `end` query-params to define the time range for
 * the metric. This has two key benefits:
 *  1. users can share links to exactly they data they're looking at
 *  1. the server-generated data matches client data, with no risk of clock skew
 *     due to network delay
 */
export default function Metric() {
  const now = Date.now();
  const { start, end } = useDefaultParams({
    start: `${now - 10000}`,
    end: `${now}`,
  });

  return (
    <MetricProvider start={parseInt(start, 10)} end={parseInt(end, 10)}>
      <MetricTable />
    </MetricProvider>
  );
}
