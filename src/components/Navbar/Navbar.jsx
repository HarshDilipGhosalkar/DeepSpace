import React from "react";
import { Outlet, Link } from "react-router-dom";

import "./assets/main.css";
import logo from "./assets/space.png";
import walletIcon from "./assets/wallet.png";
import eth from "./assets/eth.svg";
import search from "./search.svg";

const Navbar = ({ accountAddress, accountBalance, profileImage }) => {
  function DisplayAccount() {
    var a = document.getElementById("wallet-checkbox").checked;

    if (a) {
      document.getElementById("account-details").style.width = "420px";
      document.getElementById("account-details").style.padding = "20px";
      document.body.style.backgroundColor = "#202225";
    } else {
      document.getElementById("account-details").style.width = "0";
      document.getElementById("account-details").style.padding = "0";
      document.body.style.backgroundColor = "#202225";
    }
  }

  function addressSlice(address) {
    return address.slice(0, 6) + "..." + address.slice(-4);
  }

  return (
    <>
      <div class="header"></div>
      <header
        id="header"
        class="header fixed-top sticked"
        data-scrollto-offset="0"
      >
        <div class="container-fluid d-flex align-items-center justify-content-between">
          <div class="logo d-flex align-items-center scrollto me-auto me-lg-0">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
            <Link to="/">
              <h1 class="logotext">DeepSpace</h1>
            </Link>
          </div>

          <nav id="navbar" class="navbar">
            <div class="search-bar">
              <img src={search} alt="" class="search__icon " />
              <input
                type="text"
                id="box"
                placeholder="Search items,Collections and Account"
                class="search__box"
              />
              {/* <img src={search} alt="" /> */}
            </div>

            <ul>
              <li>
                <Link to="/marketplace">
                  <h1 class="navbar-text">Explore</h1>
                </Link>
              </li>
              <li>
                <Link to="/stats">
                  <h1 class="navbar-text">Stats</h1>
                </Link>
              </li>
              <li>
                <Link to="/mint">
                  <h1 class="navbar-text">Create</h1>
                </Link>
              </li>
              <li>
                <Link to="/queries">
                  <h1 class="navbar-text">Queries</h1>
                </Link>
              </li>
              <li>
                <Link to={"/profile"}>
                  <img class="avatar-style" src={profileImage} alt="" />
                </Link>
              </li>
              <li>
                <img class="wallet-item" src={walletIcon} alt="" />
              </li>
              <input
                class="wallet-checkbox"
                id="wallet-checkbox"
                type="checkbox"
                onChange={DisplayAccount}
              />
            </ul>
          </nav>
        </div>
      </header>
      <div id="account-details" class="sidenav">
        <div class="container">
          <div class="row canvas-area-top">
            <div class="col main-text">My Wallet</div>
            <div class="col align-items-end address-text">
              {addressSlice(accountAddress)}
            </div>
          </div>
        </div>

        <div class="cointainer canvas-area">
          <p class="text1"> Total Balance </p>
          <h2 class="text-main"> $72.64 USD </h2>

          <button class="funds-btn">Add Funds</button>
        </div>

        <div class="container canvas-area2">
          <div class="row">
            <div class="col-1">
              <img src={eth} height="25px" alt="" />
            </div>
            <div class="col-3">
              <h3>ETH</h3>
              <p>Ganache</p>
            </div>
            <div class="col-4"></div>
            <div class="col-4">
              <h3>{accountBalance}</h3>
              <p>$72.62 USD</p>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Navbar;
