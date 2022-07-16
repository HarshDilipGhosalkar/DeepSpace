import React from "react";
import { Link } from "react-router-dom";

import "./assets/style.css";
import compass from "./assets/compass.gif";

const NoPage = () => {
  return (
    <>
      <div class="contain">
        <div class="big_text">
          <h1>
            4<img class="compass" src={compass} alt='0' />4
          </h1>
          <h2>This page is lost.</h2>
          <p>   
            We've explored deep and wide,
            <br /> but we can't find the page you were looking for.
          </p>
          <Link to="/">Navigate back home</Link>
        </div>
      </div>
    </>
  );
};
export default NoPage;
