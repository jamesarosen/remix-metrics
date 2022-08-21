import type { ReactNode } from "react";
import type { Metric } from "~/data/metrics/types";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import Cosine from "~/data/metrics/Cosine";

const MetricContext = createContext<Metric>({
  name: "MetricContext value is not set",
  data: [],
});

export function useMetricContext() {
  return useContext(MetricContext);
}

export function MetricProvider({
  start,
  end,
  children,
}: {
  start: number;
  end: number;
  children: ReactNode;
}) {
  const [metric, setMetric] = useState(new Cosine(start, end));

  useEffect(() => {
    // Only run the timer client-side
    if (typeof document === 'undefined') return

    if (isNaN(start) || isNaN(end)) return

    const timer = setTimeout(() => {
      const now = Date.now();
      const previousStart = metric.start || start
      const previousEnd = metric.end || end
      setMetric(new Cosine(previousStart + (now - previousEnd), now));
    }, 100); // 100ms to avoid skew from long JS tasks

    return () => {
      clearTimeout(timer);
    };
  }, [start, end, metric]);

  return <MetricContext.Provider value={metric} children={children} />;
}
