import { Children, useState } from 'react'
import { Navigate } from 'react-router-dom'
import MainContainer from '../share/MainContainer/MainContainer'

const ProtectedLayout = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(true)

  // Si no está autenticado, redirigir a la página de login
  if (!isAuthenticated) {
    console.log('No está autenticado')
    return <Navigate to="/login"  />
  }

  return (
    <MainContainer>
      <> 
        <h1>Protected Layout</h1>
        <p>Contenido protegido</p>
      </>
    </MainContainer>
    
    
  )
}

export default ProtectedLayout