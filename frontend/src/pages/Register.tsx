import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Ejecutamos el registro en el backend
      await axios.post('http://localhost:5000/api/auth/register', {
        nombre,
        email,
        password,
      });

      // 2. Si el registro es exitoso, hacemos login automático
      const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token, user } = loginResponse.data;
      setAuth(token, user);
      navigate('/'); 
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error interno al registrar el usuario');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-onyx-dark p-4">
      <div className="bg-onyx-card p-8 rounded-2xl border border-onyx-mint/10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Crear Cuenta</h1>
        <p className="text-center text-onyx-light/70 mb-8">Únete a Onyx Study</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm text-onyx-light/70 mb-1">Nombre de Usuario</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-onyx-dark border border-onyx-mint/20 rounded-lg p-3 text-onyx-light focus:outline-none focus:border-onyx-mint transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-onyx-light/70 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-onyx-dark border border-onyx-mint/20 rounded-lg p-3 text-onyx-light focus:outline-none focus:border-onyx-mint transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-onyx-light/70 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-onyx-dark border border-onyx-mint/20 rounded-lg p-3 text-onyx-light focus:outline-none focus:border-onyx-mint transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-onyx-mint text-onyx-dark font-bold py-3 rounded-lg hover:bg-white transition-colors duration-300 mt-6"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-sm text-onyx-light/70 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-onyx-mint hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};