import { Header } from "@/components/Header";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function AppLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          const code = error.response?.data.code;

          if (status === 401 && code === "UNAUTHORIZED") {
            navigate("/sign-in", { replace: true });
          } else {
            throw error
          }
        }
      },
    );
    //
    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);
  return (
    <div className="m-auto min-h-screen max-w-7xl">
      <Header />
      <Outlet />
    </div>
  );
}
