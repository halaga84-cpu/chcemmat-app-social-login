
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { authService } from "@/services/authService";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function GDPRPage() {
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
              <Shield className="h-16 w-16 text-brand-pink-accent" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-brand-blue leading-tight">
              {language === "sk" ? "Ochrana osobných údajov" : "Data Protection"}
            </h1>
            <p className="text-xl text-gray-600">
              {language === "sk" 
                ? "GDPR a ochrana vašich osobných údajov" 
                : "GDPR and protection of your personal data"}
            </p>
          </div>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl text-brand-blue">
                {language === "sk" ? "Všeobecné nariadenie o ochrane údajov (GDPR)" : "General Data Protection Regulation (GDPR)"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-600">
              {language === "sk" ? (
                <>
                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">1. Správca údajov</h2>
                    <p>Správcom vašich osobných údajov je ChcemMať.sk. Kontaktovať nás môžete na adrese info@chcemmat.sk.</p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">2. Aké údaje zbierame</h2>
                    <p>Pri registrácii zbierame:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Email adresu</li>
                      <li>Meno a priezvisko</li>
                      <li>Profilový obrázok (voliteľné)</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">3. Účel spracovania údajov</h2>
                    <p>Vaše údaje používame na:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Poskytovanie služieb aplikácie ChcemMať</li>
                      <li>Komunikáciu s vami</li>
                      <li>Zlepšovanie našich služieb</li>
                      <li>Zabezpečenie účtu a autentifikáciu</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">4. Vaše práva</h2>
                    <p>Máte právo na:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Prístup k vašim osobným údajom</li>
                      <li>Opravu nesprávnych údajov</li>
                      <li>Vymazanie údajov</li>
                      <li>Prenosnosť údajov</li>
                      <li>Odvolanie súhlasu so spracovaním</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">5. Bezpečnosť údajov</h2>
                    <p>Vaše heslá sú zabezpečené pomocou hashovania. Všetky údaje sú uložené na bezpečných serveroch s SSL šifrovaním.</p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">6. Kontakt</h2>
                    <p>Pre uplatnenie vašich práv alebo akékoľvek otázky týkajúce sa ochrany osobných údajov nás kontaktujte na info@chcemmat.sk.</p>
                  </section>
                </>
              ) : (
                <>
                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">1. Data Controller</h2>
                    <p>The controller of your personal data is ChcemMať.sk. You can contact us at info@chcemmat.sk.</p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">2. What Data We Collect</h2>
                    <p>During registration we collect:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Email address</li>
                      <li>Full name</li>
                      <li>Profile picture (optional)</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">3. Purpose of Data Processing</h2>
                    <p>We use your data for:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Providing ChcemMať application services</li>
                      <li>Communication with you</li>
                      <li>Improving our services</li>
                      <li>Account security and authentication</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">4. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Access your personal data</li>
                      <li>Rectification of incorrect data</li>
                      <li>Erasure of data</li>
                      <li>Data portability</li>
                      <li>Withdraw consent for processing</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">5. Data Security</h2>
                    <p>Your passwords are secured using hashing. All data is stored on secure servers with SSL encryption.</p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-brand-blue mb-3">6. Contact</h2>
                    <p>To exercise your rights or for any questions regarding personal data protection, contact us at info@chcemmat.sk.</p>
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
