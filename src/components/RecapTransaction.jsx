import { useEffect, useState } from "react"

export function RecapTransaction({ sales }) {

  const [recap, setRecap] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const recapObj = {}
    let totalPriceCounter = 0
    for (let i = 0, n = sales.length; i < n; i++) {
      if (!recapObj[sales[i].produk]) {
        recapObj[sales[i].produk] = {
          jumlah: sales[i].jumlah,
          harga: sales[i].jumlahHarga
        }
      }
      else {
        recapObj[sales[i].produk].jumlah += sales[i].jumlah
        recapObj[sales[i].produk].harga += sales[i].jumlahHarga
      }
      totalPriceCounter += sales[i].jumlahHarga
    }
    const recapArray = Object.entries(recapObj).map(([produk, nilai]) => ({ produk: produk, ...nilai }))
    recapArray.sort((a, b) => (b.jumlah - a.jumlah))
    setRecap(recapArray)

    setTotalPrice(totalPriceCounter)

  }, [sales])

  return (
    <div>
      <h2 className="my-2 py-2 text-2xl font-bold">Rekapitulasi</h2>
      <div className="px-4 py-4 my-2 grid grid-cols-5 font-bold bg-rose-800 rounded-t-2xl">
        <div className="text-left col-span-3">Produk</div>
        <div className="text-left">Jumlah</div>
        <div className="text-right">Harga</div>
      </div>
      {recap.length > 0 || <div>tidak ada data</div>}
      {recap.map(({ produk, jumlah, harga }) => {
        return (
          <div key={produk} className="px-4 py-3 my-1 grid grid-cols-5 bg-[#181818]">
            <div className="text-left col-span-3">{produk}</div>
            <div className="text-left pl-2">x {jumlah}</div>
            <div className="text-right">{harga}</div>
          </div>
        )
      })}
      <div className="px-4 py-4 mt-2 mb-8 grid grid-cols-5 font-bold bg-rose-800 rounded-b-2xl">
        <div className="text-right col-span-4">Total:</div>
        <div className="text-right">{totalPrice.toLocaleString('id-ID')}</div>
      </div>
    </div>
  )
}