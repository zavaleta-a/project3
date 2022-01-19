import React from "react";
import PartsList from "../components/PartsList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
   
  <div className="splash-container">
      <CategoryMenu />
      {/* <PartsList /> */}
      <Cart />
    <div className="splash">
      <h1 className="splash-head">Welcome to Parts R Us! </h1>
      <p className="splash-subhead">
        Click to view current automotive parts.
      </p>
      <p>
        <a href="/login" className="pure-button pure-button-primary">Start</a>
      </p>
    </div>
  </div>

  );
};

export default Home;
