export const Logout = ({ removeName, removeToken }) => {
  const logout = () => {
    removeName()
    removeToken()
  }
  return (<div className="btn btn-outline-danger" onClick={logout}>logout</div>)
}