import { useEffect, useState } from "react"
import { Field } from "./Fields"
import { useLocalStrage } from "../hooks/useLocalStrage"
import { LoginForm } from "./LoginForm"
import { Logout } from "./Logout"
import { getFieldApi } from "../api/field"
import { moveBottom, moveLeft, moveRight, moveTop } from "../features/handleMove"
import { checkGoal } from "../features/checkGoal"
import { Results } from "./Results"
import { storeResultsApi } from "../api/result"

export const Main = () => {
  const [token, setToken, removeToken] = useLocalStrage("token", null)
  const [name, setName, removeName] = useLocalStrage("name", null)
  const isAuthed = !!token

  const [localField, setLocalField, removeLocalField] = useLocalStrage("field", null)
  const [localTime, setLocalTime, removeLocalTime] = useLocalStrage("time", null)
  const [localMoveBlocks, setLocalMoveBlocks, removeLocalMoveBlocks] = useLocalStrage("moveBlocks", null)

  const [isStart, setIsStart] = useState(false)
  const [field, setField] = useState([])
  const [time, setTime] = useState(0)
  const [moveBlocks, setMoveBlocks] = useState(0)

  useEffect(() => {
    const getField = async () => {
      const data = await getFieldApi()
      const topBottomWallRemovedData = data.objects.slice(1, data.objects.length - 1)
      const wallRemovedData = topBottomWallRemovedData.map(row => row.slice(1, row.length - 1))
      setField(wallRemovedData)
    }
    if (isAuthed) getField()
  }, [isAuthed])


  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      moveRight(field, setField, setMoveBlocks)
    } else if (e.key === "ArrowLeft") {
      moveLeft(field, setField, setMoveBlocks)
    } else if (e.key === "ArrowUp") {
      moveTop(field, setField, setMoveBlocks)
    } else if (e.key === "ArrowDown") {
      moveBottom(field, setField, setMoveBlocks)
    }
  }
  useEffect(() => {
    const storeResult = async (moveBlocks, time) => {
      await storeResultsApi(moveBlocks, time)
    }
    if (field[0]) {

      document.addEventListener("keydown", handleKeyDown)

      if (isStart) {

        setLocalField(field)
        setLocalTime(time)
        setLocalMoveBlocks(moveBlocks)
      }

      if (checkGoal(field)) {
        setIsStart(false)
        storeResult(moveBlocks, time)
        removeLocalField()
        removeLocalTime()
        removeLocalMoveBlocks()
      }
    }
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [field])


  const handleStart = () => {
    setIsStart(true)
  }
  useEffect(() => {
    let interval
    if (isStart) {
      interval = setInterval(() => {
        setTime(prevTime => { return prevTime += 1 })
      }, 1000)

      if (localField) {
        console.log(localField, localTime, localMoveBlocks)
        setField(localField)
        setTime(localTime)
        setMoveBlocks(localMoveBlocks)
      }
    }

    return () => clearInterval(interval)
  }, [isStart])
  return (

    <div className="inline-flex h-[868px] w-[1438px] flex-row flex-col items-start justify-start bg-white px-[19px] py-[18px]">
      <div className="Frame relative h-[832px] w-[1400px] bg-gradient-to-br from-orange-400 to-orange-400">

        <div className="Header absolute left-[583px] top-[42px] inline-flex flex-col items-center justify-start gap-[19px]">
          <div className="00 text-center font-['Inter'] text-[74.67px] font-normal text-white">{time}</div>
          <div className="Count inline-flex items-start justify-start gap-[9px]">
            <div className="text-center font-['Inter'] text-2xl font-normal text-white">移動回数:</div>
            <div className="text-center font-['Inter'] text-2xl font-normal text-white">{moveBlocks}</div>
            <div className="text-center font-['Inter'] text-2xl font-normal text-white">回</div>
          </div>
        </div>
        <div className="absolute left-[1124px] top-[68px] text-center font-['Inter'] text-base font-bold text-white">
          <div className="fs-3">{name ? name : "ゲスト"} さん</div>
          <Logout removeName={removeName} removeToken={removeToken} />
        </div>
        {isAuthed ? (
          <>
            {isStart ? <Field field={field} setField={setField} /> : (
              <div className="absolute left-[167px] top-[229px] w-[1044px] h-[640px] flex justify-content-center align-items-center flex-column">
                <Results />
                <div className="btn btn-outline-primary bg-white" onClick={handleStart}>start</div>
              </div>
            )}
          </>
        ) : <LoginForm setName={setName} setToken={setToken} />}
      </div>
    </div>
  )
}