// src/components/ServiceCard.tsx
export default function ServiceCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow bg-white">
      <div className="text-4xl mb-4">🚀</div> {/* Puedes cambiar el emoji por un icono */}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}