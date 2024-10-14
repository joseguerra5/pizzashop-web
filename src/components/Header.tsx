import { Home, Pizza, UtensilsCrossed } from "lucide-react";
import { Separator } from "./ui/separator";
import { NavLink } from "./nav-link";
import { ModeToggle } from "./theme/theme-toggle";
import { AccountMenu } from "./account-menu";

export function Header() {
  return (
    <header className="flex h-16 items-center gap-4 border-b px-6">
      <Pizza className="h-6 w-6" />

      <Separator orientation="vertical" className="h-6" />

      <nav className="flex gap-4">
        <NavLink to="/">
          <Home className="" />
          <span>Início</span>
        </NavLink>

        <NavLink to="/oders">
          <UtensilsCrossed className="" />
          <span>Pedidos</span>
        </NavLink>
      </nav>

      <div className="ml-auto flex gap-2">
        <AccountMenu />
        <ModeToggle />
      </div>
    </header>
  );
}
