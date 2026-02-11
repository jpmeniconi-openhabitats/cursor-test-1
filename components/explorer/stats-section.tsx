export function StatsSection() {
  const stats = [
    { value: "500+", label: "Sustainable Projects", sublabel: "from 50+ countries" },
    { value: "98%", label: "CO₂ Reduction", sublabel: "average across projects" },
    { value: "15k+", label: "Professionals", sublabel: "in our community" },
    { value: "24/7", label: "AI Assistant", sublabel: "sustainability guidance" },
  ]

  return (
    <section className="py-16 border-y border-border bg-card/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm font-medium mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
