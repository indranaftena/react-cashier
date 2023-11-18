import { useRef, useState } from "react"
import { db } from "../db"
import { ConfirmDelete } from "./ConfirmDelete"

export function EditProduct({ hideForm, product }) {

  const produkRef = useRef('')
  const hargaRef = useRef(0)
  const jenisRef = useRef('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  async function handleEdit(e) {
    e.preventDefault()

    try {
      setLoading(true)
      const respond = await db.products.update(product.id, {
        produk: produkRef.current.value,
        harga: hargaRef.current.value,
        jenis: jenisRef.current.value,
      })
      if (respond) {
        hideForm(false)
      }
    } catch (error) {
      setMessage('Gagal mengubah')
      throw error
    }
    setLoading(false)
  }

  function handleConfirm(e) {
    e.preventDefault()
    setShowConfirm(true)
  }

  async function handleDelete(e) {
    e.preventDefault()
    try {
      setLoading(true)
      await db.products.delete(product.id)
      hideForm(false)
    } catch (error) {
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
      <form className="w-[500px] p-8 bg-[#242424] rounded-md">
        <h2 className="mb-4 text-lg font-semibold">Ubah Detail Produk</h2>
        <label htmlFor="produk">Nama Produk</label>
        <input type="text" id="produk" name="produk" ref={produkRef} defaultValue={product.produk} />
        <label htmlFor="harga">Harga</label>
        <input type="number" step="100" id="harga" name="harga" ref={hargaRef} defaultValue={product.harga} />
        <label htmlFor="jenis">Jenis</label>
        <select name="jenis" id="jenis" ref={jenisRef} defaultValue={product.jenis}>
          <option value="">(pilih satu)</option>
          <option value="minuman">Minuman</option>
          <option value="snack">Snack</option>
        </select>
        {message && <div>{message}</div>}
        <div className="my-4 flex flex-wrap justify-around font-semibold">
          <button className="py-2 w-32 bg-orange-700" disabled={loading} onClick={handleConfirm}>Hapus</button>
          <button className="py-2 w-32 bg-blue-700" disabled={loading} onClick={handleEdit}>Ubah</button>
          <button className="py-2 w-32 bg-green-700" onClick={cancel}>
            Batal
          </button>
        </div>
      </form>
      {showConfirm ? <ConfirmDelete hideConfirm={setShowConfirm} handleDelete={handleDelete} /> : null}
    </div>
  )
}