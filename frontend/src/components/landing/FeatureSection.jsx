import { features } from "../../data/featureData";
import FeatureCard from "./FeatureCard";

export default function () {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl border-t border-slate-200 px-6 py-20"
    >
      <h2 className="mb-12 text-center text-3xl font-extrabold text-slate-900">
        Tại sao nên chọn ChatNe?
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
