import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Logements from "./pages/Logements";
import Partenariat from "./pages/Partenariat";
import NotFound from "./pages/NotFound";
import Blog from './pages/Blog';
import Article from './pages/Article';
import Header from './components/Header';
import Footer from './components/Footer';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/logements" element={<Logements />} />
          <Route path="/partenariat" element={<Partenariat />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/article/:id" element={<Article />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
