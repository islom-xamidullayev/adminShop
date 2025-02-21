import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("admin");
  const [password, setPassword] = useState<string>("admin");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://www.e-commerce-api-v2.nt.azimumarov.uz/api/v1/auth/login", {
        username,
        password,
      }, 
      {
        withCredentials: true,

      });

      const token = response.data.token;
      localStorage.setItem("token", token); // Tokenni saqlash
      console.log("Token saqlandi:", token);

      navigate("/"); // Muvaffaqiyatli login bo‘lsa, dashboardga yo‘naltirish
    } catch (error: any) {
      setError(error.response?.data?.message || "Login xatosi");
      console.error("Login xatosi:", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Kirish</h2>
        
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-3 border rounded"
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-3 border rounded"
          placeholder="Password"
        />
        
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Kirish
        </button>
      </div>
    </div>
  );
};

export default Login;
