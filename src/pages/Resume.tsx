import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Resume = () => {
  const navigate = useNavigate();
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

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

      {/* Resume Viewer */}
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-5xl bg-card rounded-lg border border-border shadow-lg p-4 flex justify-center">
          <Document
            file={`${import.meta.env.BASE_URL}/Ayushman_Singh_Resume.pdf`}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => console.error("PDF Load Error:", error)}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={Math.min(window.innerWidth * 0.9, 800)} // responsive width
              />
            ))}
          </Document>
        </div>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>Viewing resume in read-only mode</p>
        </div>
      </div>
    </div>
  );
};

export default Resume;
