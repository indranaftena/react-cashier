import Dexie from "dexie"

export const db = new Dexie('myDatabase')
db.version(1).stores({
    products: '++id, produk, harga, jenis, dibuatPada',
    sales: '++id, waktu, produk, jumlah, hargaSatuan, jumlahHarga',
})