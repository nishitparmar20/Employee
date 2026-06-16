import EmpList from "./pages/EmpList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Manage from "./pages/Manage";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Employee Routes */}
        <Route path="/employees" element={<EmpList />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;