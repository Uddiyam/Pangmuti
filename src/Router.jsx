import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import RestaurantList from "./RestaurantList";
import Restaurant from "./Restaurant";
import Mypage from "./Mypage";
import GeneralForum from "./GeneralForum";
import Login from "./Login";
import SignUp from "./SignUp";

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/SignUp" element={<SignUp />} />
      <Route exact path="/Main" element={<App />} />
      <Route exact path="/RestaurantList" element={<RestaurantList />} />
      <Route exact path="/Mypage" element={<Mypage />} />
      <Route exact path="/Forum" element={<GeneralForum />} />
      <Route exact path="/Restaurant" element={<Restaurant />} />
    </Routes>
  );
};

export default AppRouter;
