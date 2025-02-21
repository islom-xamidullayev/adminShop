import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { getOrderDetails, updateOrderStatus } from "../../utils/apiOrder";
import { Order } from "../../types/product";

export default function OrderDetails() {
  const { _id } = useParams<{ _id: string }>();
  const queryClient = useQueryClient();

  // Zakaz ma'lumotlarini olish
  const {
    data: order,
    isLoading,
    error,
  } = useQuery<Order>({
    queryKey: ["order", _id],
    queryFn: () => getOrderDetails(_id!),
  });

  // Statusni yangilash uchun mutation
  const statusMutation = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: (updatedOrder) => {
      // Yangilangan zakaz ma'lumotlarini cachega yozish
      queryClient.setQueryData(["order", _id], updatedOrder);
      // Zakazlar ro'yxatini yangilash (agar kerak bo'lsa)
      queryClient.invalidateQueries({ queryKey: ["orders"] });    },
  });

  // Statusni o'zgartirish funksiyasi
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (order) {
      const newStatus = e.target.value as Order["status"];
      statusMutation.mutate({ orderId: order._id, status: newStatus });
    }
  };

  if (isLoading) return <p className="text-center">Yuklanmoqda...</p>;
  if (error) return <p className="text-center text-red-500">Xatolik: {error.message}</p>;
  if (!order) return <p className="text-center text-red-500">Zakaz topilmadi.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-black text-center mb-4">Zakaz Tafsilotlari</h2>
      <div className="space-y-4 text-black-2">
        <p><strong>Ism:</strong> {order.firstName} {order.lastName}</p>
        <p><strong>Telefon:</strong> {order.phoneNumber}</p>
        <p><strong>Manzil:</strong> {order.city}, {order.country}</p>
        <p>
          <strong>Status:</strong>
          <select
            value={order.status}
            onChange={handleStatusChange}
            className="ml-2 p-1 border rounded"
            disabled={statusMutation.isPending}
          >
            <option value="PENDING">PENDING</option>
            <option value="ON_THE_WAY">ON_THE_WAY</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELED">CANCELED</option>
          </select>
          {statusMutation.isPending && <span className="ml-2">Yangilanmoqda...</span>}
        </p>
        <h3 className="text-xl font-bold text-black">Mahsulotlar</h3>
        <ul className="divide-y divide-gray-300 text-black">
          {order.items.map((item: any) => (
            <li key={item._id} className="p-4">
              <div className="flex items-center space-x-4">
                {item.productId ? (
                  <>
                    <img
                      src={item.productId.pictures[0]}
                      alt={item.productId.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p><strong>Mahsulot Nomi:</strong> {item.productId.name}</p>
                      <p><strong>Miqdor:</strong> {item.quantity}</p>
                      <p><strong>Narxi:</strong> {item.productId.price} USD</p>
                      <p><strong>Chegirma:</strong> {item.productId.discount}%</p>
                    </div>
                  </>
                ) : (
                  <p>Mahsulot ma'lumotlari mavjud emas yoki o'chib ketgan</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <Link to="/OrdersList" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          Orqaga
        </Link>
      </div>
    </div>
  );
}