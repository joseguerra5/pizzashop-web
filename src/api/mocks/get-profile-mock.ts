import { http, HttpResponse } from "msw";
import { GetProfileResponse } from "../get-profile";


export const getProfileMock = http.get<
  never,
  never,
  GetProfileResponse
>("/me", () => {
  return HttpResponse.json({
    name: "José Guerraaa",
    id: "12341323",
    email: "luisvitorioguerra@hotmail.com",
    phone: "910119453",
    role: "manager",
    createdAt: new Date("10/11/2021"),
    updatedAt: new Date("10/11/2024")
  });
});
