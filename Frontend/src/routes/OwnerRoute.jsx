import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function OwnerRoute({ children }) {
  const { isLoggedIn, user } = useContext(AuthContext)

  if (!isLoggedIn) return <Navigate to='/login' replace />

  if (user?.role !== 'OWNER') {
    return <Navigate to='/tenant/profile' replace />
  }

  return children
}

export default OwnerRoute
