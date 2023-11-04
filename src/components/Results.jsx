import { useEffect, useState } from "react"
import { getResultsApi } from "../api/result"

export const Results = () => {
  const [results, setResults] = useState([])
  useEffect(() => {
    const getResults = async () => {
      const data = await getResultsApi()
      const sortedData = data.sort((a, b) => a.time - b.time)
      const slicedData = sortedData.slice(0, 3)
      setResults(slicedData)
    }
    getResults()
  }, [])
  return (
    <div className="">
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>user</th>
            <th>block_moves</th>
            <th>time</th>
          </tr>
        </thead>
        <tbody>
          {results.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.user}</td>
              <td>{item.block_moves}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}