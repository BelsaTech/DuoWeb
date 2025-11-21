import { Button } from "@/components/ui/button";
import { MessageSquare, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";

interface HeroProps {
  onCTAClick: () => void;
}

export const Hero = ({ onCTAClick }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-soft -z-10" />
      
      <div className="container max-w-6xl mx-auto">
        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight flex items-start justify-center gap-4">
            <img src={logo} alt="DuoMind Logo" className="w-20 h-20 md:w-24 md:h-24" />
            <div className="flex flex-col items-start">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                DuoMind
              </span>
              <span className="text-foreground text-3xl md:text-5xl">AI Chat for Two</span>
            </div>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The first app where two people chat with AI in real-time. 
            <span className="font-semibold text-foreground"> Everything transparent, everything together.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              onClick={onCTAClick}
              className="text-lg px-8 py-6 bg-gradient-hero hover:opacity-90 transition-all duration-300 shadow-soft"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Get Started
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById('screenshots')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg px-8 py-6 border-2 hover:bg-muted/50 transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Coming Soon to Play Store</span>
          </div>
          
          <div className="pt-4 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span>Total Transparency</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>Impartial AI</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Real-time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
