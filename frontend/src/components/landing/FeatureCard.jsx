export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-indigo-200 hover:shadow-lg hover:shadow-pink-500/5">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl text-indigo-600">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}
