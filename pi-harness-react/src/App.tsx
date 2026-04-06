import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Home } from './pages/Home';
import { Pillars } from './pages/Pillars';
import { Skills } from './pages/Skills';
import { API } from './pages/API';
import { theme } from './theme';

function App() {
  return (
    <BrowserRouter>
      <div style={{ background: theme.colors.bg, minHeight: '100vh' }}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pillars" element={<Pillars />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/api" element={<API />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
