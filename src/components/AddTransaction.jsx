import { useRef, useState } from "react"
import { db } from "../db"

function AddEachProduct({ deleteProductData, changeProductData, id, productsList }) {

  const [itemPrice, setItemPrice] = useState(0)
  const [itemAmount, setItemAmount] = useState(0)
  const [price, setPrice] = useState(0)

  function sumPrice(inputPrice, inputAmount) {
    const currentSumPrice = inputPrice * inputAmount
    setPrice(currentSumPrice)
    return currentSumPrice
  }

  function handleItemChange(e) {
    const itemId = parseInt(e.target.value)
    for (let i = 0; i < productsList.length; i++) {
      if (itemId === productsList[i].id) {
        const currentItemPrice = parseInt(productsList[i].harga)
        setItemPrice(currentItemPrice)
        const currentSumPrice = sumPrice(currentItemPrice, itemAmount)
        changeProductData(id, 'produk', productsList[i].produk, currentSumPrice)
        changeProductData(id, 'hargaSatuan', currentItemPrice, currentSumPrice)
        break
      }
    }
  }

  function handleAmountChange(e) {
    const amount = parseInt(e.target.value)
    setItemAmount(amount)
    const currentSumPrice = sumPrice(itemPrice, amount)
    changeProductData(id, 'jumlah', amount, currentSumPrice)
  }

  return (
    <div className="p-2 mb-2 border-2 border-teal-200 rounded-md
      grid grid-cols-4 gap-4">
      <div className="col-span-2">
        <label htmlFor="produk">Produk</label>
        <select name="produk" id="produk" onChange={handleItemChange}>
          <option value="">(pilih produk)</option>
          {productsList.map((productAvail) => {
            return (
              <option key={productAvail.id} value={productAvail.id}>{productAvail.produk}</option>
            )
          })}
        </select>
      </div>
      <div>
        <label htmlFor="jumlah">Jumlah</label>
        <input type="number" id="jumlah" name="jumlah" min="0" onChange={handleAmountChange} />
      </div>
      <div>
        <p className="text-right">Harga</p>
        <p className="text-xl text-right">{price}</p>
      </div>
      <button className="w-fit p-2 bg-orange-700" onClick={() => deleteProductData(id)}>Hapus</button>
    </div>
  )
}

export function AddTransaction({ productsList, setShowInput }) {

  const [products, setProducts] = useState([{
    id: crypto.randomUUID(),
    produk: '',
    jumlah: 0,
    hargaSatuan: 0,
    jumlahHarga: 0
  }])
  const [subTotal, setSubTotal] = useState(0)

  function addProductData() {
    setProducts((currentProducts) => {
      return [
        ...currentProducts,
        {
          id: crypto.randomUUID(),
          produk: '',
          jumlah: 0,
          hargaSatuan: 0,
          jumlahHarga: 0
        }
      ]
    })
  }

  function changeProductData(id, name, value, sumPrice) {
    setProducts(currentProducts => {
      let currentSubTotal = 0
      for (let i = currentProducts.length - 1; i >= 0; i--) {
        if (currentProducts[i].id === id) {
          currentProducts[i][name] = value
          currentProducts[i].jumlahHarga = sumPrice
          currentSubTotal += sumPrice
        }
        else {
          currentSubTotal += currentProducts[i].jumlahHarga
        }
      }
      setSubTotal(currentSubTotal)
      return currentProducts
    })
  }

  function deleteProductData(id) {
    setProducts(currentProducts => {
      return currentProducts.filter(product => product.id !== id)
    })
  }

  async function submitTransaction() {
    const salesData = products.map(({ id, ...props }) => ({ ...props, waktu: new Date() }))
    const refList = []
    try {
      for (let i = 0, n = salesData.length; i < n; i++) {
        const db_id = await db.sales.add(salesData[i])
        refList.push(db_id)
      }
    } catch (error) {
      throw error
    }
    setShowInput(false)
  }

  return (
    <div className="p-2 my-2 bg-black rounded-md relative">
      {products.map(product => <AddEachProduct key={product.id} deleteProductData={deleteProductData}
        changeProductData={changeProductData} id={product.id} productsList={productsList} />)}
      <p className="font-bold text-right">Total Harga</p>
      <p className="font-bold text-right text-xl">{subTotal}</p>
      <button className="my-4 py-2 px-4 w-full bg-green-600"
        onClick={addProductData}>
        Tambah Produk
      </button>
      <button className="my-4 py-2 px-4 w-full bg-cyan-800"
        onClick={submitTransaction}>
        Simpan
      </button>
    </div>
  )
}