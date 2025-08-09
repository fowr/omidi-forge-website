import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminUserSetup } from '@/components/admin/AdminUserSetup';

import Index from "./pages/Index";
import Products from "./pages/Products";
import About from "./pages/About";
import News from './pages/News'
import NotFound from "./pages/NotFound";

import Auth from "./pages/Auth";


import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import ProductForm from './pages/admin/ProductForm';
import AdminNews from './pages/admin/News';
import NewsForm from './pages/admin/NewsForm';
import AdminComponents from './pages/admin/Components';
import ComponentForm from './pages/admin/ComponentForm';
import Categories from './pages/admin/Categories';
import CategoryForm from './pages/admin/CategoryForm';
import Inquiries from './pages/admin/Inquiries';
import ProductMediaManager from './pages/admin/ProductMediaManager';
import ComponentPage from "./pages/ComponentsPage";
import Components from "./pages/Components";
import TunnelOven from "./pages/Static/products/TunnelOven";
import CupcakeDepositor from "./pages/Static/products/CupcakeDepositor";
import LayerCakeMachine from "./pages/Static/products/LayerCakeMachine";
import CookieDepositor from "./pages/Static/products/CookieDepositor";
import NewsDetail from "./pages/Static/news/NewsDetail";
import ProductPage from "./pages/ProductPage";
import NewsDetailDynamic from "./pages/NewsDetailDynamic";

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
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/components" element={<Components />} />
              <Route path="/components/:id" element={<ComponentPage />} />

              <Route path="/admin/news" element={<AdminNews />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/products/new" element={<ProductForm />} />
              <Route path="/admin/products/:id/edit" element={<ProductForm />} />
              <Route path="/admin/news" element={<News />} />
              <Route path="/admin/news/new" element={<NewsForm />} />
              <Route path="/admin/news/:id/edit" element={<NewsForm />} />
              <Route path="/admin/components" element={<AdminComponents />} />
              <Route path="/admin/components/new" element={<ComponentForm />} />
              <Route path="/admin/components/:id/edit" element={<ComponentForm />} />
              <Route path="/admin/categories" element={<Categories />} />
              <Route path="/admin/categories/new" element={<CategoryForm />} />
              <Route path="/admin/categories/:id/edit" element={<CategoryForm />} />
              <Route path="/admin/inquiries" element={<Inquiries />} />
              <Route path="/admin/media" element={<ProductMediaManager />} />
              <Route path="/products/:slug" element={<ProductPage />} />
              {/* <Route path="/products/:id" element={<ProductDetail />} /> */}
              <Route path="/news/:id" element={<NewsDetailDynamic />} />
              {/* Legacy static routes - keeping for compatibility */}
              <Route path="/products/tunnel-oven" element={<TunnelOven />} />
              <Route path="/products/cupcake-depositor" element={<CupcakeDepositor />} />
              <Route path="/products/layer-cake-machine" element={<LayerCakeMachine />} />
              <Route path="/products/cookie-depositor" element={<CookieDepositor />} />
              <Route path="/news-legacy/:id" element={<NewsDetail />} />
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
