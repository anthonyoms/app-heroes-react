import React, { useContext } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { LoginScreen } from "../components/login/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";

export const AppRouter = () => {
  const {
    user: { logged },
  } = useContext(AuthContext);
  console.log(logged);
  return (
    <Router>
      <div>
        <Routes>
          {logged ? (
            <Route path="/*" element={<DashboardRoutes />} />
          ) : (
            <>
              <Route path="*" element={<LoginScreen />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};
