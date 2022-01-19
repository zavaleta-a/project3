import React from "react";
import PartsList from "../components/PartsList";
import CategoryMenu from "../components/CategoryMenu";
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
      <h1 class="splash-head">Welcome to A.R.T.! </h1>
      <p class="splash-subhead">
        Login in to view current vehicles.
      </p>
      <p>
        <a href="/Info" class="pure-button pure-button-primary">Start</a>
      </p>
    </div>
  </div>
</div>
  // </div>

  );
};

export default Home;
