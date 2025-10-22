export default function UnorderedList({ data }) {
  if (!data) return <></>
  return (
    <>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>{item.date}:</strong> {item.content}
          </li>
        ))}
      </ul>
    </>
  )
}
