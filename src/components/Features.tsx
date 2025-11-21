import { Users, Eye, Shield, TrendingUp, MessageCircle, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Chat for two + AI",
      description: "A shared space where two people converse and AI actively participates in real-time.",
      gradient: "from-primary to-primary/70",
    },
    {
      icon: Eye,
      title: "Total transparency",
      description: "Both see all questions and AI responses. No screenshots or misunderstandings.",
      gradient: "from-secondary to-accent",
    },
    {
      icon: Shield,
      title: "Impartial AI",
      description: "Artificial intelligence helps both equally, seeking clarity and mutual understanding.",
      gradient: "from-accent to-secondary",
    },
    {
      icon: TrendingUp,
      title: "Evolutionary analysis",
      description: "Automatic summaries and progress log to review how communication evolves.",
      gradient: "from-primary to-secondary",
    },
    {
      icon: MessageCircle,
      title: "All in one place",
      description: "No more external queries to other AIs. All the help you need is here, together.",
      gradient: "from-secondary to-primary",
    },
    {
      icon: Zap,
      title: "Real-time",
      description: "Instant synchronization. Both participate, ask questions, and receive answers instantly.",
      gradient: "from-accent to-primary",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Makes <span className="bg-gradient-accent bg-clip-text text-transparent">DuoMind</span> Special?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A new way to understand each other, resolve disagreements, and grow together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-soft transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 border-border/50 bg-card/50 backdrop-blur-sm text-center"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 mx-auto`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
