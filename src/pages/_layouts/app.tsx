import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="m-auto min-h-screen max-w-7xl">
      <Header />
      <Outlet />
    </div>
  );
}
