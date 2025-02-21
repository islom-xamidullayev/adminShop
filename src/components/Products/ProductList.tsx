import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getProducts } from '../../utils/apiClient';
import { ProductType } from '../../types/product';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

interface ProductListProps {
  setSelectedProduct: (product: ProductType) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  setSelectedProduct,
  setIsOpen,
}) => {
  const queryClient = useQueryClient(); // react-query ni yangilash uchun
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', page],
    queryFn: () => getProducts(page),
  });

  const deleteProduct = async (productId: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token mavjud emas!');
      return;
    }

    try {
      await axios.delete(
        `https://www.e-commerce-api-v2.nt.azimumarov.uz/api/v1/products/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        },
      );

      console.log('Mahsulot o‘chirildi.');

      queryClient.invalidateQueries({ queryKey: ['products'] });
    } catch (error) {
      console.error('DELETE xatosi:', error);
    }
  };

  const changeParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    changeParams('page', newPage.toString());
  };

  if (isLoading) return <div>
    <div className="vraper">
  <div className="dot dot-1"></div>
  <div className="dot dot-2"></div>
  <div className="dot dot-3"></div>
</div>

<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="goo">
      <feGaussianBlur
        result="blur"
        stdDeviation="10"
        in="SourceGraphic"
      ></feGaussianBlur>
      <feColorMatrix
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
        mode="matrix"
        in="blur"
      ></feColorMatrix>
    </filter>
  </defs>
</svg>
  </div>;
  if (error) return <p>Xatolik yuz berdi!</p>;

  return (
    <div>
      <table className="w-full border " >
        <thead>
          <tr>
            <th>Nomi</th>
            <th>Narxi</th>
            <th>Rasm</th>
      
            <th>O‘lcham</th>
            <th>Harakatlar</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {data?.products?.length ? (
            data.products.map((product: ProductType) => (
              <tr key={product._id} className='font-bold text-black dark:text-white'>
                <td className='text-left text-title-sm   pl-3'>{product.name}</td>
                <td className=''>{product.price} $</td>
                <td className=''>
                  <img
                    src={product.pictures}
                    alt={product.name}
                    className="w-16  m-auto h-16 my-2 object-cover"
                  />
                </td>
              
                <td>{product.size}</td>
                <td>
                  <button
                    onClick={() => {
                      console.log('Edit tugmasi bosildi:', product);
                      setSelectedProduct(product);
                      setIsOpen(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-2">
                Ma'lumot topilmadi
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil((data?.count || 1) / 7) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 border ${
              page === i + 1 ? 'bg-[#000000] text-white' : 'bg-white text-black'
            } rounded`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;