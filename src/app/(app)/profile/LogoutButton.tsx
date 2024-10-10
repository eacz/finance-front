'use client';

import { logout } from '@/actions'

const LogoutButton = () => {
  const onLogout = async () => {
    await logout()
    window.location.replace('/auth/login')
  }
  return (
    <button className='btn-danger' onClick={() => onLogout()}>
      Logout
    </button>
  )
}

export default LogoutButton
