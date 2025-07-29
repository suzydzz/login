import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LoginPage } from "./components/pages/LoginPage";
import { Layout } from "./components/Layout/Layout";
import { HomePage } from "./components/pages/HomePage";
import { EditUserPage } from "./components/pages/EditUserPage";
import { CreateUserPage } from "./components/pages/CreateUserPage";
import type { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Или компонент загрузки
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/create"
              element={
                <PrivateRoute>
                  <CreateUserPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/edit/:id"
              element={
                <PrivateRoute>
                  <EditUserPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
