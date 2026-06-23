// src/components/Hero.tsx
export default function Hero() {
  return (
    <section className="text-center py-24 bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-4">UQ AI Solution</h1>
      <p className="text-xl mb-8 text-gray-400">Inteligencia Artificial para el Perú y el Mundo</p>
      <div className="flex justify-center gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold">Explorar Servicios</button>
        <button className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-bold">Contactar</button>
      </div>
    </section>
  );
}