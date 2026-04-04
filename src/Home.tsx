import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { PostUser } from "./types/postUsers";
interface PostUser {
  id: number | string;
  name: string;
  text: string;
  comment: string;
  image: string;
  createdAt: string;
}

function Home() {
  const [data, setData] = useState<PostUser[]>([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const resp = await axios.get("http://localhost:3000/users");
      setData(resp.data);
    } catch (error) {
      console.log("Xatolik:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-[1280px] mx-auto">
        {/* Header va Qo'shish tugmasi */}
        <div className="flex justify-between items-center mb-8 bg-white rounded-xl shadow-md p-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            📝 Postlar
          </h1>
          <button
            onClick={() => navigate("/create")}
            className="px-5 py-2.5 cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <span className="text-lg">➕</span>
            <span className="font-medium">Qo'shish</span>
          </button>
        </div>

        {/* Ma'lumotlar ro'yxati */}
        {data?.length > 0 ? (
          <div className="grid gap-6 grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 md:gap-4">
            {data?.map((val) => (
              <div
                key={val?.id}
                className="bg-white grid grid-cols-1 justify-between rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Rasm qismi */}
                {val?.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={val?.image}
                      alt={val?.name}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-black/60 text-white text-xs p-2 rounded-full">
                        # {val?.id}
                      </span>
                    </div>
                  </div>
                )}

                {/* Kontent qismi */}
                <div className="p-5 grid grid-cols-1 md:p-3">
                  {/* Ism */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                      {val?.name?.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="font-bold text-lg text-gray-800">
                      {val?.name}
                    </h2>
                  </div>
                  {/* Matn */}
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    {val?.text}
                  </p>
                  {/* Comment */}
                  {val?.comment && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-3 border-l-4 border-blue-400">
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold text-gray-700">
                          💬 Komment :{" "}
                        </span>
                        {val?.comment}
                      </p>
                    </div>
                  )}
                  {/* Sana */}
                  {val?.createdAt && (
                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                      <span>📅</span>
                      <span>{val?.createdAt?.replaceAll("-", ".")}</span>
                    </div>
                  )}
                  {/* Tugmalar */}
                  <div className="flex gap-3 mt-4 md:gap-2">
                    <button
                      onClick={() => navigate(`/edit/${val.id}`)}
                      className="flex-1 cursor-pointer p-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      ✏️ Tahrirlash
                    </button>
                    <button
                      onClick={() => navigate(`/delete/${val.id}`)}
                      className="flex-1 cursor-pointer p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      🗑️ O'chirish
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Bo'sh holat
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Ma'lumot yo'q
            </h3>
            <p className="text-gray-500 mb-6">
              Hali hech qanday post qo'shilmagan
            </p>
            <button
              onClick={() => navigate("/create")}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 inline-flex items-center gap-2"
            >
              <span>➕</span>
              <span>Birinchi postni qo'shing</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
