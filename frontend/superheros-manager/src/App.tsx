import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import HeroDetails from './pages/HeroDetails';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hero/:id" element={<HeroDetails />} />
        </Routes>
      </main>
    </>
  );
}
