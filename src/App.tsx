import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          {/* HOME — pass order handler */}
          <Route
            path="/"
            element={
              <MainLayout>
                {(onOrder) => <Index onOrder={onOrder} />}
              </MainLayout>
            }
          />

          {/* LEGAL PAGES */}
          <Route
            path="/privacy"
            element={
              <MainLayout>
                <Privacy />
              </MainLayout>
            }
          />

          <Route
            path="/terms"
            element={
              <MainLayout>
                <Terms />
              </MainLayout>
            }
          />

          <Route
            path="/cookies"
            element={
              <MainLayout>
                <Cookies />
              </MainLayout>
            }
          />

          <Route
            path="/contact"
            element={
              <MainLayout>
                <Contact />
              </MainLayout>
            }
          />

          <Route
            path="/faq"
            element={
              <MainLayout>
                <Faq />
              </MainLayout>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
