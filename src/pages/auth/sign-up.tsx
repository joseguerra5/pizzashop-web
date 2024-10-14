/* eslint-disable @typescript-eslint/no-unused-vars */
import { registerRestaurant } from "@/api/register-restaurant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signUp = z.object({
  email: z.string().email(),
  managerName: z.string(),
  restaurantName: z.string(),
  phone: z.number(),
});

type SignUpForm = z.infer<typeof signUp>;

export function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  const navigate = useNavigate();

  async function handleSingUp(data: SignUpForm) {
    await registerRestaurantFn({
      restaurantName: data.restaurantName,
      managerName: data.managerName,
      email: data.email,
      phone: data.phone,
    });

    toast.success("Restaurante cadastrado com sucesso", {
      action: {
        label: "Login",
        onClick: () => navigate(`/sign-in?email=${data.email}`),
      },
    });
  }
  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-9">
        <Button asChild variant="ghost" className="absolute right-4 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Crie sua conta
            </h1>
            <p className="text-muted-foreground">
              Seja um parceiro e comece as suas vendas!
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSingUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Seu restaurante</Label>
              <Input
                type="text"
                placeholder="Seu e-mail"
                id="restaurantName"
                {...register("restaurantName", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                type="text"
                placeholder="Seu nome"
                id="managerName"
                {...register("managerName", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                type="email"
                placeholder="Seu e-mail"
                id="email"
                {...register("email", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input
                type="tel"
                placeholder="Seu celular"
                id="phone"
                {...register("phone", { required: true })}
              />
            </div>
            <Button disabled={isSubmitting} className="w-full">
              Acessar painel
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuas, vocë concorda com nossos{" "}
              <a className="underline underline-offset-4" href="">
                termos de serviços
              </a>{" "}
              e{" "}
              <a className="underline underline-offset-4" href="">
                políticas de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
