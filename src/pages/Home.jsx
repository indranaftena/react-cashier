import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Loader } from "../components/Loader";

function Menu({ path, text }) {
  return (
    <Link to={path}>
      <button className='py-4 my-2 w-full text-xl font-semibold bg-[#1a1a1a]'>
        {text}
      </button>
    </Link>
  )
}

export function Home() {

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false);
  const { user, logout } = useContext(AuthContext)

  const navigate = useNavigate()

  function handleLogout() {
    setMessage('')
    setLoading(true)
    logout()
    navigate("/login")
    setLoading(false)
  }

  return (
    <>
      {loading && <Loader />}
      <h1 className='text-6xl font-extrabold mb-4'><i>Cashier</i> Sederhana</h1>
      <p className=" mb-14">{user.email}</p>
      <section className='flex flex-col max-w-lg mx-auto'>
        <Menu path={'transaksi'} text={'Transaksi'} />
        <Menu path={'produk'} text={'Daftar Produk'} />
        <button className="p-4 mt-8 mx-auto w-fit text-xl font-semibold bg-orange-700"
          onClick={handleLogout}>
          Keluar (Logout)
        </button>
        {message && <p className="my-2">message</p>}
      </section>
    </>
  )
}