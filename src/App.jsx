import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { Transactions } from './pages/Transactions'
import { Login } from './pages/Login'
import { PrivateRoute } from './pages/PrivateRoute'
import { AuthProvider } from './contexts/AuthContext'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route exact path='/' Component={Home} />
              <Route exact path='/produk' Component={Products} />
              <Route exact path='/transaksi' Component={Transactions} />
            </Route>
            <Route path='/login' Component={Login} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
