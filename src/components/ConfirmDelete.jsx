export function ConfirmDelete({ hideConfirm, handleDelete }) {

  function cancel(e) {
    e.preventDefault()
    hideConfirm(false)
  }

  return (
    <div className="w-screen h-screen flex flex-wrap justify-center content-center fixed inset-0
     bg-white/50 backdrop-blur-sm">
      <div className="w-[500px] p-8 bg-[#242424] rounded-md">
        <p className="mb-4 text-lg font-semibold">Yakin ingin menghapus?</p>
        <div className="my-4 flex flex-wrap justify-around font-semibold">
          <button className="py-2 w-32 bg-orange-700" onClick={handleDelete} >Hapus</button>
          <button className="py-2 w-32 bg-green-700" onClick={cancel}>
            Batal
          </button>
        </div>
      </div>
    </div>
  )
}