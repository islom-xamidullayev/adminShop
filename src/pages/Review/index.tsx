import  { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

interface Review {
  _id: number;
  productId: number;
  reviewerName: string;
  stars: number;
  comment: string;
  createdAt: string;
}

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Ma'lumotlarni olish
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://www.e-commerce-api-v2.nt.azimumarov.uz/api/v1/reviews"
        );
        if (!response.ok) {
          throw new Error("Maʼlumotlarni yuklashda xatolik yuz berdi");
        }
        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
        setError("Maʼlumotlarni yuklashda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Sharhni o'chirish
  const handleDeleteReview = async (reviewId: number) => {
    try {
      await axios.delete(
        `https://www.e-commerce-api-v2.nt.azimumarov.uz/api/v1/reviews/${reviewId}`
      );
      // O'chirilgan sharhni ro'yxatdan olib tashlash
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error("Sharhni o'chirishda xatolik:", error);
    }
  };

  if (loading) {
    return <div>Yuklanmoqda...</div>;
  }

  if (error) {
    return <div>Xatolik: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-5xl mb-9 font-black my-9"
      >
        OUR HAPPY CUSTOMERS
      </motion.h1>

      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center text-5xl mb-9 font-black">
            No reviews available
          </p>
        ) : (
          reviews.map((review) => (
            <motion.div
              key={review._id}
              className="w-full px-8 py-6 bg-white flex flex-col items-start border border-black/10 rounded-[20px]"
              initial={{ x: "100px", opacity: 0 }}
              animate={{ x: "0", opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < review.stars ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-3xl flex items-center gap-1 text-gray-900">
                  {review.reviewerName}
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    color="green"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"></path>
                  </svg>
                </p>
                <button
                  onClick={() => handleDeleteReview(review._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-700 mt-2">{review.comment}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;