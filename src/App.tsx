import { RouterProvider } from "react-router-dom";
import "../index.css";
import { router } from "./routes";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
        <Toaster richColors closeButton />
        <Helmet titleTemplate="%s | pizza.shop" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}
