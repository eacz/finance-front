import { AuthWrapper, LoginForm } from '@/modules/auth'

export default function LoginPage() {
  return (
    <AuthWrapper title='Login'>
     <LoginForm />
    </AuthWrapper>
  )
}
