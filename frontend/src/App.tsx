import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Boveda } from './pages/Boveda';
import { Visor } from './pages/Visor';
import { Sandbox } from './pages/Sandbox';
import { Biblioteca } from './pages/Biblioteca';
import { Retos } from './pages/Retos';
import { Workspace } from './pages/Workspace';
import { ProjectHub } from './pages/ProjectHub';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/boveda" element={<Boveda />} /> {/* 2. Registrar la ruta */}
            <Route path="/visor" element={<Visor />} /> {/* Agregar esta línea */}
            <Route path="/sandbox" element={<Sandbox />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/retos" element={<Retos />} />
            <Route path="/workspace/:id" element={<Workspace />} />
            <Route path="/projectos" element={<ProjectHub />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
