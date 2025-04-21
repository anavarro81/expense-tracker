import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedLayout = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Si no está autenticado, redirigir a la página de login
  if (!isAuthenticated) {
    console.log('No está autenticado')
    return <Navigate to="/login"  />
  }

  return (
    <div>ProtectedLayout</div>
  )
}

export default ProtectedLayout