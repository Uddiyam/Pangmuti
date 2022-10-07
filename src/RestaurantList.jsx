import React from "react";
import Header from "./Header";
import styles from "./styles/RestaurantList.module.css";

export default function RestaurantList() {
  return (
    <>
      <Header />
      <form>
        <input type="search"></input>
      </form>
    </>
  );
}
