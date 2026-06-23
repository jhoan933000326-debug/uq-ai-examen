"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [intentos, setIntentos] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bloqueado) return;

  try {
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    credentials: 'include',
  });
      if (response.ok) {
        // --- AGREGADO PARA RBAC ---
        const data = await response.json(); 
        localStorage.setItem('userRole', data.rol);
        // ---------------------------
        setIntentos(0);
        window.location.href = '/dashboard'; 
      } else {
        const mensaje = await response.text();
        const nuevosIntentos = intentos + 1;
        setIntentos(nuevosIntentos);
        if (nuevosIntentos >= 3) {
          setBloqueado(true);
          alert('Cuenta bloqueada por seguridad.');
        } else {
          alert(mensaje);
        }
      }
    } catch (error) {
      alert('Error de conexión con el servidor.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="flex justify-between items-center py-4 px-10 bg-white shadow-sm border-b">
        <div className="font-bold text-2xl text-blue-600">UQ AI Solution</div>
        <div className="flex gap-4 font-medium text-gray-700">
          <a href="/" className="hover:text-blue-600">Inicio</a>
          <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Registrarse</a>
        </div>
      </nav>

      <section className="flex-grow flex justify-center items-center py-20 px-4">
        <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-center text-black">
            {bloqueado ? 'Cuenta Bloqueada' : 'Iniciar Sesión'}
          </h2>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input 
              placeholder="Email" type="email" required
              className="w-full p-4 border border-gray-300 rounded-lg text-black bg-white"
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
            <input 
              placeholder="Contraseña" type="password" required
              className="w-full p-4 border border-gray-300 rounded-lg text-black bg-white"
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
            <button type="submit" className="w-full p-4 bg-blue-600 text-white rounded-lg font-bold">
              Entrar
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">Intentos: {intentos}/3</p>
        </div>
      </section>
    </main>
  );
}