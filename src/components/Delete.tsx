import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface PostUserDelete {
  id: number | string;
  name: string;
  text: string;
  comment: string;
  image: string;
  createdAt: string;
}

function Delete() {
  const { id } = useParams();
  const [data, setData] = useState<PostUserDelete | null>(null);
  const navigate = useNavigate();

  const getUserIdData = () => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((respon) => setData(respon?.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserIdData();
  }, []);

  const deleteUserIdData = () => {
    axios
      .delete(`http://localhost:3000/users/${id}`)
      .then((er) => {
        console.log(er, "eeee");

        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Delete Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl">⚠️</span>
              <h1 className="text-xl font-bold text-white">Postni O'chirish</h1>
              <span className="text-3xl">⚠️</span>
            </div>
          </div>

          {/* Content */}
          {data ? (
            <div className="p-6">
              {/* Ogohlantirish */}
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
                <p className="text-red-700 text-center font-medium">
                  Siz ushbu postni o'chirmoqchisiz! Bu amal qaytarib bo'lmaydi.
                </p>
              </div>

              {/* Rasm */}
              {data.image && (
                <div className="relative h-48 overflow-hidden rounded-xl mb-4">
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      ID: {data.id}
                    </span>
                  </div>
                </div>
              )}

              {/* Ma'lumotlar */}
              <div className="space-y-3 bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                    {data.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-gray-800">
                      {data.name}
                    </h2>
                    <p className="text-xs text-gray-400">Post muallifi</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">
                    📝 Matn
                  </p>
                  <p className="text-gray-700">{data.text}</p>
                </div>

                {data.comment && (
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">
                      💬 Kommentariya
                    </p>
                    <p className="text-gray-600 bg-white rounded-lg p-2">
                      {data.comment}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">
                    📅 Yaratilgan sana
                  </p>
                  <p className="text-gray-600">
                    {data.createdAt?.replace(/-/g, ".")}
                  </p>
                </div>
              </div>

              {/* Tugmalar */}
              <div className="flex gap-3 sm:gap-2">
                <button
                  onClick={deleteUserIdData}
                  className="flex-1 cursor-pointer px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <span>🗑️</span>
                  <span>O'chirish</span>
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="flex-1 cursor-pointer px-4 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <span>🔙</span>
                  <span>Back</span>
                </button>
              </div>
            </div>
          ) : (
            // Loading holati
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p className="text-gray-500">Ma'lumot yuklanmoqda...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Delete;
