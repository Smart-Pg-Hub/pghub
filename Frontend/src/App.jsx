import { ToastContainer } from 'react-toastify'
import AuthProvider from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>

      <ToastContainer position='top-right' autoClose={3000} />
    </>
  )
}

export default App
