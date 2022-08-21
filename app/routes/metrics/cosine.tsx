import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import MetricTable from '~/components/MetricTable'
import Cosine from "~/data/metrics/Cosine";
import useDefaultParams from "~/util/useDefaultParams";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const start = url.searchParams.get("start");
  const end = url.searchParams.get("end");

  if (start == null || end == null) {
    return json({ name: 'Not Found', data: [] })
  }

  return json(new Cosine(parseInt(start, 10), parseInt(end, 10)))
}

/**
 * This route uses `start` and `end` query-params to define the time range for
 * the metric. This has two key benefits:
 *  1. users can share links to exactly they data they're looking at
 *  1. the server-generated data matches client data, with no risk of clock skew
 *     due to network delay
 */
export default function Metric() {
  const now = Date.now()
  const { start, end } = useDefaultParams({ start: `${now - 10000}`, end: `${now}` })
  const metric = useLoaderData()

  return (
    <>
    <h2>Metric: {metric.name}</h2>
    <MetricTable metric={metric} />
    {JSON.stringify({ start, end })}
    </>
  )
}