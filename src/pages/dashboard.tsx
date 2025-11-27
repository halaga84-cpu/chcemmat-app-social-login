import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/router";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { PlusCircle, Settings, Copy, Trash2, Edit, LogOut, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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
import { authService, User } from "@/services/authService";
import { wishlistService, Wishlist } from "@/services/wishlistService";
import { itemService, Item } from "@/services/itemService";
import { reservationService, Reservation } from "@/services/reservationService";

interface WishlistWithItems extends Wishlist {
  items?: (Item & { reservation?: Reservation })[];
}

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();

  const [user, setUser] = useState<User>(null);
  const [wishlists, setWishlists] = useState<WishlistWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  const [newWishlist, setNewWishlist] = useState({
    title: "",
    description: "",
    cover_image_url: "",
  });
  const [editingWishlist, setEditingWishlist] = useState<Wishlist | null>(null);

  useEffect(() => {
    const fetchUserAndWishlists = async () => {
      setLoading(true);
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        router.push("/auth/login");
        return;
      }
      setUser(currentUser);
      try {
        const userWishlists = await wishlistService.getWishlistsByUser(currentUser.id);
        
        const wishlistsWithItems = await Promise.all(
          userWishlists.map(async (wishlist) => {
            try {
              const items = await itemService.getItemsByWishlist(wishlist.id);
              const itemsWithReservations = await Promise.all(
                items.map(async (item) => {
                  if (item.status === "reserved") {
                    try {
                      const reservation = await reservationService.getReservationByItem(item.id);
                      return { ...item, reservation };
                    } catch (error) {
                      return item;
                    }
                  }
                  return item;
                })
              );
              return { ...wishlist, items: itemsWithReservations };
            } catch (error) {
              return { ...wishlist, items: [] };
            }
          })
        );
        
        setWishlists(wishlistsWithItems);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: t("error"),
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndWishlists();
  }, [router, t, toast]);
  
  const generateShareSlug = () => {
    return Math.random().toString(36).substring(2, 12);
  };

  const handleCreateWishlist = async () => {
    if (!user) return;
    try {
      const createdWishlist = await wishlistService.createWishlist({
        ...newWishlist,
        user_id: user.id,
        share_slug: generateShareSlug(),
      });
      setWishlists([{ ...createdWishlist, items: [] }, ...wishlists]);
      setNewWishlist({ title: "", description: "", cover_image_url: "" });
      toast({
        title: t("success"),
        description: t("dashboard_wishlist_created"),
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: error.message,
      });
    }
  };

  const handleUpdateWishlist = async () => {
    if (!editingWishlist) return;
    try {
      const updatedWishlist = await wishlistService.updateWishlist(editingWishlist.id, {
        title: editingWishlist.title,
        description: editingWishlist.description,
        cover_image_url: editingWishlist.cover_image_url,
      });
      setWishlists(
        wishlists.map((w) => (w.id === updatedWishlist.id ? { ...updatedWishlist, items: w.items } : w))
      );
      setEditingWishlist(null);
      toast({
        title: t("success"),
        description: t("dashboard_wishlist_updated"),
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: error.message,
      });
    }
  };

  const handleDeleteWishlist = async (id: string) => {
    try {
      await wishlistService.deleteWishlist(id);
      setWishlists(wishlists.filter((w) => w.id !== id));
      toast({
        title: t("success"),
        description: t("dashboard_wishlist_deleted"),
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: error.message,
      });
    }
  };

  const copyShareLink = (slug: string) => {
    const url = `${window.location.origin}/wishlist/${slug}`;
    navigator.clipboard.writeText(url);
    toast({ title: t("dashboard_link_copied") });
  };
  
  const handleLogout = async () => {
    await authService.signOut();
    toast({
      title: t("success"),
      description: t("logged_out"),
    });
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-brand-pink-light to-white">
        <div className="flex flex-col items-center gap-4">
          <Logo className="h-20 w-20 animate-pulse" />
          <p className="text-brand-blue font-semibold">{t("loading")}...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink-light via-white to-brand-pink/10">
       <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-sm border-brand-pink/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-brand-pink-light to-brand-pink p-2 rounded-2xl shadow-md shadow-brand-pink/20">
              <Logo className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-brand-blue">ChcemMať</h1>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/profile">
              <Button
                variant="ghost"
                size="sm"
                className="text-brand-blue hover:bg-brand-pink-light rounded-xl"
              >
                <Settings className="h-4 w-4 mr-2" />
                {t("settings")}
              </Button>
            </Link>
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
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-brand-blue mb-2">
              {t("dashboard_title")}
            </h1>
            <p className="text-gray-600">
              {t("dashboard_subtitle").replace("{name}", user.full_name || user.email || "User")}
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-brand-blue to-brand-blue-dark hover:shadow-lg text-white font-semibold rounded-xl">
                <PlusCircle className="mr-2 h-4 w-4" />
                {t("dashboard_create_wishlist")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-3xl border-0 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl text-brand-blue">{t("dashboard_create_wishlist")}</DialogTitle>
                <DialogDescription>{t("dashboard_create_wishlist_desc")}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">{t("title")}</Label>
                  <Input
                    id="title"
                    value={newWishlist.title}
                    onChange={(e) => setNewWishlist({ ...newWishlist, title: e.target.value })}
                    className="col-span-3 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">{t("description")}</Label>
                  <Textarea
                    id="description"
                    value={newWishlist.description}
                    onChange={(e) => setNewWishlist({ ...newWishlist, description: e.target.value })}
                    className="col-span-3 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cover" className="text-right">{t("cover_image_url")}</Label>
                  <Input
                    id="cover"
                    value={newWishlist.cover_image_url}
                    onChange={(e) => setNewWishlist({ ...newWishlist, cover_image_url: e.target.value })}
                    className="col-span-3 rounded-xl"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <DialogFooter>
                 <DialogClose asChild>
                    <Button type="button" onClick={handleCreateWishlist}>{t("create")}</Button>
                 </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {wishlists.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-brand-pink/20">
            <h2 className="text-2xl font-semibold text-brand-blue">{t("dashboard_no_wishlists")}</h2>
            <p className="text-gray-600 mt-2">{t("dashboard_no_wishlists_desc")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlists.map((wishlist) => {
              const reservedItems = wishlist.items?.filter(item => item.status === "reserved") || [];
              
              return (
                <Card key={wishlist.id} className="border-0 bg-white/80 backdrop-blur-sm shadow-lg rounded-3xl overflow-hidden flex flex-col">
                  <CardHeader className="p-0">
                    <Link href={`/wishlist/${wishlist.share_slug}`}>
                      {wishlist.cover_image_url ? (
                        <img
                          src={wishlist.cover_image_url}
                          alt={wishlist.title}
                          className="w-full h-40 object-cover hover:opacity-90 transition-opacity"
                        />
                      ) : (
                        <div className="w-full h-40 bg-gradient-to-br from-brand-pink-light to-brand-pink flex items-center justify-center hover:opacity-90 transition-opacity">
                          <Logo className="h-20 w-20" />
                        </div>
                      )}
                    </Link>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                     <Link href={`/wishlist/${wishlist.share_slug}`}>
                      <CardTitle className="text-xl font-bold text-brand-blue hover:underline">{wishlist.title}</CardTitle>
                    </Link>
                    <CardDescription className="mt-2 text-gray-600">{wishlist.description}</CardDescription>
                    
                    {reservedItems.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-semibold text-brand-blue">{t("reserved_items")}:</h4>
                        {reservedItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-2 bg-brand-pink-light/30 rounded-lg">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-brand-blue truncate">{item.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-4 bg-white/50 border-t border-brand-pink/10 flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-brand-blue hover:bg-brand-pink-light rounded-xl"
                      onClick={() => copyShareLink(wishlist.share_slug)}
                    >
                      <Copy className="h-4 w-4 mr-2" /> {t("share")}
                    </Button>
                    <div className="flex gap-2">
                      <Dialog onOpenChange={(open) => !open && setEditingWishlist(null)}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-brand-blue/50 text-brand-blue hover:bg-brand-blue hover:text-white rounded-full h-8 w-8"
                            onClick={() => setEditingWishlist(wishlist)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        {editingWishlist && editingWishlist.id === wishlist.id && (
                           <DialogContent className="sm:max-w-[425px] rounded-3xl border-0 shadow-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-2xl text-brand-blue">{t("dashboard_edit_wishlist")}</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-title" className="text-right">{t("title")}</Label>
                                <Input
                                  id="edit-title"
                                  value={editingWishlist.title}
                                  onChange={(e) => setEditingWishlist({ ...editingWishlist, title: e.target.value })}
                                  className="col-span-3 rounded-xl"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-description" className="text-right">{t("description")}</Label>
                                <Textarea
                                  id="edit-description"
                                  value={editingWishlist.description || ""}
                                  onChange={(e) => setEditingWishlist({ ...editingWishlist, description: e.target.value })}
                                  className="col-span-3 rounded-xl"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-cover" className="text-right">{t("cover_image_url")}</Label>
                                <Input
                                  id="edit-cover"
                                  value={editingWishlist.cover_image_url || ""}
                                  onChange={(e) => setEditingWishlist({ ...editingWishlist, cover_image_url: e.target.value })}
                                  className="col-span-3 rounded-xl"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button type="button" onClick={handleUpdateWishlist}>{t("save_changes")}</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        )}
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="rounded-full h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-3xl border-0 shadow-2xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl text-red-600">{t("confirm_delete_wishlist")}</AlertDialogTitle>
                            <AlertDialogDescription>{t("delete_wishlist_warning")}</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-xl">{t("cancel")}</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteWishlist(wishlist.id)} className="bg-red-600 hover:bg-red-700 text-white rounded-xl">
                              {t("delete")}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
