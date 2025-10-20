import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Resume = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gradient">Resume</h2>
          <Button variant="outline" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Button>
        </div>
      </nav>

      {/* Resume Image Viewer */}
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-5xl bg-card rounded-lg border border-border shadow-lg p-4 flex justify-center">
          <img
            src={`${import.meta.env.BASE_URL}Resume.png`}
            alt="Ayushman Singh Resume"
            className="w-full h-auto max-w-full rounded-md"
          />
        </div>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>Viewing resume in read-only mode</p>
        </div>
      </div>
    </div>
  );
};

export default Resume;
