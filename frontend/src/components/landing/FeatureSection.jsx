import { features } from "../../constants/featureData";
import FeatureCard from "./FeatureCard";

export default function FeatureSection() {
  return (
    <section
      id="features"
      className="border-border mx-auto max-w-7xl border-t px-4 py-20 sm:px-6 lg:px-8"
    >
      {/* Section heading */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
          Tại sao nên chọn{" "}
          <span className="from-primary bg-linear-to-r to-cyan-500 bg-clip-text text-transparent">
            ChatNe
          </span>{" "}
          ?
        </h2>

        <p className="text-muted-foreground mt-4 text-sm leading-relaxed sm:text-base">
          Mọi thứ bạn cần để kết nối, trò chuyện và chia sẻ với bạn bè trong một
          nền tảng duy nhất.
        </p>
      </div>

      {/* Features */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
