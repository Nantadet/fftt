import "./global.css";
import { useEffect, useState } from "react";

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

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const initialTheme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    document.documentElement.setAttribute("data-theme", initialTheme);
    // Update meta theme-color to match computed background so browser UI (tabs) matches page
    const updateMeta = () => {
      const meta = document.querySelector('meta[name="theme-color"]') || document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      const bg = getComputedStyle(document.body).backgroundColor || (initialTheme === 'dark' ? '#0b1220' : '#ffffff');
      meta.setAttribute('content', bg);
      if (!document.querySelector('meta[name="theme-color"]')) document.head.appendChild(meta);
    };
    updateMeta();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.setAttribute("data-theme", nextTheme);
    // sync meta theme-color with new background
    const meta = document.querySelector('meta[name="theme-color"]');
    const bg = getComputedStyle(document.body).backgroundColor || (nextTheme === 'dark' ? '#0b1220' : '#ffffff');
    if (meta) meta.setAttribute('content', bg);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="fixed right-4 top-4 z-50 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-slate-900 shadow-lg shadow-slate-200/50 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950/90 dark:text-slate-100 dark:hover:bg-slate-900"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
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
};

createRoot(document.getElementById("root")!).render(<App />);
