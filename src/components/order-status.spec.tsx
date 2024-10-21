//os testes servem para garantir que o app funcione com o tempo
import { render } from "@testing-library/react";
import { OrderStatus } from "./order-status";

describe("Order Status", () => {
  it("should display the right text when order status is pending ", () => {
    const wrapper = render(<OrderStatus status="pending" />);

    //mostra na console o dom renderizado na tela
    //wrapper.debug();

    const statusText = wrapper.getByText("Pendente");
    const badgeElement = wrapper.getByTestId("badge");
    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-slate-400");
  });

  it("should display the right text when order status is delivering ", () => {
    const wrapper = render(<OrderStatus status="delivering" />);

    //mostra na console o dom renderizado na tela
    //wrapper.debug();

    const statusText = wrapper.getByText("Em entrega");
    const badgeElement = wrapper.getByTestId("badge");
    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-amber-500");
  });

  it("should display the right text when order status is processing ", () => {
    const wrapper = render(<OrderStatus status="processing" />);

    //mostra na console o dom renderizado na tela
    //wrapper.debug();

    const statusText = wrapper.getByText("Em preparo");
    const badgeElement = wrapper.getByTestId("badge");
    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-amber-500");
  });

  it("should display the right text when order status is delivered ", () => {
    const wrapper = render(<OrderStatus status="delivered" />);

    //mostra na console o dom renderizado na tela
    //wrapper.debug();

    const statusText = wrapper.getByText("Entregue");
    const badgeElement = wrapper.getByTestId("badge");
    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-emerald-500");
  });
});
