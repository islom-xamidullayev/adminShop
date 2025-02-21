import React from "react";
import { Product } from "../../types/product";
import axios from "axios";

interface EditProductModalProps {
  isOpen: boolean;
  selectedProduct: Product | null;
  setIsOpen: (isOpen: boolean) => void;
  setSelectedProduct: (product: Product) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  selectedProduct,
  setIsOpen,
  setSelectedProduct,
}) => {
  if (!isOpen || !selectedProduct) return null;

  console.log("Modal isOpen:", isOpen);
  console.log("Selected Product:", selectedProduct);

  const updateProduct = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token mavjud emas!");
      return;
    }

    try {
      await axios.put(
        `https://www.e-commerce-api-v2.nt.azimumarov.uz/api/v1/products/${selectedProduct?._id}`,
        selectedProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log("Mahsulot yangilandi.");
      setIsOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Serverdan kelgan xato:", error.response?.data);
      } else {
        console.error("Noma'lum xato:", error);
      }
    }
  };

  // Ranglarni tanlash uchun funksiya
  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedProduct({ ...selectedProduct, colors: selectedOptions });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Mahsulotni tahrirlash</h3>

        <label className="text-[#050960] font-bold text-[18px]">Name</label>
        <input
          type="text"
          value={selectedProduct.name}
          onChange={(e) =>
            setSelectedProduct({ ...selectedProduct, name: e.target.value })
          }
          className="w-full border p-2 rounded mb-3 text-sm text-black"
          placeholder="Mahsulot nomi"
        />

        <label className="text-[#050960] font-bold text-[18px]">Description</label>
        <input
          type="text"
          value={selectedProduct.description}
          onChange={(e) =>
            setSelectedProduct({ ...selectedProduct, description: e.target.value })
          }
          className="w-full border p-2 rounded mb-3 text-sm text-black"
          placeholder="Tavsif"
        />

        <label className="text-[#050960] font-bold text-[18px]">Price</label>
        <input
          type="number"
          value={selectedProduct.price}
          onChange={(e) =>
            setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) })
          }
          className="w-full border p-2 rounded mb-3 text-sm text-black"
          placeholder="Narx"
        />

        <label className="text-[#050960] font-bold text-[18px]">Discount</label>
        <input
          type="number"
          value={selectedProduct.discount}
          onChange={(e) =>
            setSelectedProduct({ ...selectedProduct, discount: parseFloat(e.target.value) })
          }
          className="w-full border p-2 rounded mb-3 text-sm text-black"
          placeholder="Chegirma (%)"
        />

        {/* Type uchun select */}
        <label className="text-[#050960] font-bold text-[18px]">Type</label>
        <select
          name="type"
          value={selectedProduct.type}
          onChange={(e) =>
            setSelectedProduct({ ...selectedProduct, type: e.target.value })
          }
          className="w-full p-2 border rounded mb-3"
        >
          <option value="">Select Type</option>
          <option value="T-shirts">T-shirts</option>
          <option value="Shorts">Shorts</option>
          <option value="Shirts">Shirts</option>
          <option value="Jeans">Jeans</option>
          <option value="Hoodie">Hoodie</option>
        </select>

        {/* Size uchun select */}
        <label className="text-[#050960] font-bold text-[18px]">Size</label>
        <select
          name="size"
          value={selectedProduct.size}
          onChange={(e) =>
            setSelectedProduct({ ...selectedProduct, size: e.target.value })
          }
          className="w-full p-2 border rounded mb-3"
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

        {/* Dress Style uchun select */}
        <label className="text-[#050960] font-bold text-[18px]">Dress Style</label>
        <select
          name="dressStyle"
          value={selectedProduct.dressStyle}
          onChange={(e) =>
            setSelectedProduct({ ...selectedProduct, dressStyle: e.target.value })
          }
          className="w-full p-2 border rounded mb-3"
        >
          <option value="">Select Dress Style</option>
          <option value="Casual">Casual</option>
          <option value="Formal">Formal</option>
          <option value="Party">Party</option>
          <option value="Gym">Gym</option>
        </select>

        {/* Colors uchun multiple select */}
        <label className="text-[#050960] font-bold text-[18px]">Colors</label>
        <select
          name="colors"
          multiple
          value={selectedProduct.colors || []}
          onChange={handleColorChange}
          className="w-full p-2 border rounded mb-3"
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

        <div className="flex justify-end gap-3">
          <button onClick={() => setIsOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
            Bekor qilish
          </button>
          <button onClick={updateProduct} className="bg-blue-600 text-white px-4 py-2 rounded">
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;