import { useRef } from "react"
import { loginApi } from "../api/login"

export const LoginForm = ({ setName, setToken }) => {
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const data = await loginApi(usernameRef.current.value, passwordRef.current.value)
    setName(data.username)
    setToken(data.token)
  }
  return (
    <div className="border rounded bg-white position-absolute top-50 start-50 translate-middle">
      <div className="p-4">
        <h2 className="fs-2 font-bold mb-3">Login Form</h2>
        <form onSubmit={handleOnSubmit} >
          <div className="input-group mb-3">
            <span className="input-group-text">username</span>
            <input ref={usernameRef} type="text" className="form-control" required />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">password</span>
            <input ref={passwordRef} type="password" className="form-control" required />
          </div>
          <button className="btn btn-outline-primary">決定</button>
        </form>
      </div>
    </div>
  )
}