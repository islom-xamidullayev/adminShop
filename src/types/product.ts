export interface ProductType {
  _id: string;
  name: string;
  description: string;
  category: string;
  size: string;
  price: number;
  pictures: string;
  discount:number
  quantity: number; // Quantity of the product in the order
  productId: string;
  colors: string[]

}


export interface Order {
  _id: string;
  items: OrderItem[];

  quantity: number;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  apartment: string;
  state: string;
  zip: string;
  email: string;
  phoneNumber: string;
  notes: string;
  products: ProductType[] ; // Add this line
  pictures: string;
  isLoading: any;
  status: 'PENDING' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELED';
}
//////////////////////////////////////////----- order productCard ------------//////////////////////////

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  colors: string[];
  type: string;
  size: string;
  dressStyle: string;
  pictures: string[];
}

export interface OrderItem {
  productId: Product;
  quantity: number;
  _id: string;
}

export interface Order2 {
  _id: string;
  items: OrderItem[];
  status: "PENDING" | "ON_THE_WAY" | "DELIVERED" | "CANCELED";
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  apartment: string;
  state: string;
  zip: string;
  email: string;
  phoneNumber: string;
  notes: string;
}