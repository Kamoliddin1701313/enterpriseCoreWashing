import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PostUser {
  id?: number | string;
  name: string;
  text: string;
  comment: string;
  image: string | null; // JSON Server uchun string (URL yoki base64)
  createdAt: string;
}

function Create() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [postUser, setPostUser] = useState<PostUser>({
    name: "",
    text: "",
    comment: "",
    image: null,
    createdAt: new Date().toISOString().split("T")[0],
  });

  // File'ni base64 string'ga o'zgartirish (JSON Server uchun)
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageData = postUser.image;

      // Agar rasm fayl bo'lsa, base64 ga o'zgartirish
      if (postUser.image && typeof postUser.image !== "string") {
        imageData = await fileToBase64(postUser.image as unknown as File);
      }

      // JSON formatda yuborish
      const userData = {
        name: postUser.name,
        text: postUser.text,
        comment: postUser.comment,
        image: imageData || "",
        createdAt: postUser.createdAt,
      };

      const response = await axios.post(
        "http://localhost:3000/users",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      navigate("/");
    } catch (error: any) {

      if (error.response) {
        setError(
          `Server xatosi: ${error.response.status} - ${JSON.stringify(error.response.data)}`,
        );
      } else if (error.request) {
        setError(
          "Serverga ulanishda xatolik! Server ishlayotganligini tekshiring.",
        );
      } else {
        setError(`Xatolik: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPostUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Faylni saqlash (keyin base64 ga o'giriladi)
      setPostUser((prev) => ({
        ...prev,
        image: file as any,
      }));
    } else {
      setPostUser((prev) => ({
        ...prev,
        image: null,
      }));
    }
  };

  return (
    <div className="max-w-[760px] mx-auto p-6 mt-12 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <strong>Xatolik!</strong> {error}
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Ism
          </label>
          <input
            onChange={handleInputChange}
            id="name"
            name="name"
            type="text"
            value={postUser.name}
            placeholder="Masalan: Jasur"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Matn
          </label>
          <textarea
            onChange={handleInputChange}
            id="text"
            name="text"
            value={postUser.text}
            placeholder="Post matnini yozing..."
            rows={4}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
          />
        </div>

        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Kommentariya
          </label>
          <input
            onChange={handleInputChange}
            id="comment"
            name="comment"
            type="text"
            value={postUser.comment}
            placeholder="Izoh yozing..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Rasm
          </label>
          <input
            onChange={handleFileChange}
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG, JPEG (max 2MB) - Rasm tanlanmasa, placeholder ishlatiladi
          </p>
        </div>

        <div>
          <label
            htmlFor="createdAt"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Yaratilgan sana
          </label>
          <input
            onChange={handleInputChange}
            id="createdAt"
            name="createdAt"
            type="date"
            value={postUser.createdAt}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div className="flex justify-between items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 cursor-pointer px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? "⏳ Saqlanmoqda..." : "📌 Saqlash"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            disabled={loading}
            className="flex-1 cursor-pointer px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:bg-green-400 disabled:cursor-not-allowed"
          >
            <span>←</span> Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
