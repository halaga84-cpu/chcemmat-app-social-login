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
import { Mail, Lock, ArrowRight } from "lucide-react";
import { authService } from "@/services/authService";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: t("passwords_dont_match"),
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: t("password_too_short"),
      });
      return;
    }

    setLoading(true);

    try {
      await authService.signUp(formData.email, formData.password, formData.name);
      toast({
        title: t("registration_successful"),
        description: t("please_verify_email"),
      });
      router.push("/auth/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: error.message || t("registration_error"),
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
              {t("create_account")}
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              {t("register_description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-brand-blue font-semibold flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  {t("full_name")}
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={loading}
                  className="rounded-xl border-brand-pink/30 focus:border-brand-blue"
                  placeholder={t("enter_name")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-brand-blue font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t("email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={loading}
                  className="rounded-xl border-brand-pink/30 focus:border-brand-blue"
                  placeholder={t("enter_password")}
                  minLength={6}
                />
                <p className="text-xs text-gray-500">{t("password_hint")}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-brand-blue font-semibold flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  {t("confirm_password")}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  disabled={loading}
                  className="rounded-xl border-brand-pink/30 focus:border-brand-blue"
                  placeholder={t("confirm_password_placeholder")}
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand-blue to-brand-blue-dark hover:shadow-xl text-white font-semibold rounded-xl py-6 text-lg"
              >
                {loading ? t("creating_account") : t("create_account")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t("already_have_account")}{" "}
                <Link href="/auth/login" className="text-brand-blue font-semibold hover:underline">
                  {t("sign_in")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
