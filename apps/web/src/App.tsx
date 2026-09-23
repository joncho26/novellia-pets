import { Navigate, Outlet, Route, Routes } from 'react-router'
import { Dashboard } from './pages/Dashboard'
import { PetDetail } from './pages/PetDetail'
import { MedicalRecordDetail } from './pages/MedicalRecordDetail'

// The page frame every route renders inside. It sets the gutter but not the
// width: a dashboard wants to be as wide as the screen allows, while a page of
// prose and forms wants to stay narrow enough to read. Each page picks.
function Layout() {
  return (
    <main className="w-full px-4 py-8 text-left">
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
        <Route path="/medical-records/:medicalRecordId" element={<MedicalRecordDetail />} />
        {/* An unknown URL is a mistyped one, not a page worth building. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
