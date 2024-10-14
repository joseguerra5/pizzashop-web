import { api } from "@/lib/axios";
export interface RegisterRestaurantBody {
  restaurantName: string
  managerName: string
  email: string
  phone: number
}
export async function  registerRestaurant({
  email,
  managerName,
  phone,
  restaurantName
}: RegisterRestaurantBody) {
  await api.post("/restaurants", {
    email,
    restaurantName,
    managerName,
    phone})
}