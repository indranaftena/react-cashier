import { useRef, useState } from "react"
import { db } from "../db"
import { ConfirmDelete } from "./ConfirmDelete"

export function EditTransaction({ hideForm, sale }) {

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [itemPrice, setItemPrice] = useState(sale.hargaSatuan)
  const [itemAmount, setItemAmount] = useState(sale.jumlah)
  const [totalPrice, setTotalPrice] = useState(sale.jumlahHarga)

  const produkRef = useRef(sale.produk)

  const [showConfirm, setShowConfirm] = useState(false)

  function handleItemPriceChange(e) {
    const price = parseInt(e.target.value)
    setItemPrice(price)
    setTotalPrice(price * itemAmount)
  }

  function handleItemAmountChange(e) {
    const amount = parseInt(e.target.value)
    setItemAmount(amount)
    setTotalPrice(itemPrice * amount)
  }

  function handleTotalPriceChange(e) {
    setTotalPrice(parseInt(e.target.value))
  }

  async function handleEdit(e) {
    e.preventDefault()

    try {
      setLoading(true)
      const respond = await db.sales.update(sale.id, {
        produk: produkRef.current.value,
        hargaSatuan: itemPrice,
        jumlah: itemAmount,
        jumlahHarga: totalPrice
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
      await db.sales.delete(sale.id)
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
        <h2 className="mb-4 text-lg font-semibold">Ubah Detail Penjualan</h2>
        <label htmlFor="produk">Nama Produk</label>
        <input type="text" id="produk" name="produk" defaultValue={sale.produk} ref={produkRef} />
        <label htmlFor="hargaSatuan">Harga Satuan</label>
        <input type="number" step="100" id="hargaSatuan" name="hargaSatuan" defaultValue={sale.hargaSatuan} onChange={handleItemPriceChange} />
        <label htmlFor="jumlah">Jumlah</label>
        <input type="number" id="jumlah" name="jumlah" defaultValue={sale.jumlah} onChange={handleItemAmountChange} />
        <label htmlFor="jumlahHarga">Sum Harga</label>
        <input type="number" step="100" id="jumlahHarga" name="jumlahHarga" value={totalPrice} onChange={handleTotalPriceChange} />
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