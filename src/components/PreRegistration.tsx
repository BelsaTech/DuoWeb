import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle } from "lucide-react";
import { subscribeToMailerLite } from "@/services/mailerlite";

export const PreRegistration = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Detect user's language from browser
      const userLanguage = navigator.language.split('-')[0]; // 'es', 'en', etc.

      // Subscribe to MailerLite with language field
      const result = await subscribeToMailerLite({
        email,
        fields: {
          language: userLanguage
        }
      });

      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Successfully registered!",
          description: "We'll notify you when DuoMind is available",
        });
      } else {
        toast({
          title: "Registration failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="registration" className="py-20 px-4 bg-gradient-soft">
        <div className="container max-w-2xl mx-auto text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Thank you for registering!</h3>
            <p className="text-xl text-muted-foreground">
              We'll send you an email to <span className="font-semibold text-foreground">{email}</span> when DuoMind is available on Play Store.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="registration" className="py-20 px-4 bg-gradient-soft">
      <div className="container max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Be the first to <span className="bg-gradient-hero bg-clip-text text-transparent">try it</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Register now and we'll notify you when DuoMind is ready
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 h-14 text-lg rounded-2xl border-2 focus:border-primary"
              required
            />
          </div>
          
          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="w-full h-14 text-lg rounded-2xl bg-gradient-hero hover:opacity-90 transition-all duration-300 shadow-soft"
          >
            {isLoading ? "Registering..." : "Notify me when it's ready"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          No spam. We'll only contact you when the app is available.
        </p>
      </div>
    </section>
  );
};
