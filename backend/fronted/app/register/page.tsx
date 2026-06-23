"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    area: 'General' // Valor por defecto
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        router.push('/login');
      } else {
        const errorText = await response.text();
        alert("Error al registrar: " + errorText);
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor.");
    }
  };

  const inputClass = "w-full p-3 border border-gray-300 rounded-lg text-black bg-white focus:ring-2 focus:ring-blue-500 outline-none";

  return (
    <main className="min-h-screen bg-gray-50 flex justify-center items-center py-10">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Crear Cuenta</h2>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input 
            placeholder="Nombre" className={inputClass} required
            onChange={(e) => setFormData({...formData, nombre: e.target.value})} 
          />
          <input 
            placeholder="Apellidos" className={inputClass} required
            onChange={(e) => setFormData({...formData, apellidos: e.target.value})} 
          />
          <input 
            placeholder="Email" type="email" className={inputClass} required
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
          <input 
            placeholder="Contraseña" type="password" className={inputClass} required
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
          />
          
          <button 
            type="submit" 
            className="w-full p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition-all"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          ¿Ya tienes cuenta? <a href="/login" className="text-blue-600 font-bold underline">Inicia Sesión</a>
        </p>
      </div>
    </main>
  );
}