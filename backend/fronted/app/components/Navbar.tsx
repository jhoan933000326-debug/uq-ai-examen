// src/components/Navbar.tsx
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-6 px-10 bg-white shadow-md w-full">
      <div className="font-bold text-2xl text-blue-600">UQ AI Solution</div>
      <div className="hidden md:flex gap-8 font-medium text-gray-700">
        <a href="#servicios" className="hover:text-blue-600">Servicios</a>
        <a href="#academia" className="hover:text-blue-600">Academia</a>
        <a href="#lab" className="hover:text-blue-600">Lab</a>
        <a href="#contacto" className="hover:text-blue-600">Contacto</a>
      </div>
      <a href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold">Iniciar Sesión</a>
      <div className="md:hidden">☰</div> {/* Menú hamburguesa */}
    </nav>
  );
}