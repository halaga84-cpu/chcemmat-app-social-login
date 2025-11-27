
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { authService } from "@/services/authService";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cookie } from "lucide-react";

export default function CookiesPage() {
  const { language } = useLanguage();
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink-light via-white to-brand-pink/10">
      <Header user={user} onLogout={handleLogout} />

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex p-4 rounded-3xl bg-gradient-to-br from-brand-pink-light to-brand-pink mb-6 shadow-xl shadow-brand-pink/20">
              <Cookie className="h-16 w-16 text-brand-pink-accent" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-brand-blue leading-tight">
              {language === "sk" ? "Cookies" : "Cookies"}
            </h1>
            <p className="text-xl text-gray-600">
              {language === "sk" 
                ? "Ako používame cookies na našej stránke" 
                : "How we use cookies on our website"}
            </p>
          </div>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl text-brand-blue">
                {language === "sk" ? "Politika používania cookies" : "Cookie Policy"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-600">
              {language === "sk" ? (
                <>
                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">1. Čo sú cookies?</h2>
                    <p>Cookies sú malé textové súbory, ktoré sa ukladajú vo vašom prehliadači pri návšteve webovej stránky. Pomáhajú nám poskytovať lepšie služby a zlepšovať vašu používateľskú skúsenosť.</p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">2. Aké cookies používame?</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-brand-blue mb-2">Nevyhnutné cookies</h3>
                        <p>Tieto cookies sú potrebné pre správne fungovanie stránky. Zahŕňajú autentifikáciu a základné funkcie aplikácie.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-blue mb-2">Funkčné cookies</h3>
                        <p>Uchovávajú vaše preferencie, ako napríklad jazykovú mutáciu a nastavenia aplikácie.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-blue mb-2">Analytické cookies</h3>
                        <p>Pomáhajú nám pochopiť, ako používatelia využívajú našu stránku, aby sme ju mohli zlepšovať.</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">3. Ako spravovať cookies?</h2>
                    <p>Väčšina prehliadačov umožňuje spravovať cookies v nastaveniach. Môžete blokovať alebo vymazať cookies, ale niektoré funkcie stránky potom nemusia správne fungovať.</p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">4. Cookies tretích strán</h2>
                    <p>Používame cookies od tretích strán pre analytické účely (napr. Google Analytics) a autentifikáciu (Google OAuth). Tieto služby majú vlastné pravidlá ochrany osobných údajov.</p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">5. Zmeny v politike cookies</h2>
                    <p>Túto politiku môžeme priebežne aktualizovať. Odporúčame pravidelne kontrolovať túto stránku pre aktuálne informácie.</p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">6. Kontakt</h2>
                    <p>Pre otázky týkajúce sa cookies nás kontaktujte na info@chcemmat.sk.</p>
                  </section>
                </>
              ) : (
                <>
                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">1. What are Cookies?</h2>
                    <p>Cookies are small text files stored in your browser when you visit a website. They help us provide better services and improve your user experience.</p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">2. What Cookies Do We Use?</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-brand-blue mb-2">Essential Cookies</h3>
                        <p>These cookies are necessary for the website to function properly. They include authentication and basic application features.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-blue mb-2">Functional Cookies</h3>
                        <p>They store your preferences, such as language settings and application configurations.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-blue mb-2">Analytical Cookies</h3>
                        <p>They help us understand how users interact with our website so we can improve it.</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">3. How to Manage Cookies?</h2>
                    <p>Most browsers allow you to manage cookies in settings. You can block or delete cookies, but some website features may not work properly.</p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">4. Third-Party Cookies</h2>
                    <p>We use third-party cookies for analytical purposes (e.g., Google Analytics) and authentication (Google OAuth). These services have their own privacy policies.</p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">5. Changes to Cookie Policy</h2>
                    <p>We may update this policy periodically. We recommend checking this page regularly for current information.</p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">6. Contact</h2>
                    <p>For questions regarding cookies, contact us at info@chcemmat.sk.</p>
                  </section>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
