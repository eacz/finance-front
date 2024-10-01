import { TopMenu } from '@/components'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='min-h-screen bg-gray-100'>
      <TopMenu />
      <div className='mt-8'>{children}</div>
    </main>
  )
}
