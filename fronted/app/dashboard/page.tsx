"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [rol, setRol] = useState<string | null>(null);

  useEffect(() => {
    // Obtenemos el rol guardado en el login
    setRol(localStorage.getItem('userRole'));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('https://uq-ai-examen-production.up.railway.app/api/auth/dashboard', { 
        method: 'POST', 
        credentials: 'include' 
      });
      localStorage.removeItem('userRole');
      router.push('/login');
    } catch (error) {
      alert("Error al cerrar sesión");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        
        {/* Encabezado */}
        <header className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Bienvenido, acceso como: <span className="font-bold text-blue-700">{rol}</span>
            </p>
          </div>
          <button 
            onClick={handleLogout} 
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition-all shadow-sm"
          >
            Cerrar Sesión
          </button>
        </header>

        {/* Lógica de RBAC (Punto 3.4) */}
        <div className="mt-4">
          {rol === 'ADMIN' ? (
            <div className="bg-indigo-50 border-l-8 border-indigo-600 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">Panel de Leads (ADMIN)</h2>
              
              {/* Tabla de Leads profesional */}
              <div className="overflow-x-auto bg-white rounded-lg border border-indigo-200">
                <table className="min-w-full text-left">
                  <thead className="bg-indigo-100 text-indigo-900 uppercase text-sm">
                    <tr>
                      <th className="px-6 py-3">Nombre</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 divide-y divide-indigo-100">
                    <tr>
                      <td className="px-6 py-4">Juan Pérez</td>
                      <td className="px-6 py-4">juan@email.com</td>
                      <td className="px-6 py-4"><span className="text-green-600 font-semibold">Contactado</span></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">María López</td>
                      <td className="px-6 py-4">maria@email.com</td>
                      <td className="px-6 py-4"><span className="text-orange-600 font-semibold">Pendiente</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border-l-8 border-emerald-600 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-emerald-900 mb-2">Mi Perfil (USER)</h2>
              <p className="text-emerald-800 mb-4">Gestiona aquí tus datos personales y configuración.</p>
              <div className="bg-white p-4 border border-emerald-200 rounded text-gray-800 font-medium">
                Email: {typeof window !== 'undefined' ? localStorage.getItem('email') : 'Cargando...'}
                <br />
                Área asignada: GENERAL
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}