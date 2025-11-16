import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import HeroDetails from './pages/HeroDetails';
import LoginPage from './pages/LoginPage'; 

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {/* --- Pages principales --- */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/hero/:id" element={<HeroDetails />} />

          {/* --- Authentification --- */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </>
  );
}
