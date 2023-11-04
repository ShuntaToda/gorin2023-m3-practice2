import { useEffect } from "react"
import { getFieldApi } from "../api/field"
import { Space } from "./Space"
import { Wall } from "./Wall"
import { Player } from "./Player"
import { Block } from "./Block"
import { Goal } from "./Goal"

export const Field = ({ field }) => {

  return (
    <div className="absolute left-[167px] top-[229px] w-[1044px] h-[640px] flex justify-content-center align-items-center">
      {field[0] && (
        <div className="border-8 border-black flex flex-wrap" style={{ width: `${field[0].length * 87 + 16}px` }}>
          {field.map(row => {
            return row.map(item => {
              if (item == 0) {
                return <Space />
              } else if (item == 1) {
                return <Wall />
              } else if (item == 2) {
                return <Player />
              } else if (item == 3) {
                return <Block />
              } else if (item == 4) {
                return <Goal />
              }
              console.log(item)
            })
          })}
        </div>
      )}

    </div>
  )
}