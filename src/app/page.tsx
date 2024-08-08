import { Button, NextUIProvider } from '@nextui-org/react'

export default function Home() {
  return (
    <NextUIProvider>
      <main>
        <h1>Init</h1>
        <Button color='danger' size='lg' type='button'>
          Hello
        </Button>
      </main>
    </NextUIProvider>
  )
}
