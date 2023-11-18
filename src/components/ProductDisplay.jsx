export function ProductDisplay({ produk, harga, jenis }) {
  return (
    <div className="w-full my-2 py-2 px-4 rounded-lg flex flex-wrap gap-8 items-center
    bg-gray-800 border-4 border-slate-700">
      {jenis === "minuman" ? <img src="/drink.png" /> : <img src="/snack-sm.png" />}
      <div>
        <p className="text-left text-xl font-semibold">{produk}</p>
        <p className="text-left">Rp {harga},-</p>
      </div>
    </div>
  )
}