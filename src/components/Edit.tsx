import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface UserEdit {
  id: number | string;
  name: string;
  text: string;
  comment: string;
  image: string;
  createdAt: string;
}
function Edit() {
  const [data, setData] = useState<UserEdit | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState<UserEdit | {}>({
    name: "",
    text: "",
    comment: "",
    image: null,
    createdAt: "",
  });

  const getUserEditPost = () => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((resp) => setData(resp.data))
      .catch((error) => console.log(error));
  };

  const editUserBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // const formData = new FormData();

      // formData.append("name", editUser.name),
      //   formData.append("text", editUser.text),
      //   formData.append("comment", editUser.comment),
      //   formData.append("image", editUser.image),
      //   formData.append("createdAt", editUser.createdAt),
      axios
        .put(`http://localhost:3000/users/${id}`, editUser)
        .then((resp) => console.log(resp));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserEditPost();
  }, []);

  console.log(data, "AAAA");

  return (
    <div>
      <form onSubmit={editUserBtn}>
        <input value={data?.id} type="text" disabled />
        <input
          value={data?.name}
          type="text"
          onChange={(message) =>
            setEditUser({ ...message, name: message.target.value })
          }
        />
        <input
          value={data?.text}
          type="text"
          onChange={(message) =>
            setEditUser({ ...message, text: message.target.value })
          }
        />
        <input
          value={data?.comment}
          type="text"
          onChange={(message) =>
            setEditUser({ ...message, comment: message.target.value })
          }
        />
        <input
          // value={data?.image}
          type="file"
          onChange={(message) =>
            setEditUser({ ...message, image: message.target.files })
          }
        />
        <input
          value={data?.createdAt}
          type="date"
          onChange={(message) =>
            setEditUser({ ...message, createdAt: message.target.value })
          }
        />

        <div>
          <button type="submit">Edit</button>
          <button type="button" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
