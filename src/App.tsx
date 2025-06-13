import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.js";
import { Footer } from "./components/layout/Footer.js";
import { Header } from "./components/layout/Header.js";
import { Dashboard } from "@/components/dashboard/dashboard.js";
import { ProfilePage } from "@/components/profile/profile.js";
import { LoginPage } from "@/components/auth/login.js";
import { RegisterPage } from "@/components/auth/register.js";
import { AuthProvider, RequireAuth } from "./context/auth-context.js";
import { ProductsPage } from "./pages/products.js";
import { CampaignDetailPage } from "./pages/campaign-detail.js";
import { CheckoutSuccessPage } from "./pages/checkout-success.js";
import { Toaster } from "@/components/ui/sonner.js";
import { HeroSection, FeaturedProducts, InstructionsSection, PopularCampaigns, Mission } from "@/components/home";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <InstructionsSection />
        <PopularCampaigns />
        <FeaturedProducts />
        <Mission />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Toaster position="top-center" />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/campaign/:id" element={<CampaignDetailPage />} />
            <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route path="/about" element={<div className="container py-12"><h1>About Us</h1></div>} />
            <Route path="/how-it-works" element={<div className="container py-12"><h1>How It Works</h1></div>} />
            <Route path="/faq" element={<div className="container py-12"><h1>FAQ</h1></div>} />
            <Route path="/privacy" element={<div className="container py-12"><h1>Privacy Policy</h1></div>} />
            <Route path="/terms" element={<div className="container py-12"><h1>Terms of Service</h1></div>} />
            <Route path="/contact" element={<div className="container py-12"><h1>Contact Us</h1></div>} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App