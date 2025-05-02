import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "utils/ProtectedRoute";
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import UserPage from "pages/UserPage";
import DevicePage from "pages/DevicePage";
import SensorPage from "pages/SensorPage";
import CardReaderPage from "pages/CardReaderPage";
import RoomPage from "pages/RoomPage";
import AccessLogPage from "pages/AccessLogPage";
import SensorLogPage from "pages/SensorLogPage";
import CardReaderLogPage from "pages/CardReaderLogPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedRoute>
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/room"
        element={
          <ProtectedRoute>
            <RoomPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/device"
        element={
          <ProtectedRoute>
            <DevicePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sensor"
        element={
          <ProtectedRoute>
            <SensorPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/card-reader"
        element={
          <ProtectedRoute>
            <CardReaderPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/access-log"
        element={
          <ProtectedRoute>
            <AccessLogPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sensor-log"
        element={
          <ProtectedRoute>
            <SensorLogPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/card-reader-log"
        element={
          <ProtectedRoute>
            <CardReaderLogPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
