import type { ReactNode } from "react";
import type { Metric } from "~/data/metrics/types";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import Cosine from "~/data/metrics/Cosine";

const MetricContext = createContext<Metric>({
  name: "MetricContext value is not set",
  data: [],
  start: NaN,
  end: NaN,
});

export function useMetricContext() {
  return useContext(MetricContext);
}

export function MetricProvider({
  metric: initialData,
  children,
}: {
  metric: Metric;
  children: ReactNode;
}) {
  const [metric, setMetric] = useState(initialData);

  useEffect(() => {
    // TODO: move this to the server and subscribe to changes via SSE
    if (isNaN(metric.start) || isNaN(metric.end)) return;

    const timer = setTimeout(() => {
      const now = Date.now();
      setMetric(new Cosine(metric.start + (now - metric.end), now));
    }, 100); // 100ms to avoid skew from long JS tasks

    return () => {
      clearTimeout(timer);
    };
  }, [metric]);

  return <MetricContext.Provider value={metric} children={children} />;
}
