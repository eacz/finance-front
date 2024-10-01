export const TransactionFilter = () => {
  return (
    <form className='flex flex-col gap-3'>
      <div className='flex flex-row gap-2 w-full h-10'>
        <div className='flex rounded-md overflow-hidden w-full'>
          <input type='text' className='w-full rounded-md rounded-r-none border-small' />
          <button className='bg-secondary text-white px-4 font-semibold py-2 rounded-r-md '>Go</button>
        </div>
        <button className='btn-info'>Clear</button>
      </div>
      <div className='flex flex-col md:flex-row gap-4 justify-center items-center'>
        <div className='flex flex-col w-full'>
          <label htmlFor=''>Account</label>
          <select className='py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none'>
            <option>All</option>
            <option>ARS</option>
            <option>USD </option>
            <option>USDT</option>
          </select>
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor=''>Category</label>
          <select disabled className='py-3 px-4 pe-9 block w-full  rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none'>
            <option>All </option>
            <option>Clothes</option>
            <option>Food</option>
          </select>
        </div>
      </div>
    </form>
  )
}
