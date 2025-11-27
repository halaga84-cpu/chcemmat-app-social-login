import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/router";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { authService } from "@/services/authService";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { SocialLogin } from "@/components/SocialLogin";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.signIn(email, password);
      toast({
        title: t("success"),
        description: t("login_successful"),
      });
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: error.message || t("login_error"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-pink-light via-white to-brand-blue/10 flex flex-col">
      <header className="border-b bg-white/80 backdrop-blur-sm border-brand-pink/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-brand-pink-light to-brand-pink p-2 rounded-2xl shadow-md shadow-brand-pink/20">
              <Logo className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-brand-blue">ChcemMať</h1>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-0 bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-brand-pink-light to-brand-pink p-4 rounded-3xl shadow-lg shadow-brand-pink/20">
                <Logo className="h-12 w-12" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-center text-brand-blue">
              {t("welcome_back")}
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              {t("login_description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-brand-blue font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t("email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="rounded-xl border-brand-pink/30 focus:border-brand-blue"
                  placeholder={t("enter_email")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-brand-blue font-semibold flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  {t("password")}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="rounded-xl border-brand-pink/30 focus:border-brand-blue"
                  placeholder={t("enter_password")}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand-blue to-brand-blue-dark hover:shadow-xl text-white font-semibold rounded-xl py-6 text-lg"
              >
                {loading ? t("signing_in") : t("sign_in")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            <SocialLogin />

            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-gray-600">
                {t("dont_have_account")}{" "}
                <Link href="/auth/register" className="text-brand-blue font-semibold hover:underline">
                  {t("create_account")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
