import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, AuthContext } from './features/auth/context/AuthContext'
import Login from './features/auth/components/Login'
import Layout from './shared/components/Layout'
import BabiesGetAll from './features/babies/components/BabiesGetAll'
import BabyCreate from './features/babies/components/BabyCreate'
import BabyEdit from './features/babies/components/BabyEdit'
import BabyDelete from './features/babies/components/BabyDelete'
import BabyGetById from './features/babies/components/BabyGetById'
import NursesGetAll from './features/nurses/components/NursesGetAll'
import NurseCreate from './features/nurses/components/NurseCreate'
import NurseEdit from './features/nurses/components/NurseEdit'
import NurseDelete from './features/nurses/components/NurseDelete'
import NurseGetById from './features/nurses/components/NurseGetById'
import TurnsGetAll from './features/turns/components/TurnsGetAll'
import TurnCreate from './features/turns/components/TurnCreate'
import TurnEdit from './features/turns/components/TurnEdit'
import TurnDelete from './features/turns/components/TurnDelete'
import TurnGetById from './features/turns/components/TurnGetById'
import { useContext } from 'react'
import './shared/styles/global.css'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useContext(AuthContext)
  return auth?.isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" />
}

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useContext(AuthContext)
  return auth?.isAuthenticated ? <Navigate to="/" /> : <>{children}</>
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Babies Routes */}
          <Route
            path="/babies/getall"
            element={
              <PrivateRoute>
                <BabiesGetAll />
              </PrivateRoute>
            }
          />
          <Route
            path="/babies/create"
            element={
              <PrivateRoute>
                <BabyCreate />
              </PrivateRoute>
            }
          />
          <Route
            path="/babies/edit/:id"
            element={
              <PrivateRoute>
                <BabyEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/babies/delete/:id"
            element={
              <PrivateRoute>
                <BabyDelete />
              </PrivateRoute>
            }
          />
          <Route
            path="/babies/view/:id"
            element={
              <PrivateRoute>
                <BabyGetById />
              </PrivateRoute>
            }
          />

          {/* Nurses Routes */}
          <Route
            path="/nurses/getall"
            element={
              <PrivateRoute>
                <NursesGetAll />
              </PrivateRoute>
            }
          />
          <Route
            path="/nurses/create"
            element={
              <PrivateRoute>
                <NurseCreate />
              </PrivateRoute>
            }
          />
          <Route
            path="/nurses/edit/:id"
            element={
              <PrivateRoute>
                <NurseEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/nurses/delete/:id"
            element={
              <PrivateRoute>
                <NurseDelete />
              </PrivateRoute>
            }
          />
          <Route
            path="/nurses/view/:id"
            element={
              <PrivateRoute>
                <NurseGetById />
              </PrivateRoute>
            }
          />

          {/* Turns Routes */}
          <Route
            path="/turns/getall"
            element={
              <PrivateRoute>
                <TurnsGetAll />
              </PrivateRoute>
            }
          />
          <Route
            path="/turns/create"
            element={
              <PrivateRoute>
                <TurnCreate />
              </PrivateRoute>
            }
          />
          <Route
            path="/turns/edit/:id"
            element={
              <PrivateRoute>
                <TurnEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/turns/delete/:id"
            element={
              <PrivateRoute>
                <TurnDelete />
              </PrivateRoute>
            }
          />
          <Route
            path="/turns/view/:id"
            element={
              <PrivateRoute>
                <TurnGetById />
              </PrivateRoute>
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/babies/getall" />} />
          <Route path="*" element={<Navigate to="/babies/getall" />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

