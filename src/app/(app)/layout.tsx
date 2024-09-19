import { TopMenu } from '@/components'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='min-h-screen bg-gray-100'>
      <TopMenu />
      {children}
    </main>
  )
}
