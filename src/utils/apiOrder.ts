import axios from "axios";
import { Order } from "../types/product";

const API_URL = "https://www.e-commerce-api-v2.nt.azimumarov.uz/api/v1/orders";

export const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get(`${API_URL}?limit=10`, { withCredentials: true });
  return response.data.orders;
};

export const deleteOrder = async (orderId: string): Promise<void> => {
  await axios.delete(`${API_URL}/${orderId}`, { withCredentials: true });
};

export const getOrderDetails = async (_id: string): Promise<Order> => {
  const response = await axios.get(`${API_URL}/${_id}`, { withCredentials: true });
  console.log("API Response222:", response.data.items ); // Debugging
  return response.data || response.data.items; // Handle both cases
};

export const updateOrderStatus = async ({
  orderId,
  status,
}: {
  orderId: string;
  status: Order["status"];
}): Promise<Order> => {
  const response = await axios.patch(
    `${API_URL}/${orderId}`,
    { status },
    { withCredentials: true }
  );
  return response.data;
};