import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SponsorHome from "./pages/SponsorHome";
import SponsorMoments from "./pages/SponsorMoments";
import SponsorPackagesPage from "./pages/SponsorPackagesPage";
import SponsorSchedule from "./pages/SponsorSchedule";
import SponsorshipPackages from "./pages/SponsorshipPackages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<SponsorHome />} />
          <Route path="/schedule" element={<SponsorSchedule />} />
          <Route path="/moments" element={<SponsorMoments />} />
          <Route path="/packages" element={<SponsorPackagesPage />} />
          <Route path="/old-packages" element={<SponsorshipPackages />} />
          <Route path="/package/:type/:tier" element={<SponsorPackagesPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
