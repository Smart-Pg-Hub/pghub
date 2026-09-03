import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function TenantRoute({ children }) {
  const { isLoggedIn, user } = useContext(AuthContext)

  if (!isLoggedIn) return <Navigate to='/login' replace />

  if (user?.role !== 'TENANT') {
    return <Navigate to='/owner' replace />
  }

  return children
}

export default TenantRoute
