import { apiPath } from "./apiPath"
import { checkToken } from "./login"

export const getResultsApi = async () => {
  if (!checkToken()) {
    console.error("Not logged in")
    return
  }

  try {
    const res = await fetch(`${apiPath}/results`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      },
    })

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`)
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()

    console.log(data)
    return data;
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const storeResultsApi = async (blockMoves, time) => {
  if (!checkToken()) {
    console.error("Not logged in")
    return
  }

  try {
    const res = await fetch(`${apiPath}/results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      },
      body: JSON.stringify({
        "block_moves": blockMoves,
        "time": time
      })
    })

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`)
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()

    console.log(data)
    return data;
  } catch (e) {
    console.error(e)
    throw e
  }
}