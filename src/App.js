import { useContext } from "react";
import Home from "./components/Home";
import LayoutAdmin from "./Layouts/LayoutAdmin";
import { UserContext } from "./utils/UserContext";
import { Route, Routes } from "react-router-dom";
import LoginPage from "components/Login";
import ProtectedRoute from "utils/ProtectedRoute";

function App() {

  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <LayoutAdmin>
            <Home />
          </LayoutAdmin>
        </ProtectedRoute>
      } />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App;
