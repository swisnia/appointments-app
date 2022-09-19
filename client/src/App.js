import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Landing, Register, Error, ProtectedRoute } from './pages'
import {
  Calendar,
  Profile,
  SharedLayout,
  Services,
  Workers,
  Settings
} from './pages/dashboard'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <SharedLayout/>
            </ProtectedRoute>}>
            <Route index element={<Calendar />} />
            <Route path='profile' element={<Profile/>} />
            <Route path='workers' element={<Workers/>} />
            <Route path='services' element={<Services/>} />
            <Route path='settings' element={<Settings/>} />
          </Route>
          <Route path="/register" element={<Register/>} /> 
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error/>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
