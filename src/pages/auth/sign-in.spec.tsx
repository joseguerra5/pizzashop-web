import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SignIn } from "./sign-in";
import { HelmetProvider } from "react-helmet-async";

describe("SignIn", () => {
  it("should set default email input value if email is present on search params", () => {
    const wrapper = render(
      <>
        <SignIn />
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <HelmetProvider>
              <MemoryRouter
                initialEntries={["/sign-in?email=jhondoe@example.com"]}
              >
                <QueryClientProvider client={queryClient}>
                  {children}
                </QueryClientProvider>
              </MemoryRouter>
            </HelmetProvider>
          );
        },
      },
    );
    //wrapper.debug serve para retornar no console o dom do elemento
    wrapper.debug();
    const email = wrapper.getByLabelText("Seu e-mail") as HTMLInputElement;
    expect(email.value).toEqual("jhondoe@example.com");
  });
});
