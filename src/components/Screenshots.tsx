import screenshot1 from "@/assets/screenshot1.png";
import screenshot2 from "@/assets/screenshot2.png";
import screenshot3 from "@/assets/screenshot3.png";
import screenshot4 from "@/assets/screenshot4.png";
import screenshot5 from "@/assets/screenshot5.png";
import screenshot6 from "@/assets/screenshot6.svg";

export const Screenshots = () => {
  const screenshots = [
    { 
      src: screenshot1, 
      alt: "AI conversation in DuoMind",
      title: "Shared real-time chat",
      description: "Two people and an AI chatting together. Every message, question, and answer is visible to both instantly. Absolute transparency, no screenshots or hidden conversations."
    },
    { 
      src: screenshot2, 
      alt: "Real-time chat with partner",
      title: "Impartial assistance for both",
      description: "AI answers questions from both people equally. No bias, no taking sides. Just clarity, balanced advice, and mutual support to understand each other better."
    },
    { 
      src: screenshot3, 
      alt: "Login to DuoMind",
      title: "Simple and secure access",
      description: "Easily log in with your partner or friend. Everything synced in the cloud, secure and private. Your conversations are saved encrypted and only you have access."
    },
    { 
      src: screenshot4, 
      alt: "Conversation analysis",
      title: "Smart progress analysis",
      description: "Review how your communication has evolved. AI generates automatic summaries of each session, identifies patterns, and highlights key moments to reflect on together."
    },
    { 
      src: screenshot5, 
      alt: "Analysis history",
      title: "Complete analysis history",
      description: "Access all previous analyses organized by date. Review key insights, detected emotions, and reflection points to see how you've grown together over time."
    },
    { 
      src: screenshot6, 
      alt: "Detailed insights",
      title: "Deep and actionable insights",
      description: "Each analysis includes detailed observations about emotional needs, communication dynamics, and areas for improvement. AI identifies patterns and suggests concrete steps to strengthen the relationship."
    },
  ];

  return (
    <section id="screenshots" className="py-20 px-4 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              How it Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A shared space where AI helps both communicate better
          </p>
        </div>
        
        <div className="space-y-24">
          {screenshots.map((screenshot, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center animate-in fade-in slide-in-from-bottom-8 duration-700`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-1 lg:flex-[2]">
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  className="w-full h-auto"
                />
              </div>
              <div className="flex-1 space-y-4 max-w-xl">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">{screenshot.title}</h3>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{screenshot.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
