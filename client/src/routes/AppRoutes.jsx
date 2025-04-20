import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import InitialLoaders from "../components/InitialLoaders";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../utility/ProtectedRoute.jsx";

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Signup = React.lazy(() => import("../pages/Signup"));

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<InitialLoaders />}>
              <Home />
            </Suspense>
          }
        />

        <Route
          path="/register"
          element={
            <Suspense fallback={<InitialLoaders />}>
              <Signup />
            </Suspense>
          }
        />

        <Route
          path="/login"
          element={
            <Suspense fallback={<InitialLoaders />}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="/forget-password"
          element={
            <Suspense fallback={<InitialLoaders />}>
              <ForgotPassword />
            </Suspense>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<InitialLoaders />}>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
