import { Header } from "@/components/ui/Header";
import { Helmet } from "react-helmet-async";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex min-h-full flex-col">
        <Header />
      </div>
    </>
  );
}