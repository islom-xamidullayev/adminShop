import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import SignIn from "./pages/Authentication/SignIn";
import Chart from "./pages/Chart";
import ECommerce from "./pages/Dashboard/ECommerce";

import Profile from "./pages/Profile";

import DefaultLayout from "./layout/DefaultLayout";
import Products from "./pages/Products/Products";
import ProtectedRoute from "./components/ProtectedRoute"; // Qo'shildi
import AddProduct from "./pages/Addproduct/Add";
import OrdersList from "./pages/Orders/Orders";
import OrderDetails from "./pages/About/About";
import ReviewsPage from "./pages/Review";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      {/* Kirish sahifasi */}
      <Route path="/signin" element={<SignIn />} />

      {/* Himoyalangan yo‘nalishlar */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DefaultLayout />}>
          <Route
            index
            element={
              <>
                <PageTitle title="eCommerce Dashboard" />
                <ECommerce />
              </>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/Addproducts" element={<AddProduct />} />

          
          <Route path="/profile" element={<Profile />} />
          <Route path="/OrdersList" element={<OrdersList />} />
          <Route path="/orders/:_id" element={<OrderDetails />} />
          <Route path="/review" element={<ReviewsPage />} />
       
          <Route path="/chart" element={<Chart />} />

        </Route>
      </Route>
    </Routes>
  );
}

export default App;
