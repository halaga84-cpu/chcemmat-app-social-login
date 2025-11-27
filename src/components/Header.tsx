
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { authService } from "@/services/authService";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  user?: Awaited<ReturnType<typeof authService.getCurrentUser>> | null;
  onLogout?: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
  const { t, setLanguage, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: t("benefits"), href: "/vyhody" },
    { label: t("blog"), href: "/blog" },
    { label: t("contact"), href: "/kontakt" }
  ];

  return (
    <header className="border-b bg-white backdrop-blur-sm border-brand-pink/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-brand-pink-light to-brand-pink p-2 rounded-2xl shadow-md shadow-brand-pink/20">
              <Logo className="h-12 w-12" />
            </div>
            <h1 className="text-2xl font-bold text-brand-blue">ChcemMať</h1>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-brand-blue hover:text-brand-pink-accent font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side - Language, Login, CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "sk" ? "en" : "sk")}
              className="text-brand-blue hover:bg-brand-pink-light rounded-xl"
            >
              {language === "sk" ? "EN" : "SK"}
            </Button>
            
            {user ? (
              <>
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white rounded-xl"
                >
                  <Link href="/dashboard">{t("go_to_dashboard")}</Link>
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={onLogout} 
                  className="text-brand-blue rounded-xl"
                >
                  {t("sign_out")}
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button 
                    variant="ghost" 
                    className="text-brand-blue hover:bg-brand-pink-light rounded-xl font-semibold"
                  >
                    {t("sign_in")}
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button 
                    className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white font-semibold rounded-2xl"
                  >
                    {t("get_started")}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile - Login Button + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/auth/login">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-brand-blue hover:bg-brand-pink-light rounded-xl"
              >
                {t("sign_in")}
              </Button>
            </Link>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-brand-blue"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white">
                <div className="flex flex-col gap-6 mt-8">
                  {/* CTA Button First */}
                  <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      className="w-full bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white font-semibold rounded-2xl"
                    >
                      {t("get_started")}
                    </Button>
                  </Link>

                  {/* Navigation Links */}
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg text-brand-blue hover:text-brand-pink-accent font-medium transition-colors py-2"
                    >
                      {item.label}
                    </Link>
                  ))}

                  {/* Divider */}
                  <div className="border-t border-brand-pink/20 my-2" />

                  {/* User Actions */}
                  {user && (
                    <>
                      <Link 
                        href="/dashboard" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg text-brand-blue hover:text-brand-pink-accent font-medium py-2"
                      >
                        {t("go_to_dashboard")}
                      </Link>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          onLogout?.();
                          setMobileMenuOpen(false);
                        }}
                        className="justify-start text-brand-blue hover:bg-brand-pink-light"
                      >
                        {t("sign_out")}
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
