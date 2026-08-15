import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FeatureCard({ icon, title, description }) {
  return (
    <Card className="group border-border bg-card hover:border-primary/30 hover:shadow-primary/10 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        {/* Icon */}
        <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex size-12 items-center justify-center rounded-2xl transition-colors duration-300">
          {icon}
        </div>

        <CardTitle className="mt-2 text-xl font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground text-justify text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
