import { Button } from "./ui/button";
import { Building, ChevronDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { getManegedRestaurantProfile } from "@/api/get-managed-restaurant";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { StoreProfileDialog } from "./store-profile-dialog";

export function AccountMenu() {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    //query key serve para identificar as requisições semelhantes e não fica duplicando requisiçÕes
    queryKey: ["profile"],
    queryFn: getProfile,
    //stale time infinity evita que as informaçÕes sejam recarregadas quandoa tela abre novamente
    staleTime: Infinity,
  });

  const { data: manegedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ["managed-restaurant"],
      queryFn: getManegedRestaurantProfile,
      staleTime: Infinity,
    });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              manegedRestaurant?.name
            )}

            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex w-56 flex-col gap-2">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>

          <DialogTrigger asChild>
            <DropdownMenuItem className="flex items-center">
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem className="flex items-center text-rose-500 dark:text-rose-400">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <StoreProfileDialog />
    </Dialog>
  );
}
