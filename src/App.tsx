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
import GoogleAnalytics from './components/GoogleAnalytics';
import Equipe from './pages/equipe';
import MentionsLegales from './pages/mentions-legales';
import Temoignages from './pages/temoignages';
import Contact from './pages/contact';
import FAQ from './pages/faq';



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GoogleAnalytics />
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/logements" element={<Logements />} />
          <Route path="/partenariat" element={<Partenariat />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/temoignages" element={<Temoignages />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
