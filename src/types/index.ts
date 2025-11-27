
export interface User {
  id: string;
  email: string;
  name: string;
  photo_url?: string;
  created_at: string;
  settings: {
    default_language: "sk" | "en";
    show_reservation_name: boolean;
  };
}

export interface Wishlist {
  id: string;
  user_id: string;
  title: string;
  description: string;
  cover_image_url?: string;
  is_public: boolean;
  share_slug: string;
  created_at: string;
}

export interface Item {
  id: string;
  wishlist_id: string;
  title: string;
  description?: string;
  price?: number;
  product_url?: string;
  affiliate_url?: string;
  image_url?: string;
  status: "available" | "reserved" | "purchased";
  reserved?: boolean;
  reservedAt?: string;
  reservedBy?: string;
  created_at: string;
}

export interface Reservation {
  id: string;
  item_id: string;
  reserver_name: string;
  reserver_email?: string;
  message?: string;
  created_at: string;
}
