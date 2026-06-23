"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({ 
    nombre: '', apellidos: '', email: '', password: '', rol: 'USER', area: 'TI' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://uq-ai-examen-production.up.railway.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('¡Registro exitoso!');
        router.push('/login'); 
      } else {
        alert('Error en el registro');
      }
    } catch (error) {
      alert('Error de conexión');
    }
  };

  const inputClass = "w-full p-3 border border-gray-400 rounded-lg text-black bg-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none";

  return (
    <main className="min-h-screen bg-white font-sans">
      {/* 1.5 Navbar */}
      <nav className="flex justify-between items-center py-4 px-10 bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="font-bold text-2xl text-blue-600">UQ AI Solution</div>
        <div className="flex gap-4 font-medium text-gray-700 items-center">
          <a href="#servicios" className="hover:text-blue-600">Servicios</a>
          <a href="#contacto" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Registrarse</a>
          <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Iniciar Sesión</a>
        </div>
      </nav>

      {/* 1.1 Hero */}
      <header className="py-12 text-center bg-gray-900 text-white">
        <h1 className="text-4xl font-bold mb-2">UQ AI Solution</h1>
        <p className="text-lg text-gray-300">Inteligencia Artificial para el Perú y el Mundo</p>
      </header>

      {/* 1.2 Nuestras Soluciones */}
      <section id="servicios" className="py-10 px-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Nuestras Soluciones</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Agentes IA', desc: 'Soporte inteligente 24/7' },
            { title: 'Chatbots', desc: 'Atención automatizada' },
            { title: 'Automatización', desc: 'Optimiza tus procesos' },
            { title: 'MYPES', desc: 'Digitalización para negocios' },
            { title: 'Salud/Educación', desc: 'IA aplicada al bienestar' },
            { title: 'Big Data', desc: 'Análisis de datos precisos' }
          ].map((item) => (
            <div key={item.title} className="p-6 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
              <h3 className="font-bold text-lg text-blue-700 mb-1">{item.title}</h3>
              <p className="text-black text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 1.4 Formulario (Registro Completo) */}
      <section id="contacto" className="py-10 bg-gray-50 flex justify-center items-center px-4">
        <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg border border-gray-300">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">Registro de Usuarios</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input placeholder="Nombre" className={inputClass} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
            <input placeholder="Apellidos" className={inputClass} onChange={(e) => setFormData({...formData, apellidos: e.target.value})} required />
            <input placeholder="Email" type="email" className={inputClass} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            <input placeholder="Contraseña" type="password" className={inputClass} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            
            {/* Campos de Área y Rol */}
            <select className={inputClass} onChange={(e) => setFormData({...formData, area: e.target.value})}>
              <option value="TI">Área: TI</option>
              <option value="Ventas">Área: Ventas</option>
              <option value="Admin">Área: Administración</option>
            </select>
            
            <select className={inputClass} onChange={(e) => setFormData({...formData, rol: e.target.value})}>
              <option value="USER">Rol: Usuario</option>
              <option value="ADMIN">Rol: Administrador</option>
            </select>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold transition-colors">
              Registrar ahora
            </button>
          </form>
        </div>
      </section>

      <footer className="py-6 text-center bg-gray-900 text-white text-sm">
        <p>© 2026 UQ AI Solution</p>
      </footer>
    </main> 
  );
}