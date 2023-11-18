import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { Loader } from "../components/Loader"

export function Login() {

  const userNameRef = useRef('')
  const passwordRef = useRef('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const { user, login } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user])

  function handleSubmit(e) {
    e.preventDefault()
    setMessage('')

    if (!userNameRef.current.value || !passwordRef.current.value) {
      setMessage('Lengkapi form terlebih dahulu')
      return
    }

    setLoading(true)
    const logedUser = login(userNameRef.current.value, passwordRef.current.value)
    if (logedUser) {
      navigate("/")
    }
    setLoading(false)
  }

  return (
    <div className="w-screen h-screen absolute inset-0 flex flex-wrap flex-col justify-center content-center">
      {loading && <Loader />}
      <form className="w-full max-w-xl mb-10">
        <h1 className=" text-4xl font-bold mb-8">Masuk ke Akun</h1>
        <label htmlFor="userName">User Name</label>
        <input type="text" name="userName" id="userName" ref={userNameRef} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" ref={passwordRef} />
        {message && <div>{message}</div>}
        <button onClick={handleSubmit}
          className="w-full py-2 px-4 my-4 rounded-md bg-cyan-700">
          Masuk
        </button>
      </form>
    </div>
  )
}