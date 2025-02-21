
import axios from "axios";
import { ProductType } from "../types/product";

const API_URL = "https://www.e-commerce-api-v2.nt.azimumarov.uz/api/v1/products";

export const getProducts = async (page: number = 1): Promise<{ products: ProductType[], count: number }> => {
  const response = await axios.get(`${API_URL}?page=${page}&limit=7`); // Pagination qo‘shildi
  
  console.log("API javobi:", response.data);

  return {
    products: response.data.products, // Mahsulotlar ro‘yxati
    count: response.data.count // Umumiy mahsulotlar soni
  };
};


