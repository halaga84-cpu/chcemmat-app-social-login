import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { wishlistService, type Wishlist } from "@/services/wishlistService";
import { itemService, type Item } from "@/services/itemService";
import { reservationService } from "@/services/reservationService";
import { Share2, Gift, ExternalLink, Check, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/Logo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authService, User } from "@/services/authService";

export default function WishlistViewPage() {
  const { language, t } = useLanguage();
  const router = useRouter();
  const { slug } = router.query;
  const { toast } = useToast();
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isEditItemOpen, setIsEditItemOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [itemForm, setItemForm] = useState({
    title: "",
    description: "",
    price: "",
    product_url: "",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && slug && typeof slug === "string") {
      loadWishlist(slug);
    }
  }, [isMounted, slug]);

  const loadWishlist = async (shareSlug: string) => {
    setIsLoading(true);
    setNotFound(false);

    try {
      const foundWishlist = await wishlistService.getWishlistBySlug(shareSlug);
      
      if (!foundWishlist) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      setWishlist(foundWishlist);
      
      const wishlistItems = await itemService.getItemsByWishlist(foundWishlist.id);
      setItems(wishlistItems);

      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setIsOwner(currentUser?.id === foundWishlist.user_id);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading wishlist:", error);
      setNotFound(true);
      setIsLoading(false);
    }
  };

  const handleQuickReserve = async (itemId: string) => {
    try {
      await reservationService.createReservation({
        item_id: itemId,
        reserver_name: "Anonymous",
      });

      toast({ 
        title: t("item_reservation_success_toast"),
        description: t("reservation_thanks")
      });
      
      if (wishlist) {
        await loadWishlist(wishlist.share_slug);
      }
    } catch (error: any) {
      toast({ 
        variant: "destructive",
        title: t("error"),
        description: error.message || (language === "sk" ? "Položka už je rezervovaná" : "Item is already reserved")
      });
    }
  };

  const handleItemSubmit = async () => {
    if (!wishlist || !isOwner) return;
    if (!itemForm.title.trim()) {
      toast({ variant: "destructive", title: t("enter_item_title") });
      return;
    }

    try {
      if (editingItem) {
        await itemService.updateItem(editingItem.id, {
          title: itemForm.title,
          description: itemForm.description || undefined,
          price: itemForm.price ? parseFloat(itemForm.price) : undefined,
          product_url: itemForm.product_url || undefined,
        });
        toast({ title: t("item_updated") });
      } else {
        await itemService.createItem({
          wishlist_id: wishlist.id,
          title: itemForm.title,
          description: itemForm.description || undefined,
          price: itemForm.price ? parseFloat(itemForm.price) : undefined,
          product_url: itemForm.product_url || undefined,
        });
        toast({ title: t("item_created") });
      }
      
      await loadWishlist(wishlist.share_slug);
      resetItemForm();
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: t("error"), 
        description: error.message 
      });
    }
  };

  const resetItemForm = () => {
    setItemForm({ title: "", description: "", price: "", product_url: "" });
    setIsAddItemOpen(false);
    setIsEditItemOpen(false);
    setEditingItem(null);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      resetItemForm();
    } else {
      if (editingItem) {
        setIsEditItemOpen(true);
      } else {
        setIsAddItemOpen(true);
      }
    }
  };

  const openEditDialog = (item: Item) => {
    setEditingItem(item);
    setItemForm({
      title: item.title,
      description: item.description || "",
      price: item.price?.toString() || "",
      product_url: item.product_url || "",
    });
    setIsEditItemOpen(true);
  };
  
  const handleDeleteItem = async (itemId: string) => {
    if (!isOwner) return;
    
    try {
      await itemService.deleteItem(itemId);
      if (wishlist) await loadWishlist(wishlist.share_slug);
      toast({ title: t("item_deleted") });
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: t("error"), 
        description: error.message 
      });
    }
  };

  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-brand-pink-light via-white to-brand-pink/10 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex p-6 rounded-3xl bg-gradient-to-br from-brand-pink-light to-brand-pink shadow-lg shadow-brand-pink/20 animate-pulse">
            <Logo className="h-16 w-16" />
          </div>
          <p className="text-xl text-brand-blue font-semibold">{language === "sk" ? "Načítavam wishlist..." : "Loading wishlist..."}</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-brand-pink-light via-white to-brand-pink/10">
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
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex p-6 rounded-3xl bg-gradient-to-br from-brand-pink-light to-brand-pink mb-6 shadow-lg shadow-brand-pink/20">
              <Gift className="h-20 w-20 text-brand-pink-accent" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-brand-blue">{language === "sk" ? "Wishlist nebol nájdený" : "Wishlist Not Found"}</h1>
            <p className="text-xl text-gray-600 mb-8">{language === "sk" ? "Tento wishlist neexistuje alebo bol zmazaný." : "This wishlist doesn't exist or has been deleted."}</p>
            <Button onClick={() => router.push("/")} className="bg-gradient-to-r from-brand-blue to-brand-blue-dark hover:shadow-xl text-white font-semibold rounded-2xl px-8 py-6 text-lg">
              {language === "sk" ? "Späť na domovskú stránku" : "Back to Homepage"}
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (!wishlist) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink-light via-white to-brand-pink/10">
      <header className="border-b bg-white/80 backdrop-blur-sm border-brand-pink/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={isOwner ? "/dashboard" : "/"} className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-brand-pink-light to-brand-pink p-2 rounded-2xl shadow-md shadow-brand-pink/20">
              <Logo className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-brand-blue">ChcemMať</h1>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {wishlist.cover_image_url ? (
            <div className="aspect-[21/9] w-full overflow-hidden rounded-3xl mb-8 border-2 border-brand-pink/20 shadow-xl">
              <img src={wishlist.cover_image_url} alt={wishlist.title} className="w-full h-full object-cover"/>
            </div>
          ) : (
            <div className="aspect-[21/9] w-full overflow-hidden rounded-3xl mb-8 border-2 border-brand-pink/20 shadow-xl bg-gradient-to-br from-brand-pink-light to-brand-pink flex items-center justify-center">
              <Logo className="h-32 w-32" />
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-2 text-brand-blue">{wishlist.title}</h2>
              <p className="text-lg text-gray-600">{wishlist.description}</p>
            </div>
            <div className="flex gap-2">
              {isOwner && (
                <Button onClick={() => setIsAddItemOpen(true)} className="bg-gradient-to-r from-brand-pink-accent to-brand-pink-medium hover:shadow-xl text-white font-semibold rounded-2xl">
                  <Gift className="mr-2 h-4 w-4" />
                  {t("add_item")}
                </Button>
              )}
              <Button variant="outline" className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded-2xl font-semibold" onClick={() => { navigator.clipboard.writeText(window.location.href); toast({ title: t("link_copied") }); }}>
                <Share2 className="mr-2 h-4 w-4" />
                {t("share")}
              </Button>
            </div>
          </div>

          {items.length === 0 ? (
            <Card className="py-16 text-center border-0 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg">
              <CardContent>
                <div className="inline-flex p-6 rounded-3xl bg-gradient-to-br from-brand-pink-light to-brand-pink mb-6 shadow-lg shadow-brand-pink/20">
                  <Gift className="h-20 w-20 text-brand-pink-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-brand-blue">{t("no_items_yet")}</h3>
                <p className="text-gray-600">{isOwner ? t("no_wishlists_desc") : (language === "sk" ? "Vlastník ešte nepridál žiadne položky" : "The owner hasn't added any items yet")}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {items.map((item, index) => (
                <Card key={item.id} className={`border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-3xl overflow-hidden ${item.status === "reserved" ? "opacity-75" : ""}`}>
                  {item.image_url && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-2xl font-bold text-brand-pink-accent">{index + 1}.</span>
                        <CardTitle className="flex-1 text-brand-blue text-2xl">{item.title}</CardTitle>
                      </div>
                      {item.status === "reserved" && (
                        <Badge variant="secondary" className="bg-gradient-to-r from-brand-pink-accent to-brand-pink-medium text-white rounded-xl">
                          <Check className="h-3 w-3 mr-1" />{t("item_reserved_label")}
                        </Badge>
                      )}
                    </div>
                    {item.price && <p className="text-2xl font-bold text-brand-pink-accent ml-10">€{item.price.toFixed(2)}</p>}
                    <CardDescription className="text-gray-600 ml-10">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {item.product_url && (
                      <Link href={item.product_url} target="_blank" className="block">
                        <Button variant="outline" className="w-full border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded-xl font-semibold">
                          <ExternalLink className="mr-2 h-4 w-4" />{t("view_product")}
                        </Button>
                      </Link>
                    )}
                    
                    {!isOwner && item.status !== "reserved" && (
                      <Button 
                        className="w-full bg-gradient-to-r from-brand-pink-accent to-brand-pink-medium hover:shadow-xl text-white font-semibold rounded-xl" 
                        onClick={() => handleQuickReserve(item.id)}
                      >
                        <Gift className="mr-2 h-4 w-4" />
                        {t("reserve_item_simple")}
                      </Button>
                    )}
                    
                    {!isOwner && item.status === "reserved" && (
                      <Button 
                        disabled 
                        className="w-full bg-gray-400 text-white rounded-xl font-semibold cursor-not-allowed"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        {t("item_reserved_label")}
                      </Button>
                    )}
                    
                    {isOwner && (
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded-xl" onClick={() => openEditDialog(item)}>
                          <Edit className="mr-2 h-4 w-4" />{t("edit")}
                        </Button>
                        <Button variant="destructive" className="flex-1 rounded-xl" onClick={() => handleDeleteItem(item.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />{t("delete")}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Dialog open={isAddItemOpen || isEditItemOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="rounded-3xl border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-brand-blue">{editingItem ? t("edit_item") : t("add_item")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="item-title" className="text-brand-blue font-semibold">{t("title")} *</Label>
              <Input id="item-title" value={itemForm.title} onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })} className="rounded-xl border-brand-pink/30 focus:border-brand-blue"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-description" className="text-brand-blue font-semibold">{t("description")}</Label>
              <Textarea id="item-description" value={itemForm.description} onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })} className="rounded-xl border-brand-pink/30 focus:border-brand-blue"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-price" className="text-brand-blue font-semibold">{t("price")} (€)</Label>
              <Input id="item-price" type="number" step="0.01" value={itemForm.price} onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })} className="rounded-xl border-brand-pink/30 focus:border-brand-blue"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-url" className="text-brand-blue font-semibold">{t("product_link")}</Label>
              <Input id="item-url" value={itemForm.product_url} onChange={(e) => setItemForm({ ...itemForm, product_url: e.target.value })} className="rounded-xl border-brand-pink/30 focus:border-brand-blue"/>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleItemSubmit} disabled={!itemForm.title.trim()} className="bg-gradient-to-r from-brand-pink-accent to-brand-pink-medium hover:shadow-lg text-white font-semibold rounded-xl">
              {editingItem ? t("save") : t("add")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
