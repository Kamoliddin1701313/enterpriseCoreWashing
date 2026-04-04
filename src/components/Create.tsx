import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <button
        onClick={() => navigate("/create")}
        className="mb-6 cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
      >
        <span>➕</span> Qo'shish
      </button>

      <form className="space-y-5">
        {/* Name maydoni */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Ism
          </label>
          <input
            id="name"
            type="text"
            placeholder="Masalan: Jasur"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Text maydoni (asosiy matn) */}
        <div>
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Matn
          </label>
          <textarea
            id="text"
            placeholder="Post matnini yozing..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
          />
        </div>

        {/* Comment maydoni */}
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Kommentariya
          </label>
          <input
            id="comment"
            type="text"
            placeholder="Izoh yozing..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Image maydoni (file yuklash) */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Rasm
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG (max 2MB)</p>
        </div>

        {/* CreatedAt maydoni */}
        <div>
          <label
            htmlFor="createdAt"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Yaratilgan sana
          </label>
          <input
            id="createdAt"
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Submit tugmasi */}
        <button
          type="submit"
          className="w-full cursor-pointer px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          📌 Saqlash
        </button>
      </form>
    </div>
  );
}

export default Create;
