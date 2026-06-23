// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-10 text-center">
      <div className="mb-4">
        <h2 className="text-white font-bold text-xl">UQ AI Solution</h2>
        <p>© 2026 UQ AI. Todos los derechos reservados.</p>
      </div>
      <div className="flex justify-center gap-6 mb-4">
        <a href="#" className="hover:text-white">LinkedIn</a>
        <a href="#" className="hover:text-white">Twitter</a>
      </div>
      <p className="text-sm">Aviso Legal: Política de privacidad y uso de datos de IA.</p>
    </footer>
  );
}