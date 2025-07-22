import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Products from "./pages/Products";
import About from "./pages/About";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import TunnelOven from "./pages/products/TunnelOven";
import CupcakeDepositor from "./pages/products/CupcakeDepositor";
import LayerCakeMachine from "./pages/products/LayerCakeMachine";
import CookieDepositor from "./pages/products/CookieDepositor";
import NewsDetail from "./pages/news/NewsDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="omidi-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/news" element={<News />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/products/tunnel-oven" element={<TunnelOven />} />
              <Route path="/products/cupcake-depositor" element={<CupcakeDepositor />} />
              <Route path="/products/layer-cake-machine" element={<LayerCakeMachine />} />
              <Route path="/products/cookie-depositor" element={<CookieDepositor />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
