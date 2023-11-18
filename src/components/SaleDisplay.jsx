export function SaleDisplay({ waktu, produk, jumlah, jumlahHarga, id }) {
  const hour = waktu.getHours()
  const minute = waktu.getMinutes()
  return (
    <div className="my-4 p-4 grid grid-cols-5 bg-[#141414]">
      <div className="text-left">{hour}.{minute < 10 ? '0' + minute : minute}</div>
      <div className="text-left col-span-2">{produk}</div>
      <div>x {jumlah}</div>
      <div className="text-right">{jumlahHarga}</div>
    </div>
  )
}