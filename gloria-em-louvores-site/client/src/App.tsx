import { useState } from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminBlog from "@/pages/AdminBlog";
import BlogList from "@/pages/BlogList";
import BlogPost from "@/pages/BlogPost";
import ContactForm from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfUse from "@/pages/TermsOfUse";
import CategoryHub from "@/pages/CategoryHub";
import ReadingPlan from "@/pages/ReadingPlan";
import MaterialsAndNotebook from "@/pages/MaterialsAndNotebook";
import CommunityPrayer from "@/pages/CommunityPrayer";
import AboutUs from "@/pages/AboutUs";
import CookiePolicy from "@/pages/CookiePolicy";
import AffiliateTransparency from "@/pages/AffiliateTransparency";
import CookieBanner from "@/components/CookieBanner";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { DataProvider } from "./contexts/DataContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('gloria-admin-auth') === 'true';
  });

  const handleLogout = () => {
    localStorage.removeItem('gloria-admin-auth');
    setIsLoggedIn(false);
  };

  return isLoggedIn ? <AdminDashboard onLogout={handleLogout} /> : <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
}

function AdminBlogPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('gloria-admin-auth') === 'true';
  });

  return isLoggedIn ? <AdminBlog /> : <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* 8 Thematic Category Hubs */}
      <Route path="/devocionais">{() => <CategoryHub categorySlug="devocionais" />}</Route>
      <Route path="/oracoes">{() => <CategoryHub categorySlug="oracoes" />}</Route>
      <Route path="/estudos-biblicos">{() => <CategoryHub categorySlug="estudos-biblicos" />}</Route>
      <Route path="/versiculos">{() => <CategoryHub categorySlug="versiculos" />}</Route>
      <Route path="/familia">{() => <CategoryHub categorySlug="familia" />}</Route>
      <Route path="/jovens">{() => <CategoryHub categorySlug="jovens" />}</Route>
      <Route path="/musica-e-adoracao">{() => <CategoryHub categorySlug="musica-e-adoracao" />}</Route>
      <Route path="/recursos-para-igrejas">{() => <CategoryHub categorySlug="recursos-para-igrejas" />}</Route>

      {/* Interactive Utility Tools & Community */}
      <Route path="/plano-de-leitura" component={ReadingPlan} />
      <Route path="/materiais" component={MaterialsAndNotebook} />
      <Route path="/comunidade" component={CommunityPrayer} />

      {/* Editorial & Blog Routes */}
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:id" component={BlogPost} />

      {/* Institutional, Copyright, Transparency & Legal Routes */}
      <Route path="/sobre" component={AboutUs} />
      <Route path="/contato" component={ContactForm} />
      <Route path="/privacidade" component={PrivacyPolicy} />
      <Route path="/politica-de-privacidade" component={PrivacyPolicy} />
      <Route path="/politica-de-cookies" component={CookiePolicy} />
      <Route path="/termos" component={TermsOfUse} />
      <Route path="/termos-de-uso" component={TermsOfUse} />
      <Route path="/transparencia-afiliados" component={AffiliateTransparency} />

      {/* Admin Routes */}
      <Route path="/admin" component={AdminPage} />
      <Route path="/admin/blog" component={AdminBlogPage} />

      {/* 404 NotFound */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <DataProvider>
          <TooltipProvider>
            <Router />
            <CookieBanner />
          </TooltipProvider>
        </DataProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
