import { apiPath } from "./apiPath"

export const checkToken = () => !!localStorage.getItem("token")

export const loginApi = async (username, password) => {
  if (checkToken()) {
    console.error("Already logged in")
    return
  }

  try {
    const res = await fetch(`${apiPath}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
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



export const logoutApi = async () => {
  if (!checkToken()) {
    console.error("Not logged in")
    return
  }

  try {
    const res = await fetch(`${apiPath}/auth/logout`, {
      method: "POST",
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

