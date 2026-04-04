import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Create from "./components/Create";
import Delete from "./components/Delete";
import Edit from "./components/Edit";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/delete/:id" element={<Delete />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
