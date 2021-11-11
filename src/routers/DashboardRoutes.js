import React from "react";
import { Route, Routes,useLocation } from "react-router-dom";
import { DcScreen } from "../components/dc/DcScreen";
import { HeroScreen } from "../components/heroes/HeroScreen";
import { MarvelScreen } from "../components/marvel/MarvelScreen";
import { SearchScreen } from "../components/search/SearchScreen";
import { Navbar } from "../components/ui/Navbar";

export const DashboardRoutes = () => {
  const location = useLocation();
  localStorage.setItem('lastPath',location.pathname)
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="dc" element={<DcScreen />} />
          <Route path="hero/:heroeId" element={<HeroScreen />} />
          <Route path="search" element={<SearchScreen />} />
          <Route path="marvel" element={<MarvelScreen />} />
          <Route path="*" element={<MarvelScreen />} />
        </Routes>
      </div>
    </>
  );
};
