import { TopMenu } from '@/components'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopMenu />
      {children}
    </>
  )
}
