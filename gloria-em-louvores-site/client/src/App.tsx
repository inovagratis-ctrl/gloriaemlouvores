import { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import BlogList from "@/pages/BlogList";
import BlogPost from "@/pages/BlogPost";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:id" component={BlogPost} />
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
            <Toaster />
            <Router />
          </TooltipProvider>
        </DataProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
