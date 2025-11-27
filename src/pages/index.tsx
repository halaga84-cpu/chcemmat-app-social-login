import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Share2, Eye, Lock, Users, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { authService } from "@/services/authService";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";

export default function HomePage() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [user, setUser] = useState<Awaited<ReturnType<typeof authService.getCurrentUser>> | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await authService.signOut();
    setUser(null);
  };

  const features = [
  {
    icon: Gift,
    title: language === "sk" ? "Vytvorte Wishlisty" : "Create Wishlists",
    description: language === "sk" ?
    "Vytvorte až 50 wishlistov pre rôzne príležitosti - narodeniny, svadby, vianoce a ďalšie." :
    "Create up to 50 wishlists for different occasions - birthdays, weddings, Christmas and more."
  },
  {
    icon: Share2,
    title: language === "sk" ? "Zdieľajte Jednoducho" : "Share Easily",
    description: language === "sk" ?
    "Každý wishlist má unikátnu URL adresu, ktorú môžete zdieľať s priateľmi a rodinou." :
    "Each wishlist has a unique URL that you can share with friends and family."
  },
  {
    icon: Eye,
    title: language === "sk" ? "Kontrola Súkromia" : "Privacy Control",
    description: language === "sk" ?
    "Tvoj zoznam prianí je súkromný. Vidia ho iba ľudia, s ktorými si ho zdieľal." :
    "Your wishlist is private. Only people you share it with can see it."
  },
  {
    icon: Lock,
    title: language === "sk" ? "Bezpečné Rezervácie" : "Secure Reservations",
    description: language === "sk" ?
    "Darčeky môžu rezervovať aj ľudia bez registrácie. Vaše heslá sú zabezpečené hashovaním." :
    "Gifts can be reserved even by people without registration. Your passwords are secured with hashing."
  }];


  const steps = [
  {
    number: "1",
    title: language === "sk" ? "Zaregistrujte sa" : "Sign Up",
    description: language === "sk" ?
    "Vytvorte si bezplatný účet pomocou emailu alebo Google." :
    "Create a free account using email or Google."
  },
  {
    number: "2",
    title: language === "sk" ? "Vytvorte Wishlist" : "Create Wishlist",
    description: language === "sk" ?
    "Pridajte položky s obrázkami, cenami a odkazmi na produkty." :
    "Add items with images, prices, and product links."
  },
  {
    number: "3",
    title: language === "sk" ? "Zdieľajte Link" : "Share Link",
    description: language === "sk" ?
    "Skopírujte unikátny link a pošlite ho svojim blízkym." :
    "Copy the unique link and send it to your loved ones."
  },
  {
    number: "4",
    title: language === "sk" ? "Rezervujte Darčeky" : "Reserve Gifts",
    description: language === "sk" ?
    "Vaši priatelia môžu rezervovať darčeky bez registrácie." :
    "Your friends can reserve gifts without registration."
  }];


  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink-light via-white to-brand-pink/10">
      <Header user={user} onLogout={handleLogout} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex p-6 rounded-3xl bg-gradient-to-br from-brand-pink-light to-brand-pink mb-8 shadow-2xl shadow-brand-pink/30 animate-float">
            <Logo className="h-32 w-32" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-brand-blue leading-tight">
            {language === "sk" ?
            <>
                Vytvorte a Zdieľajte<br />
                Vaše <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink-accent to-brand-pink-medium">Wishlisty</span>
              </> :

            <>
                Create and Share<br />
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink-accent to-brand-pink-medium">Wishlists</span>
              </>
            }
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {language === "sk" ?
            "Moderná aplikácia pre správu wishlistov. Jednoduché zdieľanie, bezpečné rezervácie a kontrola súkromia." :
            "Modern wishlist management app. Easy sharing, secure reservations, and privacy control."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-gradient-to-r from-brand-blue to-brand-blue-dark hover:shadow-2xl text-white font-semibold rounded-2xl px-8 py-6 text-lg">
                <Sparkles className="mr-2 h-5 w-5" />
                {t("get_started")}
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded-2xl px-8 py-6 text-lg font-semibold">
                {t("sign_in")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-blue mb-4">
              {language === "sk" ? "Funkcie Aplikácie" : "App Features"}
            </h2>
            <p className="text-xl text-gray-600">
              {language === "sk" ?
              "Všetko, čo potrebujete pre perfektné darčeky" :
              "Everything you need for perfect gifts"}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) =>
            <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-3xl">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-pink-light to-brand-pink shadow-lg shadow-brand-pink/20">
                      <feature.icon className="h-8 w-8 text-brand-pink-accent" />
                    </div>
                    <CardTitle className="text-2xl text-brand-blue">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-blue mb-4">
              {language === "sk" ? "Ako To Funguje" : "How It Works"}
            </h2>
            <p className="text-xl text-gray-600">
              {language === "sk" ?
              "Začnite 4 jednoduchými krokmi" :
              "Get started in 4 simple steps"}
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) =>
            <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-brand-blue to-brand-blue-dark flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-brand-blue/30">
                    {step.number}
                  </div>
                  {index < steps.length - 1 &&
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-brand-blue to-brand-pink-accent" />
                }
                </div>
                <h3 className="text-xl font-bold text-brand-blue mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto border-0 bg-gradient-to-r from-brand-blue to-brand-blue-dark rounded-3xl shadow-2xl overflow-hidden">
          <CardContent className="p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              {language === "sk" ? "Pripravený začať?" : "Ready to start?"}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {language === "sk" ?
              "Vytvorte si bezplatný účet a začnite zdieľať svoje wishlisty ešte dnes!" :
              "Create a free account and start sharing your wishlists today!"}
            </p>
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100 font-semibold rounded-2xl px-12 py-6 text-lg shadow-xl">
                <Sparkles className="mr-2 h-5 w-5" />
                {t("create_account")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>);

}