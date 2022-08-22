import { useMetricContext } from "~/util/MetricContext";

function AlignedValue({ value }: { value: number }) {
  return <td className="font-mono">
    {value < 0 ? null : <>&#8199;</>}
    {value}
  </td>;
}

export default function Table() {
  const metric = useMetricContext();

  return (
    <table className="table-fixed border-spacing-2 w-full md:w-96 text-xs md:text-base">
      <thead>
        <tr>
          <td className="w-1/2">Timestamp</td>
          <td className="w-1/2">Value</td>
        </tr>
      </thead>
      <tbody>
        {metric.data.map((entry) => (
          <tr key={entry.timestamp}>
            <td>{entry.timestamp}</td>
            <AlignedValue value={entry.value} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
