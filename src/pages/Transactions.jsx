import { useEffect, useRef, useState } from "react"
import { AddTransaction } from "../components/AddTransaction"
import { SaleDisplay } from "../components/SaleDisplay"
import { EditTransaction } from "../components/EditTransaction"
import { useLiveQuery } from "dexie-react-hooks"
import { liveQuery } from "dexie"
import { db } from "../db"
import { useCSVDownloader } from "react-papaparse"
import { RecapTransaction } from "../components/RecapTransaction"

export function Transactions() {

  const defaultDate = new Date()
  defaultDate.setHours(0, 0, 0, 0)
  const defaultDateString = defaultDate.toLocaleDateString('en-CA')

  const [showInput, setShowInput] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const [beveragesList, setBaveragesList] = useState([])
  const productsList = useLiveQuery(
    async () => {
      const productsFetched = await db.products.toArray()
      const drinksList = productsFetched.reduce((list, item) => {
        if (item.jenis === 'minuman') {
          list.push(item.produk)
        }
        return list
      }, [])
      setBaveragesList(drinksList)
      return productsFetched
    }
  )
  const [salesList, setSalesList] = useState([])
  const [date, setDate] = useState(new Date(defaultDate))
  const [totalSales, setTotalSales] = useState(0)

  const saleRef = useRef({})

  const { CSVDownloader, Type } = useCSVDownloader()

  useEffect(() => {
    const tomorrow = new Date(date)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const salesObservable = liveQuery(
      () => db.sales
        .where('waktu')
        .between(date, tomorrow)
        .toArray()            // -> remove this line if use code below
        // .reverse()         // sort list descending
        // .sortBy('waktu')   // by time added
    )

    const subscription = salesObservable.subscribe({
      next: result => {
        let currentSubTotal = 0
        for (let i = 0, n = result.length; i < n; i++) {
          if (beveragesList.includes(result[i].produk)) {
            currentSubTotal += result[i].jumlah
          }
        }
        setSalesList(result)
        setTotalSales(currentSubTotal)
      },
      error: error => console.log(error)
    })

    return () => {
      subscription.unsubscribe()
    }

  }, [date, beveragesList])

  function handleDateChange(e) {
    const inputDate = new Date(e.target.value)
    inputDate.setHours(0, 0, 0, 0)
    setDate(inputDate)
  }

  function handleClickSale(sale) {
    saleRef.current.value = sale
    setShowEdit(true)
  }

  if (!productsList) return null

  return (
    <>
      <h1 className="text-4xl font-extrabold mb-8">Transaksi</h1>
      <button className='py-4 my-2 w-full text-base font-semibold bg-lime-800'
        onClick={() => setShowInput(!showInput)}>
        {showInput ? "Batal" : "+ Tambah Transaksi Baru"}
      </button>
      {showEdit ? <EditTransaction hideForm={setShowEdit} sale={saleRef.current.value} /> : null}
      {showInput ? <AddTransaction productsList={productsList} setShowInput={setShowInput} /> : null}
      <br />
      <div className="py-2 px-4 my-4 flex flex-wrap gap-4 justify-between rounded-lg">
        <div>
          <label className="mb-2" htmlFor="date">Tanggal - (bln/tgl/th)</label>
          <input className="w-fit block" type="date" name="date" id="date" defaultValue={defaultDateString} onChange={handleDateChange} />
        </div>
        <div className="text-right">
          <p className="mb-2">Cup Terjual</p>
          <p className="text-2xl">{totalSales}</p>
        </div>
      </div>
      <RecapTransaction sales={salesList} />
      <h2 className="my-2 py-2 text-2xl font-bold">Semua Penjualan</h2>
      <div className="px-4 py-4 my-2 grid grid-cols-5 font-bold bg-sky-800 rounded-t-2xl">
        <div className="text-left">Jam</div>
        <div className="text-left col-span-2">Produk</div>
        <div>Jumlah</div>
        <div className="text-right">Harga</div>
      </div>
      <div>
        {salesList.length > 0 ? salesList.map(sale => (
          <div key={sale.id} onClick={() => handleClickSale(sale)}>
            <SaleDisplay {...sale} />
          </div>
        )) : 'tidak ada data'}
      </div>
      <div className="px-4 py-4 mt-2 mb-4 text-center font-bold bg-sky-800 rounded-b-2xl"></div>
      <CSVDownloader className="w-full p-4 bg-sky-950 rounded-xl" type={Type.Button} filename={`penjualan_${date.toLocaleDateString()}`} bom={true}
        config={{ delimiter: ';', }} data={salesList}>Download Data dalam CSV</CSVDownloader>
    </>
  )
}