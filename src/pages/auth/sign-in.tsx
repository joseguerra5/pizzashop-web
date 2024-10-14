import { signIn } from "@/api/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signInForm = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const [searchParams] = useSearchParams();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  //usado toda vez que fazemos uma ação que não da retorno, como PUT, POST e delete : todo get é um query
  //mutationFN é a função que vai ser usada para fazer a mutação
  //mutateAsync é a função que a gente vai usar para chamar a função signIn
  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleSingIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email });
      toast.success("enviamos um link de autenticação para seu e-mail", {
        action: {
          label: "Reenviar",
          onClick: () => handleSingIn(data),
        },
      });
    } catch {
      toast.error("Credenciais invalidas");
    }
  }
  return (
    <>
      <Helmet title="Login" />
      <div className="p-9">
        <Button asChild variant="ghost" className="absolute right-4 top-8">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Acessar painel
            </h1>
            <p className="text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSingIn)} className="space-y-4">
            <div className="space-y-4">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                type="email"
                placeholder="Seu e-mail"
                id="email"
                {...register("email", { required: true })}
              />
            </div>
            <Button disabled={isSubmitting} className="w-full">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
