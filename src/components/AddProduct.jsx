import { useRef, useState } from "react"
import { db } from "../db"

export function AddProduct({ hideForm }) {

  const produkRef = useRef('')
  const hargaRef = useRef(0)
  const jenisRef = useRef('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')


  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setLoading(true)
      const currentTime = new Date()
      const id = await db.products.add({
        produk: produkRef.current.value,
        harga: hargaRef.current.value,
        jenis: jenisRef.current.value,
        dibuatPada: currentTime
      })
      if (id) hideForm(false)
    } catch (error) {
      setMessage('Gagal menyimpan')
      throw error
    }
    setLoading(false)
  }

  function cancel(e) {
    e.preventDefault()
    hideForm(false)
  }

  return (
    <div className="w-screen h-screen flex flex-wrap justify-center content-center fixed inset-0
     bg-white/50 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="w-[500px] p-8 bg-[#242424] rounded-md">
        <h2 className="mb-4 text-lg font-semibold">Masukkan Detail Produk</h2>
        <label htmlFor="produk">Nama Produk</label>
        <input type="text" id="produk" name="produk" ref={produkRef} />
        <label htmlFor="harga">Harga</label>
        <input type="number" step="100" id="harga" name="harga" ref={hargaRef} />
        <label htmlFor="jenis">Jenis</label>
        <select name="jenis" id="jenis" ref={jenisRef}>
          <option value="">(pilih satu)</option>
          <option value="minuman">Minuman</option>
          <option value="snack">Snack</option>
        </select>
        {message && <div>{message}</div>}
        <div className="my-4 flex flex-wrap justify-around font-semibold">
          <button className="py-2 w-32 bg-blue-700" disabled={loading}>Tambah</button>
          <button className="py-2 w-32 bg-green-700" onClick={cancel}>
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}