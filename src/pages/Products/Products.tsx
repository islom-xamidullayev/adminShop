import  { useState } from "react";
import ProductList from "../../components/Products/ProductList";
import EditProductModal from "../../components/Products/EditProductModal";
import { ProductType } from "../../types/product"
const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="container mx-auto p-4">
      <ProductList setSelectedProduct={setSelectedProduct} setIsOpen={setIsOpen} />
      <EditProductModal
        isOpen={isOpen}
        selectedProduct={selectedProduct}
        setIsOpen={setIsOpen}
        setSelectedProduct={setSelectedProduct}
      />
    </div>
  );
};

export default Products;
