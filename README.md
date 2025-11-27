
# ChcemMať - Smart Wishlist App

A modern, full-stack wishlist application built with Next.js that allows users to create and share wishlists with friends and family. Each item can have images, prices, descriptions, and product links. The app supports item reservations by anyone without requiring registration.

## 🎯 Features

### Core Functionality
- **User Authentication**: Email/password registration and login with localStorage-based auth
- **Wishlist Management**: Create up to 50 wishlists per user
- **Item Management**: Add items with images, prices, descriptions, and product links
- **Public Sharing**: Share wishlists via unique URLs
- **Anonymous Reservations**: Anyone can reserve items without registration
- **Privacy Controls**: Toggle visibility of who reserved items
- **Multilingual**: Full support for Slovak and English

### Technical Features
- **PWA Support**: Add to home screen functionality
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark/Light Mode**: Theme switching with system preference detection
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Type Safety**: Full TypeScript implementation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd chcemmat
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   └── ui/          # shadcn/ui components
├── contexts/        # React contexts (Theme, Language)
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and helpers
│   ├── auth.ts      # Authentication logic
│   ├── storage.ts   # LocalStorage management
│   ├── translations.ts  # Language translations
│   └── utils.ts     # General utilities
├── pages/           # Next.js pages
│   ├── auth/        # Authentication pages
│   ├── wishlist/    # Wishlist view pages
│   ├── dashboard.tsx # User dashboard
│   ├── profile.tsx  # User profile settings
│   └── index.tsx    # Landing page
├── styles/          # Global styles
└── types/           # TypeScript type definitions
```

## 🗂 Data Structure

### User
```typescript
{
  id: string
  email: string
  name: string
  photo_url?: string
  settings: {
    default_language: "sk" | "en"
    show_reservation_name: boolean
  }
  created_at: string
}
```

### Wishlist
```typescript
{
  id: string
  user_id: string
  title: string
  description: string
  cover_image_url?: string
  is_public: boolean
  share_slug: string
  created_at: string
}
```

### Item
```typescript
{
  id: string
  wishlist_id: string
  title: string
  description?: string
  price?: number
  product_url?: string
  affiliate_url?: string
  image_url?: string
  status: "available" | "reserved" | "purchased"
  created_at: string
}
```

### Reservation
```typescript
{
  id: string
  item_id: string
  reserver_name: string
  reserver_email?: string
  message?: string
  created_at: string
}
```

## 🎨 Customization

### Colors
Edit `src/styles/globals.css` to customize the color scheme:
```css
:root {
  --brand-primary: #your-color;
  --brand-secondary: #your-color;
}
```

### Translations
Add or modify translations in `src/lib/translations.ts`:
```typescript
export const translations = {
  sk: { key: "Slovak text" },
  en: { key: "English text" }
}
```

## 🔐 Authentication

Currently uses localStorage-based authentication for MVP. To integrate a real backend:

1. Connect Supabase in project settings
2. Update `src/lib/auth.ts` to use Supabase Auth
3. Update `src/lib/storage.ts` to use Supabase Database

## 📱 PWA Configuration

The app is configured as a Progressive Web App. Users can install it on their devices:

- **Mobile**: Tap "Add to Home Screen" in browser menu
- **Desktop**: Click install icon in address bar

Manifest configuration: `public/manifest.json`

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Environment Variables (Optional)
For future backend integration:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
```

## 🔮 Future Enhancements

- **Backend Integration**: Supabase/Firebase for persistent data
- **Google OAuth**: Social login
- **Affiliate Links**: Automatic affiliate link generation
- **Email Notifications**: Password reset, reservation alerts
- **Image Upload**: Direct image upload to storage
- **Advanced Features**: Product alternatives, price comparisons
- **Premium Plan**: Additional features for power users

## 📝 License

This project is for demonstration purposes. Customize as needed for your use case.

## 🤝 Contributing

This is an MVP project. For production use, consider:
- Implementing proper backend authentication
- Adding email verification
- Setting up a real database
- Implementing proper error handling
- Adding analytics and monitoring
- Writing comprehensive tests

## 💡 Tips

1. **Data Persistence**: Currently uses localStorage. Data is device-specific.
2. **50 Wishlist Limit**: Enforced in UI and storage logic.
3. **Privacy**: Reservation names only visible if owner enables it.
4. **Sharing**: Each wishlist has a unique slug for public sharing.

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ using Next.js, TypeScript, and shadcn/ui
