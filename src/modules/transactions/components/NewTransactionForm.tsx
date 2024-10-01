export const NewTransactionForm = () => {
  return (
    <form className='flex flex-col mt-4'>
      <div className='flex flex-col md:flex-row w-full gap-2 justify-between mb-8'>
        <div className='w-full flex flex-col gap-4'>
          <div>
            <label className='block text-gray-500 font-bold  mb-1 md:mb-0 pr-4'>Title</label>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-secondary'
              id='inline-password'
              type='text'
              placeholder='Title'
            />
          </div>
          <div>
            <label className='block text-gray-500 font-bold  mb-1 md:mb-0 pr-4'>Amount</label>
            <input
              className='bg-gray-200  appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-secondary'
              id='inline-password'
              type='number'
              placeholder='100.00'
            />
          </div>
        </div>

        <div className='w-full'>
          <label className='block text-gray-500 font-bold  mb-1 md:mb-0 pr-4'>Description</label>
          <textarea
            className='bg-gray-200 h-full appearance-none border-2 border-gray-200 rounded w-full mb-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-secondary'
            name='description'
            id=''></textarea>
        </div>
      </div>

      <div className='flex flex-col md:flex-row w-full gap-2 just mb-4'>
        <div className='w-full'>
          <label htmlFor=''>Type</label>
          <select className='py-3 px-4 pe-9 block w-full  ounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none'>
            <option>---</option>
            <option>Income</option>
            <option>Outcome</option>
          </select>
        </div>
        <div className='w-full'>
          <label htmlFor=''>Account</label>
          <select className='py-3 px-4 pe-9 block w-full  ounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none'>
            <option>USD</option>
            <option>USDT</option>
            <option>ARS</option>
          </select>
        </div>
      </div>

      <div className='flex justify-end gap-2'>
        <button className='btn-info'>Cancel</button>
        <button className='btn-primary'>Save</button>
      </div>
    </form>
  )
}
