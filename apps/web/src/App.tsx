import { Navigate, Outlet, Route, Routes } from 'react-router'
import { Dashboard } from './pages/Dashboard'
import { PetDetail } from './pages/PetDetail'

// The page frame every route renders inside.
function Layout() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 text-left">
      <Outlet />
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pets/:petId" element={<PetDetail />} />
        {/* An unknown URL is a mistyped one, not a page worth building. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
