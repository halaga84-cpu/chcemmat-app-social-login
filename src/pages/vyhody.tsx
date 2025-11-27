import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Gift, Share2, Eye, Lock, Users, Heart, Sparkles, Bell, Star, TrendingDown, ShoppingBag, AlertCircle, BarChart3, Frown } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { authService } from "@/services/authService";
import { useEffect, useState } from "react";

export default function BenefitsPage() {
  const { t, language } = useLanguage();
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

  const benefits = [
  {
    icon: Gift,
    title: language === "sk" ? "Žiadne zlé darčeky" : "No More Bad Gifts",
    description: language === "sk" ?
    "Dostávajte presne to, čo chcete. Žiadne nepotrebné darčeky, ktoré skončia v skrinke." :
    "Get exactly what you want. No more unwanted gifts ending up in the closet."
  },
  {
    icon: Share2,
    title: language === "sk" ? "Jednoduché zdieľanie" : "Easy Sharing",
    description: language === "sk" ?
    "Zdieľajte svoj wishlist s celou rodinou a priateľmi jedným klikom cez unikátny odkaz." :
    "Share your wishlist with family and friends with one click via a unique link."
  },
  {
    icon: Eye,
    title: language === "sk" ? "Kontrola súkromia" : "Privacy Control",
    description: language === "sk" ?
    "Vy rozhodujete, kto môže vidieť váš wishlist. Vaše zoznamy sú súkromné a bezpečné." :
    "You decide who can see your wishlist. Your lists are private and secure."
  },
  {
    icon: Lock,
    title: language === "sk" ? "Bezpečné rezervácie" : "Secure Reservations",
    description: language === "sk" ?
    "Darčeky môžu rezervovať aj ľudia bez registrácie. Nevidíte, kto čo rezervoval." :
    "Gifts can be reserved even by people without registration. You don't see who reserved what."
  },
  {
    icon: Users,
    title: language === "sk" ? "Pre celú rodinu" : "For the Whole Family",
    description: language === "sk" ?
    "Vytvorte wishlisty pre deti, partnerov alebo celú rodinu. Až 50 wishlistov na účet." :
    "Create wishlists for kids, partners, or the whole family. Up to 50 wishlists per account."
  },
  {
    icon: Heart,
    title: language === "sk" ? "Rôzne príležitosti" : "Multiple Occasions",
    description: language === "sk" ?
    "Narodeniny, svadby, Vianoce, či len tak. Organizujte si wishlisty pre rôzne príležitosti." :
    "Birthdays, weddings, Christmas, or just because. Organize wishlists for different occasions."
  },
  {
    icon: Sparkles,
    title: language === "sk" ? "Žiadne duplicity" : "No Duplicates",
    description: language === "sk" ?
    "Systém rezervácií zabezpečuje, že nedostanete ten istý darček od viacerých ľudí." :
    "The reservation system ensures you don't get the same gift from multiple people."
  },
  {
    icon: Bell,
    title: language === "sk" ? "Sledovanie želaní" : "Track Your Wishes",
    description: language === "sk" ?
    "Vidíte, ktoré položky boli rezervované a ktoré sú stále dostupné." :
    "See which items have been reserved and which are still available."
  },
  {
    icon: Star,
    title: language === "sk" ? "Zdieľanie URL odkazov" : "URL Link Sharing",
    description: language === "sk" ?
    "Položky obsahujú odkaz. Žiadne zdĺhavé hľadanie alebo preklikávanie stránok." :
    "Items contain links. No searching or clicking through pages."
  }];


  const useCases = [
  {
    title: language === "sk" ? "Pre rodičov" : "For Parents",
    description: language === "sk" ?
    "Vytvorte wishlisty pre svoje deti a nech príbuzní vedia, čo nakúpiť na narodeniny." :
    "Create wishlists for your kids so relatives know what to buy for birthdays."
  },
  {
    title: language === "sk" ? "Pre páry" : "For Couples",
    description: language === "sk" ?
    "Zdieľajte si navzájom želania a uľahčite si výber darčekov pre partnera." :
    "Share wishes with each other and make gift selection for your partner easier."
  },
  {
    title: language === "sk" ? "Pre svadby" : "For Weddings",
    description: language === "sk" ?
    "Vytvorte svadobný wishlist a hosťom uľahčite výber vhodných darčekov." :
    "Create a wedding wishlist and make it easier for guests to choose appropriate gifts."
  },
  {
    title: language === "sk" ? "Pre Vianoce" : "For Christmas",
    description: language === "sk" ?
    "Koniec s hádaním, čo darujú ostatní. Každý vidí, čo je už rezervované." :
    "No more guessing what others are giving. Everyone sees what's already reserved."
  }];


  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink-light via-white to-brand-pink/10">
      <Header user={user} onLogout={handleLogout} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-brand-blue leading-tight">
            {language === "sk" ?
            <>
                Prečo používať <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink-accent to-brand-pink-medium">Wishlisty</span>?
              </> :

            <>
                Why Use <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink-accent to-brand-pink-medium">Wishlists</span>?
              </>
            }
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {language === "sk" ?
            "Objavte všetky výhody moderného systému wishlistov pre vás a vašich blízkych." :
            "Discover all the benefits of a modern wishlist system for you and your loved ones."}
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-blue mb-12 text-center">
            {language === "sk" ? "Hlavné výhody" : "Main Benefits"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) =>
            <Card
              key={index}
              className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-3xl">

                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-pink-light to-brand-pink shadow-lg shadow-brand-pink/20">
                      <benefit.icon className="h-6 w-6 text-brand-pink-accent" />
                    </div>
                    <CardTitle className="text-xl text-brand-blue">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-brand-blue/5 to-brand-pink/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <BarChart3 className="h-10 w-10 text-brand-blue" />
              <h2 className="text-4xl font-bold text-brand-blue">
                {language === "sk" ? "Štatistiky, ktoré hovoria jasne" : "Statistics That Speak Clearly"}
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === "sk" ? 
                "Prečo je wishlist systém nevyhnutný pre moderné darovanie" : 
                "Why a Wishlist System is Essential for Modern Gift-Giving"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Stat 1 */}
            <Card className="border-2 border-red-100 bg-white hover:shadow-xl transition-all duration-300 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-red-50">
                    <TrendingDown className="h-7 w-7 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-5xl font-black text-red-500 mb-2">61%</div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {language === "sk" ?
                      "ľudí dostalo za posledný rok dar, ktorý nechceli" :
                      "of people received an unwanted gift last year"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stat 2 */}
            <Card className="border-2 border-orange-100 bg-white hover:shadow-xl transition-all duration-300 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-orange-50">
                    <ShoppingBag className="h-7 w-7 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-5xl font-black text-orange-500 mb-2">34%</div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {language === "sk" ?
                      "darov končí nevyužitých alebo odložených v skrini" :
                      "of gifts end up unused or stored in a closet"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stat 3 */}
            <Card className="border-2 border-purple-100 bg-white hover:shadow-xl transition-all duration-300 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-purple-50">
                    <Gift className="h-7 w-7 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-5xl font-black text-purple-500 mb-2">22%</div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {language === "sk" ?
                      "sa ďalej posúva alebo predáva" :
                      "gets regifted or resold"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stat 4 */}
            <Card className="border-2 border-blue-100 bg-white hover:shadow-xl transition-all duration-300 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-50">
                    <AlertCircle className="h-7 w-7 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-5xl font-black text-blue-500 mb-2">40–80€</div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {language === "sk" ?
                      "priemerný človek minie na darček, ktorý sa netrafí" :
                      "average person spends on a gift that misses the mark"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stat 5 - NEW: Stress/Frustration */}
            <Card className="border-2 border-amber-100 bg-white hover:shadow-xl transition-all duration-300 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-amber-50">
                    <Frown className="h-7 w-7 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-5xl font-black text-amber-600 mb-2">50%</div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {language === "sk" ?
                      "ľudí priznalo, že sa cítili stresovaní alebo frustrovaní pri hľadaní darčeku pre blízkeho" :
                      "of people admitted feeling stressed or frustrated when searching for a gift for someone close"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stat 6 - Duplicates moved down */}
            <Card className="border-2 border-green-100 bg-white hover:shadow-xl transition-all duration-300 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-green-50">
                    <Users className="h-7 w-7 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-5xl font-black text-green-600 mb-2">2–3</div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {language === "sk" ?
                      "ľudia pri rodinných sviatkoch kúpia rovnaký darček (typicky detské hračky, kozmetika, elektronika)" :
                      "people at family celebrations buy the same gift (typically kids' toys, cosmetics, electronics)"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 text-center">
            <p className="text-xl text-brand-blue font-semibold">
              {language === "sk" ?
              "✨ S ChcemMať tieto problémy odpadajú" :
              "✨ With ChcemMať these problems disappear"}
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 py-16 bg-white/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-blue mb-12 text-center">
            {language === "sk" ? "Kedy použiť wishlisty?" : "When to Use Wishlists?"}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) =>
            <Card
              key={index}
              className="border-0 bg-white hover:shadow-xl transition-all duration-300 rounded-2xl">

                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue to-brand-blue-dark flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-brand-blue">{useCase.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{useCase.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto border-0 bg-gradient-to-r from-brand-blue to-brand-blue-dark rounded-3xl shadow-2xl overflow-hidden">
          <CardContent className="p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              {language === "sk" ? "Vyskúšajte ChcemMať zadarmo!" : "Try ChcemMať for Free!"}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {language === "sk" ?
              "Vytvorte si bezplatný účet a začnite zdieľať svoje wishlisty ešte dnes!" :
              "Create a free account and start sharing your wishlists today!"}
            </p>
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100 font-semibold rounded-2xl px-12 py-6 text-lg shadow-xl">
                <Sparkles className="mr-2 h-5 w-5" />
                {t("get_started")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>);

}