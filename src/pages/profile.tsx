import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/router";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { User, Lock, Trash2, Settings, LogOut, ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { authService, User as AuthUserType } from "@/services/authService";
import { profileService, ProfileUpdate } from "@/services/profileService";

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t, language, setLanguage } = useLanguage();
  const [user, setUser] = useState<AuthUserType | null>(null);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [profileForm, setProfileForm] = useState({
    full_name: "",
    avatar_url: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  
  const [settings, setSettings] = useState({
      show_reservation_name: false,
      default_language: 'sk'
  });

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        router.push("/auth/login");
        return;
      }
      setUser(currentUser);
      setProfileForm({
        full_name: currentUser.full_name || "",
        avatar_url: currentUser.avatar_url || "",
      });
      setSettings({
          show_reservation_name: (currentUser as any).show_reservation_name || false,
          default_language: (currentUser as any).default_language || 'sk'
      })
    };
    fetchUser();
  }, [router]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const updates: ProfileUpdate = {
        full_name: profileForm.full_name,
        avatar_url: profileForm.avatar_url,
      };
      await profileService.updateProfile(user.id, updates);
      
      // refetch user
      const updatedUser = await authService.getCurrentUser();
      setUser(updatedUser);

      toast({
        title: t("success"),
        description: t("profile_updated"),
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: error.message || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: t("passwords_dont_match"),
      });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: t("password_too_short"),
      });
      return;
    }

    setPasswordLoading(true);
    try {
      await authService.updatePassword(passwordForm.newPassword);
      toast({
        title: t("success"),
        description: t("password_changed"),
      });
      setPasswordForm({ newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: error.message,
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSettingsUpdate = async (key: 'show_reservation_name' | 'default_language', value: any) => {
    if (!user) return;

    try {
        const updates: ProfileUpdate = { [key]: value };
        await profileService.updateProfile(user.id, updates);
        
        setSettings(prev => ({...prev, [key]: value}));
        
        if(key === 'default_language' && (value === 'sk' || value === 'en')) {
            setLanguage(value);
        }

        toast({
            title: t("success"),
            description: t("settings_updated"),
        });
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: t("error"),
            description: error.message || "Failed to update settings",
        });
    }
  };


  const handleDeleteAccount = async () => {
    // This needs to be implemented as a Supabase Edge function for security reasons.
    // Deleting a user should be handled server-side.
    console.log("Account deletion needs to be implemented server-side.");
    toast({
        title: "Feature not available",
        description: "Account deletion must be implemented securely on the server."
    })
  };

  const handleLogout = async () => {
    await authService.signOut();
    toast({
      title: t("success"),
      description: t("logged_out"),
    });
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink-light via-white to-brand-pink/10">
      <header className="border-b bg-white/80 backdrop-blur-sm border-brand-pink/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-brand-pink-light to-brand-pink p-2 rounded-2xl shadow-md shadow-brand-pink/20">
              <Logo className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-brand-blue">ChcemMať</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-brand-blue hover:bg-brand-pink-light rounded-xl"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t("sign_out")}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="text-brand-blue hover:bg-brand-pink-light rounded-xl mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("back_to_dashboard")}
          </Button>
          <h1 className="text-4xl font-bold text-brand-blue mb-2">{t("profile_settings")}</h1>
          <p className="text-gray-600">{t("manage_your_account")}</p>
        </div>

        <div className="space-y-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl text-brand-blue flex items-center gap-2">
                <User className="h-6 w-6" />
                {t("profile_information")}
              </CardTitle>
              <CardDescription>{t("update_your_profile")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-brand-blue font-semibold">
                    {t("full_name")}
                  </Label>
                  <Input
                    id="name"
                    value={profileForm.full_name}
                    onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                    disabled={loading}
                    className="rounded-xl border-brand-pink/30 focus:border-brand-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-brand-blue font-semibold">
                    {t("email")}
                  </Label>
                  <Input
                    id="email"
                    value={user.email || ""}
                    disabled
                    className="rounded-xl border-brand-pink/30 bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">{t("email_cannot_be_changed")}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo_url" className="text-brand-blue font-semibold">
                    {t("profile_photo_url")} ({t("optional")})
                  </Label>
                  <Input
                    id="photo_url"
                    type="url"
                    value={profileForm.avatar_url}
                    onChange={(e) => setProfileForm({ ...profileForm, avatar_url: e.target.value })}
                    disabled={loading}
                    className="rounded-xl border-brand-pink/30 focus:border-brand-blue"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-brand-blue to-brand-blue-dark hover:shadow-lg text-white font-semibold rounded-xl"
                >
                  {t("save_changes")}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl text-brand-blue flex items-center gap-2">
                <Lock className="h-6 w-6" />
                {t("change_password")}
              </CardTitle>
              <CardDescription>{t("update_your_password")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-brand-blue font-semibold">
                    {t("new_password")}
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                    }
                    disabled={passwordLoading}
                    className="rounded-xl border-brand-pink/30 focus:border-brand-blue"
                    minLength={6}
                  />
                  <p className="text-xs text-gray-500">{t("password_hint")}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmNewPassword" className="text-brand-blue font-semibold">
                    {t("confirm_new_password")}
                  </Label>
                  <Input
                    id="confirmNewPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                    }
                    disabled={passwordLoading}
                    className="rounded-xl border-brand-pink/30 focus:border-brand-blue"
                    minLength={6}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={passwordLoading}
                  className="bg-gradient-to-r from-brand-blue to-brand-blue-dark hover:shadow-lg text-white font-semibold rounded-xl"
                >
                  {t("change_password")}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl text-brand-blue flex items-center gap-2">
                <Settings className="h-6 w-6" />
                {t("preferences")}
              </CardTitle>
              <CardDescription>{t("customize_your_experience")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* TEMPORARILY HIDDEN - Not currently used
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-brand-pink-light/30 to-transparent rounded-2xl border border-brand-pink/20">
                <div className="flex-1">
                  <Label htmlFor="show-names" className="text-brand-blue font-semibold text-base">
                    {t("show_reservation_names")}
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">{t("show_reservation_names_desc")}</p>
                </div>
                <Switch
                  id="show-names"
                  checked={settings.show_reservation_name}
                  onCheckedChange={(checked) => handleSettingsUpdate('show_reservation_name', checked)}
                />
              </div>
              */}

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-brand-blue/10 to-transparent rounded-2xl border border-brand-blue/20">
                <div className="flex-1">
                  <Label className="text-brand-blue font-semibold text-base">
                    {t("language_preference")}
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">{t("choose_your_language")}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={language === "sk" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSettingsUpdate("default_language", "sk")}
                    className={
                      language === "sk"
                        ? "bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white rounded-xl"
                        : "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded-xl"
                    }
                  >
                    SK
                  </Button>
                  <Button
                    variant={language === "en" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSettingsUpdate("default_language", "en")}
                    className={
                      language === "en"
                        ? "bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white rounded-xl"
                        : "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded-xl"
                    }
                  >
                    EN
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-red-50/80 backdrop-blur-sm shadow-lg rounded-3xl border-2 border-red-200">
            <CardHeader>
              <CardTitle className="text-2xl text-red-600 flex items-center gap-2">
                <Trash2 className="h-6 w-6" />
                {t("danger_zone")}
              </CardTitle>
              <CardDescription className="text-red-700">
                {t("irreversible_actions")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-full rounded-xl font-semibold"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t("delete_account")}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-3xl border-0 shadow-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl text-red-600">
                      {t("confirm_delete_account")}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-base">
                      {t("delete_account_warning")}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">
                      {t("cancel")}
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
                    >
                      {t("delete_permanently")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
