import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import RestaurantList from "./RestaurantList";
import Restaurant from "./Restaurant";
import Mypage from "./Mypage";
import GeneralForum from "./GeneralForum";
import ForumDetail from "./ForumDetail";
import Login from "./Login";
import SignUp from "./SignUp";
import { useEffect } from "react";
import ReactGA from "react-ga";
import RouteChangeTracker from "./RouteChangeTracker";

const AppRouter = () => {
  RouteChangeTracker();
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/SignUp" element={<SignUp />} />
      <Route exact path="/Main" element={<App />} />
      <Route exact path="/RestaurantList" element={<RestaurantList />} />
      <Route exact path="/Mypage" element={<Mypage />} />
      <Route exact path="/Forum" element={<GeneralForum />} />
      <Route exact path="/ForumDetail/:id" element={<ForumDetail />} />
      <Route exact path="/Restaurant/:id" element={<Restaurant />} />
    </Routes>
  );
};

export default AppRouter;
