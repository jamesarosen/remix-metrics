import type { ReactNode } from 'react'
import type { Metric } from '~/data/metrics/types'
import { createContext, useContext } from "react";
import Cosine from "~/data/metrics/Cosine";

const MetricContext = createContext<Metric>({
  name: 'MetricContext value is not set',
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
  const metric = new Cosine(start, end);
  return <MetricContext.Provider value={metric} children={children} />;
}
