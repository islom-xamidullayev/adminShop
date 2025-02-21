import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrders, deleteOrder } from '../../utils/apiOrder';
import { Link } from 'react-router-dom';

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  isLoading: any;
  status: 'PENDING' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELED';
}

export default function OrdersList() {
  const queryClient = useQueryClient();
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);

  // Zakazlarni olish
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  // Zakazni o‘chirish
  const mutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setDeletingOrderId(null); // O'chirish tugmasini qayta faollashtirish
    },
  });

  if (isLoading)
    return (
      <div className=" ml-[100px]">
        <div className="loader ">
          <div className="wrapper">
            <div className="circle"></div>
            <div className="line-1"></div>
            <div className="line-2"></div>
            <div className="line-3"></div>
            <div className="line-4"></div>
          </div>
        </div>

        <div className="loader my-6">
          <div className="wrapper">
            <div className="circle"></div>
            <div className="line-1"></div>
            <div className="line-2"></div>
            <div className="line-3"></div>
            <div className="line-4"></div>
          </div>
        </div>

        <div className="loader my-6">
          <div className="wrapper">
            <div className="circle"></div>
            <div className="line-1"></div>
            <div className="line-2"></div>
            <div className="line-3"></div>
            <div className="line-4"></div>
          </div>
        </div>
      </div>
    );

  if (error)
    return <p className="text-center text-red-500">Xatolik: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-black text-center mb-4">
        Zakazlar
      </h2>
      <ul className="divide-y divide-gray-300">
        {orders?.map((order) => (
          <li key={order._id} className="p-4 flex justify-between items-center">
            <div>
              <p className="text-xl font-bold text-black ">
                {order.firstName} {order.lastName}
              </p>
              <p className="text-md text-gray-500">
                {order.city}, {order.country}
              </p>
              <p className="text-sm text-blue-500">Status: {order.status}</p>
            </div>
            <div>
              <button className="mr-5 bg-[#303030] text-white px-3 py-1 rounded">
                <Link to={`/orders/${order._id}`}>About</Link>
              </button>
              <button
                onClick={() => {
                  setDeletingOrderId(order._id); // O'chirilayotgan buyurtma ID sini saqlash
                  mutation.mutate(order._id);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                {deletingOrderId === order._id && mutation.isPending
                  ? 'O‘chirilmoqda...'
                  : 'O‘chirish'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}