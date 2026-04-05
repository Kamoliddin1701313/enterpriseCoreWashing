import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface UserEdit {
  id?: number | string;
  name: string;
  text: string;
  comment: string;
  image: string;
  createdAt: string;
}

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState<UserEdit>({
    name: "",
    text: "",
    comment: "",
    image: "",
    createdAt: "",
  });

  // Ma'lumotni yuklash
  const getUserEditPost = () => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((resp) => {
        setEditUser(resp.data); // data ni editUser ga yuklash
      })
      .catch((error) => console.log(error));
  };

  // Tahrirlash - JSON formatda (JSON Server uchun)
  const editUserBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // JSON formatda yuborish
      const userData = {
        name: editUser.name,
        text: editUser.text,
        comment: editUser.comment,
        image: editUser.image,
        createdAt: editUser.createdAt,
      };

      const response = await axios.put(
        `http://localhost:3000/users/${id}`,
        userData,
      );
      navigate("/");
    } catch (error) {
      console.log("Xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  // Input o'zgarishlari
  const editChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
    console.log(name, value);
  };

  // File o'zgarishi (agar rasm fayl yuklash kerak bo'lsa)
  const editChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileEdit = e.target.files?.[0];
    if (fileEdit) {
      // File ni base64 ga o'zgartirib saqlash
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditUser((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(fileEdit);
    } else {
      setEditUser((prev) => ({ ...prev, image: null }));
    }
  };

  useEffect(() => {
    getUserEditPost();
  }, [id]);

  return (
    <div className="max-w-[760px] mx-auto p-6 mt-12 bg-white rounded-lg shadow-md">
      <form onSubmit={editUserBtn} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID
          </label>
          <input
            value={editUser.id || ""}
            type="text"
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ism
          </label>
          <input
            name="name"
            onChange={editChangeUser}
            value={editUser.name}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Matn
          </label>
          <input
            name="text"
            onChange={editChangeUser}
            value={editUser.text}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kommentariya
          </label>
          <input
            name="comment"
            onChange={editChangeUser}
            value={editUser.comment}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rasm (URL yoki fayl)
          </label>
          <input
            name="image"
            onChange={editChangeFile}
            type="file"
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
          {editUser.image && typeof editUser.image === "string" && (
            <div className="mt-2">
              <img
                src={editUser.image}
                alt="Current"
                className="w-32 h-32 object-cover rounded"
              />
              <p className="text-xs text-gray-500 mt-1">Joriy rasm</p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yaratilgan sana
          </label>
          <input
            name="createdAt"
            onChange={editChangeUser}
            value={editUser.createdAt}
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div className="flex justify-between items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 cursor-pointer px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400"
          >
            {loading ? "⏳ Saqlanmoqda..." : "✏️ Tahrirlash"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 cursor-pointer px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span>←</span> Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
