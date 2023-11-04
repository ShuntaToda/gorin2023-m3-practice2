import { apiPath } from "./apiPath"
import { checkToken } from "./login"

export const getFieldApi = async () => {
  if (!checkToken()) {
    console.error("Not logged in")
    return
  }

  try {
    const res = await fetch(`${apiPath}/fields`, {
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