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
      <Route path="/admin" component={AdminPage} />
      <Route path="/admin/blog" component={AdminBlogPage} />
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/contato" component={ContactForm} />
      <Route path="/privacidade" component={PrivacyPolicy} />
      <Route path="/termos" component={TermsOfUse} />
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
          </TooltipProvider>
        </DataProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
