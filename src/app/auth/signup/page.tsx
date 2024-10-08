import { AuthWrapper, RegisterForm } from '@/modules/auth'

export default function SignupPage() {
  return (
    <AuthWrapper title='Signup'>
      <RegisterForm />
    </AuthWrapper>
  )
}
