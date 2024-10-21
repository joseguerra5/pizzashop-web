import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  getManegedRestaurantProfile,
  GetManegedRestaurantResponse,
} from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";
import { queryClient } from "@/lib/react-query";

const storeProfimeSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
});
type StoreProfileSchema = z.infer<typeof storeProfimeSchema>;

export function StoreProfileDialog() {
  const { data: manegedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManegedRestaurantProfile,
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfimeSchema),
    values: {
      name: manegedRestaurant?.name ?? "",
      description: manegedRestaurant?.description ?? "",
    },
  });

  function updateManagedRestaurantCached({
    name,
    description,
  }: StoreProfileSchema) {
    const cached = queryClient.getQueryData<GetManegedRestaurantResponse>([
      "managed-restaurant",
    ]);

    if (cached) {
      queryClient.setQueryData<GetManegedRestaurantResponse>(
        ["managed-restaurant"],
        {
          ...cached,
          name,
          description,
        },
      );
    }

    return { cached };
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    //no sucesso da mutação eu tenho que pegar o cached antigo e se tiver cache eu seto um query data com toda info em cache mais as info mudadas (mutação do cache, future mais perfeita do react query) usando o onSuccess

    //onMutate
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCached({ name, description });

      return { previousProfile: cached };
    },
    onError(_, __, context) {
      //se der erro vai pegar o cached da interface otimista no onMutate e vai atualizar novamente com a informação guardada em cache
      if (context?.previousProfile) {
        updateManagedRestaurantCached(context.previousProfile);
      }
    },
  });

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      });
      toast.success("Perfil atualizado com sucesso!");
    } catch {
      toast.error("Falha ao atualizat o perfil, tente novamente mais tarde!");
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da Loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Nome
            </Label>
            <Input
              id="name"
              className="col-span-3"
              placeholder="Digite seu nome"
              {...register("name")}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Descrição
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              placeholder="Digite seu nome"
              {...register("description")}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
