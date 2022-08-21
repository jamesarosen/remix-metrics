import type { Metric } from "~/data/metrics/types";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import Cosine from "~/data/metrics/Cosine";
import useDefaultParams from "~/util/useDefaultParams";
import { MetricProvider } from "~/util/MetricContext";
import NullMetric from "~/data/metrics/Null";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const start = parseInt(url.searchParams.get("start") || "", 10);
  const end = parseInt(url.searchParams.get("end") || "", 10);
  let metric: Metric;

  if (isNaN(start) || isNaN(end)) {
    metric = NullMetric;
  } else {
    metric = new Cosine(start, end);
  }

  return json(metric);
}

/**
 * This route uses `start` and `end` query-params to define the time range for
 * the metric. This has two key benefits:
 *  1. users can share links to exactly they data they're looking at
 *  1. the server-generated data matches client data, with no risk of clock skew
 *     due to network delay
 */
export default function LoadMetric() {
  const now = Date.now();
  useDefaultParams({
    start: `${now - 10000}`,
    end: `${now}`,
  });
  const data = useLoaderData();

  return (
    <MetricProvider metric={data}>
      <nav>
        <NavLink to="table">Show table</NavLink>
        <NavLink to="graph">Show graph</NavLink>
      </nav>
      <Outlet />
    </MetricProvider>
  );
}
