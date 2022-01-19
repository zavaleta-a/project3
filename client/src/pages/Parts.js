import React from "react";
import PartsList from "../components/PartsList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Parts = () => {
  return (
    <div className="container">
      <CategoryMenu />
      {/* <PartsList /> */}
      <Cart />
    </div>
  );
};

export default Parts;
