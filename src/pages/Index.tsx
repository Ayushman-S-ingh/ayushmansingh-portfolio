import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Download, 
  Code2, 
  Brain, 
  Database, 
  Globe,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronDown,
  Loader2,
  Menu,
  X
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import profileImage from "@/assets/profile.jpg";
import inventorySystemImage from "@/assets/inventory-system.png";
import blogCmsImage from "@/assets/blog-cms.png";
import driverDrowsinessImage from "@/assets/driver-drowsiness.png";
import emailjs from "@emailjs/browser";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  message: z.string()
    .trim()
    .min(1, "Message is required")
    .max(1000, "Message must be less than 1000 characters")
});

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    try {
      const validatedData = contactFormSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);

      // Send email using EmailJS
      await emailjs.send(
        'service_s6frh8y',
        'template_u3is5b6',
        {
          from_name: validatedData.name,
          from_email: validatedData.email,
          message: validatedData.message,
        },
        'fM24KjD1amWug6xNK'
      );

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error('EmailJS Error:', error);
        toast({
          title: "Failed to Send",
          description: "Something went wrong. Please try again or email me directly.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const skills = {
    "Programming Languages": ["Python", "C++", "Java"],
    "Web Development": ["HTML", "CSS", "JavaScript", "Flask", "React", "REST APIs"],
    "ML/AI": ["scikit-learn", "TensorFlow", "Keras", "PyTorch"],
    "Data Analysis": ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
    "Tools": ["Git", "GitHub", "Jupyter", "Colab", "MySQL", "Excel"],
  };

  const projects = [
    {
      id: "driver-drowsiness",
      title: "Driver Drowsiness Detector",
      category: "AI + Computer Vision",
      description: "Real-time drowsiness detection system with Python, OpenCV, and MediaPipe featuring automated alerts for driver safety.",
      tech: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
      icon: Brain,
      image: driverDrowsinessImage,
    },
    {
      id: "inventory-management",
      title: "Inventory & Order Management",
      category: "Full-Stack Application",
      description: "Comprehensive management system using React, Python, and MySQL for efficient inventory tracking and order processing.",
      tech: ["React", "Python", "MySQL", "REST APIs"],
      icon: Database,
      image: inventorySystemImage,
    },
    {
      id: "blog-cms",
      title: "Blog CMS Platform",
      category: "Content Management",
      description: "Dynamic platform for creating, managing, and publishing blog content with Python backend and MySQL database.",
      tech: ["Python", "MySQL", "Flask", "HTML/CSS"],
      icon: Globe,
      image: blogCmsImage,
    },
  ];

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
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection("home")} className="hover:text-primary transition-colors">Home</button>
              <button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors">About</button>
              <button onClick={() => scrollToSection("projects")} className="hover:text-primary transition-colors">Projects</button>
              <button onClick={() => scrollToSection("experience")} className="hover:text-primary transition-colors">Experience</button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-primary transition-colors">Contact</button>
            </div>
            
            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <Button variant="default" onClick={() => scrollToSection("contact")}>
                Let's Talk
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => { scrollToSection("home"); setMobileMenuOpen(false); }} 
                  className="text-left hover:text-primary transition-colors py-2"
                >
                  Home
                </button>
                <button 
                  onClick={() => { scrollToSection("about"); setMobileMenuOpen(false); }} 
                  className="text-left hover:text-primary transition-colors py-2"
                >
                  About
                </button>
                <button 
                  onClick={() => { scrollToSection("projects"); setMobileMenuOpen(false); }} 
                  className="text-left hover:text-primary transition-colors py-2"
                >
                  Projects
                </button>
                <button 
                  onClick={() => { scrollToSection("experience"); setMobileMenuOpen(false); }} 
                  className="text-left hover:text-primary transition-colors py-2"
                >
                  Experience
                </button>
                <button 
                  onClick={() => { scrollToSection("contact"); setMobileMenuOpen(false); }} 
                  className="text-left hover:text-primary transition-colors py-2"
                >
                  Contact
                </button>
                <Button variant="default" onClick={() => { scrollToSection("contact"); setMobileMenuOpen(false); }} className="w-full">
                  Let's Talk
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="gradient-hero pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                Available for Opportunities
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Hello, I'm <br />
                <span className="text-gradient">Ayushman Singh</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Aspiring Software Developer | AI & Full-Stack Enthusiast
              </p>
              <p className="text-lg leading-relaxed">
                Motivated B.Tech student in CSE – Data Science, skilled in Python, C++, data structures & algorithms, 
                and modern web technologies. Passionate about building real-world projects, solving problems, 
                and creating innovative solutions.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="gap-2" asChild>
                  {/* <Link to="/resume">
                    <Download className="w-4 h-4" />
                    View Resume
                  </Link> */}

                  <a 
                    href="/ayushmansingh-portfolio/Ayushman_Singh_Resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="your-button-class"
                    >
                    <Download className="w-4 h-4" /> View Resume
                  </a>
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection("projects")}>
                  View Portfolio
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
                  Contact Me
                </Button>
              </div>
              <div className="flex gap-4 pt-4">
                <a href="https://github.com/Ayushman-S-ingh" target="_blank" rel="noopener noreferrer" 
                   className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/in/Ayushman--singh" target="_blank" rel="noopener noreferrer"
                   className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:ayushmansingh40013@gmail.com"
                   className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-square rounded-full bg-gradient-to-br from-primary to-accent opacity-20 absolute inset-0 animate-float"></div>
                <div className="relative aspect-square rounded-full bg-card border-4 border-primary/20 shadow-2xl overflow-hidden">
                  <Avatar className="w-full h-full rounded-full">
                    <AvatarImage src={profileImage} alt="Ayushman Singh" className="object-cover" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute top-4 right-4 bg-card p-4 rounded-2xl shadow-lg animate-slide-in">
                  <div className="text-3xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="absolute bottom-8 left-4 bg-card p-4 rounded-2xl shadow-lg animate-slide-in">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Dedication</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <button onClick={() => scrollToSection("about")} className="animate-bounce">
              <ChevronDown className="w-8 h-8 text-primary" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate about leveraging technology to solve real-world problems
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <Card className="border-2 hover:border-primary transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <h3 className="text-2xl font-bold mb-6">My Journey</h3>
                <p className="text-lg leading-relaxed">
                  As a Computer Science student specializing in Data Science, I'm deeply passionate about 
                  artificial intelligence, machine learning, and full-stack development. My journey in tech 
                  has been driven by curiosity and a desire to create impactful solutions.
                </p>
                <p className="text-lg leading-relaxed">
                  I've successfully developed AI-based applications including real-time computer vision systems, 
                  comprehensive web applications, and data analytics platforms. Each project has strengthened 
                  my technical skills and problem-solving abilities.
                </p>
                <div className="pt-4">
                  <h4 className="font-bold text-lg mb-3">Core Strengths:</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Problem Solving", "Communication", "Leadership", "Creativity", "Adaptability", "Team Collaboration"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-2 hover:border-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Education</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold">B.Tech in Computer Science & Engineering</p>
                          <p className="text-sm text-muted-foreground">Data Science Specialization</p>
                          <p className="text-sm text-muted-foreground">Noida Institute of Engineering and Technology</p>
                          <p className="text-sm text-primary">Expected Aug 2026</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Badge className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Certifications</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <p className="text-sm">Python Basics - Coursera</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <p className="text-sm">Java Programming Fundamentals (OOP & DSA)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Previous Education</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>Intermediate - Harsh Chandra Inter College (2021) - 70%</p>
                        <p>High School - Harsh Chandra Inter College (2019) - 78%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Skills</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive toolkit for building modern applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <Card key={category} className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-primary">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Showcasing real-world applications built with cutting-edge technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl group overflow-hidden">
                <CardContent className="p-0">
                  {project.image ? (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-12 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                      <project.icon className="w-20 h-20 text-primary" />
                    </div>
                  )}
                  <div className="p-6 space-y-4">
                    <div>
                      <Badge variant="secondary" className="mb-2">{project.category}</Badge>
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Link to={`/project/${project.id}`}>
                      <Button variant="ghost" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        View Details
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience</h2>
            <p className="text-xl text-muted-foreground">
              Professional journey and achievements
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border"></div>
            
            <div className="relative">
              <div className="mb-8 md:ml-12">
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full -ml-2 md:-ml-2"></div>
                <Card className="md:ml-8 border-2 hover:border-primary transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-bold">Data Analytics Intern</h3>
                      <Badge variant="secondary">Oct 2023 - Nov 2023</Badge>
                    </div>
                    <p className="text-primary font-semibold mb-3">YBI Foundation</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Worked extensively on data cleaning, analysis, and visualization using Python and Excel. 
                      Developed insights from complex datasets and created comprehensive reports to support 
                      data-driven decision making. Collaborated with cross-functional teams to identify trends 
                      and patterns in large datasets.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="outline">Python</Badge>
                      <Badge variant="outline">Excel</Badge>
                      <Badge variant="outline">Data Analysis</Badge>
                      <Badge variant="outline">Visualization</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-xl text-muted-foreground">
              Have a project in mind? Let's discuss how I can help bring your ideas to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardContent className="p-8 space-y-6">
                <h3 className="text-2xl font-bold">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:ayushmansingh40013@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        ayushmansingh40013@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <a href="tel:+917380625760" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        +91 7380625760
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Github className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">GitHub</p>
                      <a href="https://github.com/Ayushman-S-ingh" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        @Ayushman-S-ingh
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Linkedin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">LinkedIn</p>
                      <a href="https://linkedin.com/in/Ayushman--singh" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        @Ayushman--singh
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Name</label>
                    <Input
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Message</label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500 mt-1">{errors.message}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/30 py-8 px-6">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 Ayushman Singh. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
