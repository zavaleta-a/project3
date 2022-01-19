import React from "react";
import { Link } from "react-router-dom";
// import PartsList from "../components/PartsList";
// import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      {/* <CategoryMenu /> */}
      {/* <PartsList /> */}
      <Cart />
      <div>
        {/* <div class="splash-container"> */}
        <div class="splash">
          <h1 class="splash-head">Welcome to Parts R Us! </h1>
          <p class="splash-subhead">Click start to view current auto parts.</p>
          <p>
            <Link to="/parts" class="pure-button pure-button-primary">
              Start
            </Link>
          </p>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Home;
