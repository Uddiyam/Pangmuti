import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import RestaurantList from "./RestaurantList";
import Mypage from "./Mypage";
import GeneralForum from "./GeneralForum";

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/Restaurant" element={<RestaurantList />} />
      <Route exact path="/Mypage" element={<Mypage />} />
      <Route exact path="/Forum" element={<GeneralForum />} />
    </Routes>
  );
};

export default AppRouter;
