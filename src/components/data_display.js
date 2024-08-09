export default function DataDisplay ({ data, dataType }) {
  if (!data || !data[dataType]) return <p>No data available</p>;
  return (
    <section>
      <h1>{dataType.charAt(0).toUpperCase() + dataType.slice(1)}</h1>
      <ul>
        {data[dataType].map((item, index) => (
          <li key={index}>
            <strong>{item.date}:</strong> {item.heading}
          </li>
        ))}
      </ul>
    </section>
  )
}