
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export function Footer() {
  const { t, setLanguage, language } = useLanguage();

  return (
    <footer className="border-t bg-white/80 backdrop-blur-sm border-brand-pink/20 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Side - Logo & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-brand-pink-light to-brand-pink p-2 rounded-2xl shadow-md shadow-brand-pink/20">
                <Logo className="h-10 w-10" />
              </div>
              <p className="text-brand-blue font-semibold">
                © 2025 ChcemMať
              </p>
            </div>
            {/* Mobile Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "sk" ? "en" : "sk")}
              className="flex md:hidden text-brand-blue hover:bg-brand-pink-light rounded-xl"
            >
              {language === "sk" ? "EN" : "SK"}
            </Button>
          </div>

          {/* Right Side - Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Link 
              href="/vyhody" 
              className="text-gray-600 hover:text-brand-blue font-medium transition-colors"
            >
              {t("benefits")}
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-600 hover:text-brand-blue font-medium transition-colors"
            >
              {t("blog")}
            </Link>
            <Link 
              href="/kontakt" 
              className="text-gray-600 hover:text-brand-blue font-medium transition-colors"
            >
              {t("contact")}
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              href="/gdpr" 
              className="text-gray-600 hover:text-brand-blue font-medium transition-colors"
            >
              {t("gdpr")}
            </Link>
            <Link 
              href="/cookies" 
              className="text-gray-600 hover:text-brand-blue font-medium transition-colors"
            >
              {t("cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
