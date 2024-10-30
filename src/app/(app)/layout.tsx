import { auth } from '@/auth.config'
import { TopMenu } from '@/components'
import { redirect } from 'next/navigation'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  console.log(session?.expires);
  
  if(!session?.user || new Date() > new Date(session?.expires)  ){
    redirect('/auth/login')
  }
  return (
    <main className='min-h-screen bg-gray-100'>
      <TopMenu />
      <div className='mt-8'>{children}</div>
    </main>
  )
}
