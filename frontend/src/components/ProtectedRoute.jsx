import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { checkToken } from '@/api/auth'
import { Loader2 } from 'lucide-react'

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('loading') // 'loading' | 'auth' | 'unauth'

  useEffect(() => {
    checkToken()
      .then(() => setStatus('auth'))
      .catch(() => setStatus('unauth'))
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    )
  }

  if (status === 'unauth') {
    return <Navigate to="/login" replace />
  }

  return children
}
