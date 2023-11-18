import { useRef, useState } from "react"
import { AddProduct } from "../components/AddProduct"
import { ProductDisplay } from "../components/ProductDisplay"
import { EditProduct } from "../components/EditProduct"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../db"
import { useCSVDownloader } from "react-papaparse"
import { UploadProductsList } from "../components/UploadProductsList"

export function Products() {

  const [showForm, setShowForm] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const productRef = useRef({})

  const productsList = useLiveQuery(
    () => db.products.toArray()
  )

  const { CSVDownloader, Type } = useCSVDownloader()

  function handleClickProduct(product) {
    productRef.current.value = product
    setShowEdit(true)
  }

  if (!productsList) return null

  return (
    <>
      <h1 className="text-4xl font-extrabold mb-8">Daftar Produk</h1>
      <button className='py-4 my-2 w-full text-base font-semibold bg-lime-800'
        onClick={() => setShowForm(true)}>
        + Tambah Produk Baru
      </button>
      {showForm ? <AddProduct hideForm={setShowForm} /> : null}
      {showEdit ? <EditProduct hideForm={setShowEdit} product={productRef.current.value} /> : null}
      {productsList.length === 0
        ?
        <div>Belum ada produk</div>
        :
        productsList.map(product => {
          return (
            <div key={product.id} onClick={() => handleClickProduct(product)}>
              <ProductDisplay {...product} />
            </div>
          )
        })
      }
      {productsList.length === 0
        ?
        <UploadProductsList />
        :
        <CSVDownloader className="p-4 bg-fuchsia-900 my-4 font-bold" type={Type.Button} filename={'daftar_produk'} bom={true}
          config={{ delimiter: ';', }} data={productsList}>Download Daftar Produk</CSVDownloader>
      }
      <p><a href="https://www.flaticon.com/free-icons/drink" title="drink icons">Drink icons created by Kiranshastry - Flaticon</a></p>
      <p><a href="https://www.flaticon.com/free-icons/snack" title="snack icons">Snack icons created by monkik - Flaticon</a></p>
    </>
  )
}