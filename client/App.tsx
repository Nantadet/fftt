import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Matching from "./pages/Matching";
import Trip from "./pages/Trip";
import Chat from "./pages/Chat";
import Verification from "./pages/Verification";
import Reviews from "./pages/Reviews";
import SplashScreen from "./pages/SplashScreen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/trip" element={<Trip />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/profile" element={<Verification />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
