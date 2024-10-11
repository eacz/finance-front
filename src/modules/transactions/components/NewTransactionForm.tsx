export const NewTransactionForm = () => {
  return (
    <form className='flex flex-col mt-4'>
      <div className='flex flex-col md:flex-row w-full gap-2 justify-between mb-8'>
        <div className='w-full flex flex-col gap-4'>
          <div>
            <label className='label mb-1 md:mb-0 pr-4'>Title</label>
            <input className='input' id='inline-password' type='text' placeholder='Title' />
          </div>
          <div>
            <label className='label mb-1 md:mb-0 pr-4'>Amount</label>
            <input className='input' id='inline-password' type='number' placeholder='100.00' />
          </div>
        </div>

        <div className='w-full'>
          <label className='label mb-1 md:mb-0 pr-4'>Description</label>
          <textarea
            className='textarea'
            name='description'
            id=''></textarea>
        </div>
      </div>

      <div className='flex flex-col md:flex-row w-full gap-2 just mb-4'>
        <div className='w-full'>
          <label className="label" htmlFor=''>Type</label>
          <select className='select'>
            <option>---</option>
            <option>Income</option>
            <option>Outcome</option>
          </select>
        </div>
        <div className='w-full'>
          <label className="label" htmlFor=''>Account</label>
          <select className='select'>
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
