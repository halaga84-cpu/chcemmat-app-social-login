import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { authService } from "@/services/authService";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ContactPage() {
  const { language } = useLanguage();
  const [user, setUser] = useState<Awaited<ReturnType<typeof authService.getCurrentUser>> | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      
      // Pre-fill form with user data if logged in
      if (currentUser) {
        setFormData(prev => ({
          ...prev,
          name: currentUser.user_metadata?.full_name || "",
          email: currentUser.email || ""
        }));
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await authService.signOut();
    setUser(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset status
    setSubmitStatus("idle");
    setErrorMessage("");
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus("error");
      setErrorMessage(language === "sk" 
        ? "Prosím vyplňte všetky povinné polia" 
        : "Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus("error");
      setErrorMessage(language === "sk" 
        ? "Prosím zadajte platnú emailovú adresu" 
        : "Please enter a valid email address");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Call the Edge Function
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          message: formData.message.trim()
        }
      });

      if (error) {
        throw error;
      }

      // Success!
      setSubmitStatus("success");
      
      // Clear form after successful submission
      setFormData({
        name: user?.user_metadata?.full_name || "",
        email: user?.email || "",
        phone: "",
        message: ""
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);

    } catch (error: any) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
      setErrorMessage(language === "sk"
        ? "Nepodarilo sa odoslať správu. Skúste to prosím znova alebo nás kontaktujte priamo na info@chcemmat.sk"
        : "Failed to send message. Please try again or contact us directly at info@chcemmat.sk");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink-light via-white to-brand-pink/10">
      <Header user={user} onLogout={handleLogout} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-brand-blue leading-tight">
            {language === "sk" ? (
              <>
                Kontaktujte <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink-accent to-brand-pink-medium">nás</span>
              </>
            ) : (
              <>
                Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink-accent to-brand-pink-medium">Us</span>
              </>
            )}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {language === "sk"
              ? "Máte otázky alebo návrhy? Radi vám pomôžeme!"
              : "Have questions or suggestions? We're happy to help!"}
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success/Error Alert */}
          {submitStatus === "success" && (
            <Alert className="mb-6 border-green-200 bg-green-50 text-green-800 rounded-2xl">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertDescription className="ml-2">
                {language === "sk"
                  ? "✅ Správa bola úspešne odoslaná! Ozveme sa vám čo najskôr."
                  : "✅ Message sent successfully! We'll get back to you soon."}
              </AlertDescription>
            </Alert>
          )}

          {submitStatus === "error" && (
            <Alert className="mb-6 border-red-200 bg-red-50 text-red-800 rounded-2xl">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <AlertDescription className="ml-2">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-pink-light to-brand-pink shadow-lg shadow-brand-pink/20">
                  <MessageSquare className="h-6 w-6 text-brand-pink-accent" />
                </div>
                <CardTitle className="text-3xl text-brand-blue">
                  {language === "sk" ? "Napíšte nám" : "Write to Us"}
                </CardTitle>
              </div>
              <CardDescription className="text-base">
                {language === "sk"
                  ? "Vyplňte formulár nižšie a my sa vám ozveme čo najskôr."
                  : "Fill out the form below and we'll get back to you as soon as possible."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand-blue">
                    {language === "sk" ? "Vaše meno *" : "Your Name *"}
                  </label>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={language === "sk" ? "Zadajte svoje meno" : "Enter your name"}
                    className="rounded-xl border-brand-pink/20"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand-blue">
                    Email *
                  </label>
                  <Input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={language === "sk" ? "vas@email.sk" : "your@email.com"}
                    className="rounded-xl border-brand-pink/20"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand-blue">
                    {language === "sk" ? "Telefón (voliteľné)" : "Phone (optional)"}
                  </label>
                  <Input 
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={language === "sk" ? "+421 XXX XXX XXX" : "+421 XXX XXX XXX"}
                    className="rounded-xl border-brand-pink/20"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand-blue">
                    {language === "sk" ? "Správa *" : "Message *"}
                  </label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={language === "sk" ? "Napíšte svoju správu..." : "Write your message..."}
                    className="min-h-[150px] rounded-xl border-brand-pink/20"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white font-semibold rounded-2xl py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      {language === "sk" ? "Odosielam..." : "Sending..."}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      {language === "sk" ? "Odoslať správu" : "Send Message"}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Alternative Contact */}
          <Card className="mt-8 border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-pink-light to-brand-pink shadow-lg shadow-brand-pink/20">
                  <Mail className="h-6 w-6 text-brand-pink-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-blue mb-1">
                    {language === "sk" ? "Emailový kontakt" : "Email Contact"}
                  </h3>
                  <a 
                    href="mailto:info@chcemmat.sk" 
                    className="text-brand-blue hover:text-brand-pink-accent transition-colors"
                  >
                    info@chcemmat.sk
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
