import React, { useState } from "react";
import axios from "axios";

interface FormDataState {
  name: string;
  description: string;
  price: number;
  discount: number;

  type: string;
  size: string;
  dressStyle: string;
  pictures: File[];
}

const AddProduct: React.FC = () => {
  const yourAuthToken = localStorage.getItem("token") || "";

  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    description: "",
    price: 0,
    discount: 0,

    type: "",
    size: "",
    dressStyle: "",
    pictures: []
  });

  const [error, ] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    const files = (event.target as HTMLInputElement).files;
    const selectedOptions = (event.target as HTMLSelectElement).selectedOptions;

    if (type === "file" && files) {
      setFormData((prevData) => ({
        ...prevData,
        pictures: Array.from(files),
      }));
      return;
    }
  
    if (type === "select-multiple" && selectedOptions) {
      setFormData((prevData) => ({
        ...prevData,
        colors: Array.from(selectedOptions, (option) => option.value),
      }));
      return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "pictures") {
        (value as File[]).forEach((file) => form.append("pictures", file));
      }  else {
        form.append(key, value.toString());
      }
    });
  
    console.log("Form data to be sent:", form); // Yuborilayotgan ma'lumotlar
  
    try {
      const res = await axios.post("https://www.e-commerce-api-v2.nt.azimumarov.uz/api/v1/products", form, {
        headers: {
          "Authorization": `Bearer ${yourAuthToken}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      
      console.log("Server response body:", res.data);  // Serverdan javob
      alert(res.data?.message || "Product added successfully");
      
      if (res.status === 201) {
        setFormData({
          name: "",
          description: "",
          price: 0,
          discount: 0,
         
          type: "",
          size: "",
          dressStyle: "",
          pictures: []
        });
      }
    } catch (err) {
      console.error("Error during fetch:", err);
      alert("Serverda muammo, keyinroq urinib ko'ring");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Add Product</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form id="product-create-form" onSubmit={handleSubmit} className="space-y-4 text-black-2">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="colors"
            multiple
            value={formData.colors}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="000000">000000</option>
            <option value="FFFFFF">FFFFFF</option>
            <option value="F50606">F50606</option>
            <option value="06CAF5">06CAF5</option>
            <option value="7D06F5">7D06F5</option>
            <option value="00C12B">00C12B</option>
            <option value="F5DD06">F5DD06</option>
            <option value="F57906">F57906</option>
            <option value="063AF5">063AF5</option>
            <option value="F506A4">F506A4</option>
          </select>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Type</option>
            <option value="T-shirts">T-shirts</option>
            <option value="Shorts">Shorts</option>
            <option value="Shirts">Shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Hoodie">Hoodie</option>
          </select>
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Size</option>
            <option value="XX-Small">XX-Small</option>
            <option value="Small">Small</option>
            <option value="X-Small">X-Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="X-Large">X-Large</option>
            <option value="XX-Large">XX-Large</option>
            <option value="3X-Large">3X-Large</option>
            <option value="4X-Large">4X-Large</option>
          </select>
          <select
            name="dressStyle"
            value={formData.dressStyle}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Dress Style</option>
            <option value="Casual">Casual</option>
            <option value="Formal">Formal</option>
            <option value="Party">Party</option>
            <option value="Gym">Gym</option>
          </select>
          <input
            type="file"
            name="pictures"
            multiple
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;