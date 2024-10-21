import { MemoryRouter } from "react-router-dom";
import { NavLink } from "./nav-link";
import { render } from "@testing-library/react";

describe("NavLin", () => {
  it("should highlight the nav link when is the current page linkl", () => {
    const wrapper = render(<NavLink to="/about">About</NavLink>, {
      //essa part do wrapper envolve o atributo em um provider para conseguir funcionar a função, e o provider do router tem que ser o memoryRouter pq fica salvo em memoria
      wrapper: ({ children }) => {
        return (
          <MemoryRouter initialEntries={["/about"]}>{children}</MemoryRouter>
        );
      },
    });
    expect(wrapper.getByText("About").dataset.current).toEqual("true");
  });
});
