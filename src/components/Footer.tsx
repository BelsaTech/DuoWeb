import { Mail, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border/50 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-3 bg-gradient-hero bg-clip-text text-transparent">
            DuoMind
          </h3>
          <p className="text-muted-foreground mb-4">
            AI Chat for couples. A new way to understand each other and communicate better.
          </p>
          <a 
            href="mailto:manuelahur@belsatecht.lat"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <Mail className="w-4 h-4" />
            manuelahur@belsatecht.lat
          </a>
        </div>

        <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-secondary fill-secondary" /> to improve communication
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} DuoMind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
