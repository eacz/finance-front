interface Props {
  title: string
  children: React.ReactNode
}

export const AuthWrapper = ({ title, children }: Props) => {
  return (
    <div className='font-sans mt-20 md:mt-0'>
      <div className='relative min-h-screen flex flex-col sm:justify-center items-center '>
        <div className='relative sm:w-[450px]'>
          <div className='card bg-primary shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6'></div>
          <div className='card bg-secondary shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6'></div>
          <div className='relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md'>
            <label className='block mt-3 text-sm text-gray-700 text-center font-semibold'>{title}</label>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
