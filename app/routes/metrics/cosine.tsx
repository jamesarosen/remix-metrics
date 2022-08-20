import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import MetricTable from '~/components/MetricTable'
import Cosine from "~/data/metrics/Cosine";

export async function loader() {
  return json(new Cosine())
}

export default function Metric() {
  const metric = useLoaderData()

  return (
    <>
    <h2>Metric: {metric.name}</h2>
    <MetricTable metric={metric} />
    </>
  )
}