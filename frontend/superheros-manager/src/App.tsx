import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import HeroDetails from './pages/HeroDetails';
import LoginPage from './pages/LoginPage';
import AddHero from './pages/AddHero';
import EditHero from './pages/EditHero';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {/* --- Pages principales --- */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/hero/:id" element={<HeroDetails />} />
          <Route path="/add-hero" element={<AddHero />} />
          <Route path="/hero/edit/:id" element={<EditHero />} />

          {/* --- Authentification --- */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </>
  );
}
