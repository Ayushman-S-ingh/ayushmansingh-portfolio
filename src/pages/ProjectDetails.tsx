import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import driverDrowsinessImage from "@/assets/driver-drowsiness.png";
import inventorySystemImage from "@/assets/inventory-system.png";
import blogCmsImage from "@/assets/blog-cms.png";

const projectsData = {
  "driver-drowsiness": {
    title: "Driver Drowsiness Detection System",
    category: "AI & Computer Vision | Python | Flask Web Integration",
    image: driverDrowsinessImage,
    overview: "The Driver Drowsiness Detection System is an intelligent computer vision-based safety solution that monitors a driver's alertness level in real time. Using facial landmark detection, it analyzes the driver's eye aspect ratio and yawning patterns to detect signs of fatigue or sleepiness. Once detected, it immediately triggers an alarm or notification to prevent potential accidents.",
    objectives: [
      "Reduce road accidents caused by drowsy driving",
      "Automate driver monitoring without external sensors",
      "Provide an easily deployable solution for smart vehicles"
    ],
    technologies: [
      { label: "Programming Language", value: "Python" },
      { label: "Libraries", value: "OpenCV, Mediapipe, NumPy, Pygame, Dlib (optional)" },
      { label: "Web Framework", value: "Flask (for creating a web interface)" },
      { label: "Frontend", value: "HTML, CSS" },
      { label: "Hardware", value: "Webcam or external camera" }
    ],
    architecture: [
      "Video input stream captured from webcam",
      "Facial landmarks detected using Mediapipe",
      "Eye Aspect Ratio (EAR) and mouth opening ratio computed",
      "If EAR < threshold → drowsiness detected → sound alarm using Pygame",
      "Flask web dashboard displays live video feed and system alerts"
    ],
    features: [
      "Real-time face and eye monitoring",
      "Accurate drowsiness detection using landmark tracking",
      "Audio alert system and optional dashboard display",
      "Modular architecture for future IoT or car system integration",
      "Potential extensions like auto-drive or emergency call triggers"
    ],
    challenges: [
      "Handling low-light detection accuracy",
      "Optimizing frame processing speed for real-time alerts",
      "Fine-tuning EAR thresholds for different users"
    ],
    outcome: "Created a robust, low-latency detection system achieving ~90% accuracy in identifying eye closure or yawning, demonstrating the potential of AI in driver safety applications.",
    tech: ["Python", "OpenCV", "MediaPipe", "Flask", "Computer Vision", "Pygame"]
  },
  "inventory-management": {
    title: "Order and Inventory Management System",
    category: "Full Stack Web Application | MERN / Flask Stack",
    image: inventorySystemImage,
    overview: "This project is a role-based web application that allows businesses to manage customer orders, track inventory, and coordinate with vendors seamlessly. It supports multiple roles — Admin, Vendor, and Customer — each with dedicated dashboards and permissions. The system automates stock updates, manages order lifecycle, and prevents manual errors in stockkeeping.",
    objectives: [
      "Simplify order and stock management for small businesses",
      "Implement secure, role-based user access",
      "Automate inventory tracking and alerts"
    ],
    technologies: [
      { label: "Frontend", value: "React.js, HTML5, CSS3, Tailwind" },
      { label: "Backend", value: "Flask / Node.js (Express)" },
      { label: "Database", value: "MongoDB / MySQL" },
      { label: "Authentication", value: "JWT Tokens" },
      { label: "Tools", value: "Postman (API testing), VS Code" }
    ],
    architecture: [
      "User authentication and role assignment through JWT",
      "React frontend interacts with backend APIs for CRUD operations",
      "Database maintains product catalog, stock data, and orders",
      "Admin manages users and inventory; Vendors handle products; Customers place orders",
      "Dashboard displays analytics (orders, stock alerts, sales)"
    ],
    features: [
      "Multi-role authentication (Admin, Vendor, Customer)",
      "Add/update/delete products with stock quantity",
      "Auto-decrement stock after each order",
      "Notifications for low stock",
      "Order tracking and detailed analytics",
      "Responsive and clean dashboard UI"
    ],
    challenges: [
      "Ensuring data synchronization between multiple user roles",
      "Managing authentication tokens securely",
      "Maintaining real-time inventory consistency during high load"
    ],
    outcome: "Developed a full-stack web app capable of handling multi-role operations efficiently, demonstrating scalability and usability for small-to-medium retail businesses.",
    tech: ["React", "Node.js", "MongoDB", "MySQL", "Flask", "JWT", "REST APIs"]
  },
  "blog-cms": {
    title: "Blog & Content Management System (CMS)",
    category: "Full Stack | Web Development | Content Platform",
    image: blogCmsImage,
    overview: "The Blog CMS is a lightweight and user-friendly content management platform that enables users to create, edit, and manage blog posts efficiently. The system provides an admin dashboard for content moderation, a markdown-based editor for smooth writing, and a responsive layout optimized for reading and SEO.",
    objectives: [
      "Build a CMS for managing articles and user content",
      "Enable authenticated users to post, edit, and delete content",
      "Create a modern, mobile-friendly UI for readers and writers"
    ],
    technologies: [
      { label: "Frontend", value: "React.js, Tailwind CSS" },
      { label: "Backend", value: "Flask / Node.js" },
      { label: "Database", value: "MongoDB / SQLite" },
      { label: "APIs", value: "RESTful APIs for CRUD operations" },
      { label: "Editor", value: "Markdown / Rich Text Editor integration" }
    ],
    architecture: [
      "React-based frontend for creating and displaying posts",
      "Backend API for authentication and content management",
      "Database for storing users, posts, and comments",
      "Admin dashboard for moderation and analytics"
    ],
    features: [
      "CRUD operations for posts and comments",
      "Secure authentication and user sessions",
      "Post search and category filters",
      "Responsive UI optimized for mobile and desktop",
      "Markdown support for blog content"
    ],
    challenges: [
      "Implementing smooth real-time markdown preview",
      "Handling image uploads and media management",
      "Balancing user permissions between readers, writers, and admins"
    ],
    outcome: "Built a complete blogging and CMS system with a rich editing experience, proving strong backend and frontend integration skills.",
    tech: ["React", "Flask", "Node.js", "MongoDB", "SQLite", "Markdown", "REST APIs"]
  }
};

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const project = projectId ? projectsData[projectId as keyof typeof projectsData] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/")}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gradient">Ayushman Singh</h2>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => navigate("/")} className="hover:text-primary transition-colors">Home</button>
              <button onClick={() => scrollToSection("overview")} className="hover:text-primary transition-colors">Overview</button>
              <button onClick={() => scrollToSection("technologies")} className="hover:text-primary transition-colors">Technologies</button>
              <button onClick={() => scrollToSection("features")} className="hover:text-primary transition-colors">Features</button>
              <button onClick={() => scrollToSection("source-code")} className="hover:text-primary transition-colors">Source Code</button>
            </div>
            <Button variant="default" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in text-center">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
              {project.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-gradient">{project.title}</span>
            </h1>
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {project.tech.map((tech) => (
                <Badge key={tech} variant="outline" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Image */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <Card className="border-2 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-12 px-6">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary transition-all duration-300">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-3xl font-bold text-gradient">Overview</h2>
                <p className="text-lg leading-relaxed">
                  {project.overview}
                </p>
                
                <div className="pt-4">
                  <h3 className="text-2xl font-bold mb-4">Objectives</h3>
                  <ul className="space-y-2">
                    {project.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-lg">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-12 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gradient mb-8 text-center">Technologies Used</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.technologies.map((tech, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-primary mb-2">{tech.label}</h3>
                    <p className="text-muted-foreground">{tech.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* System Architecture Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary transition-all duration-300">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-3xl font-bold text-gradient">System Architecture</h2>
                <ul className="space-y-3">
                  {project.architecture.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-12 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gradient mb-8 text-center">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-all duration-300">
                  <CardContent className="p-6 flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <span>{feature}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary transition-all duration-300">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-3xl font-bold text-gradient">Challenges Faced</h2>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <span className="text-lg">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Outcome Section */}
      <section className="py-12 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <h2 className="text-3xl font-bold text-gradient">Outcome</h2>
                <p className="text-lg leading-relaxed">
                  {project.outcome}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Source Code Section */}
      <section id="source-code" className="py-12 px-6">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary transition-all duration-300">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <Github className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl font-bold text-gradient">View Source Code</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  The source code for this project will be available soon. Check back later or contact me for more details.
                </p>
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" disabled className="gap-2">
                    <Github className="w-4 h-4" />
                    GitHub Repository
                  </Button>
                  <Button variant="outline" disabled className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <Button onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetails;
