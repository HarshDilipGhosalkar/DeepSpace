import React, { Component } from "react";
import { Link } from "react-router-dom";

import eth from "./assets/eth.svg";
import filter from "./assets/filter.svg";
import open from "./assets/open.svg";
import "./assets/explore.css";
import Loading from "../Loading/Loading";

class Marketplace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      NFTToDisplay: [],
      allNFT: [],
      minPrice: 0,
      maxPrice: 0,
    };
  }

  componentDidMount() {
    if (this.props.AllNFT.length !== 0) {
      const a = [];
      let max = 0;
      let min = this.props.AllNFT[0].price;
      this.props.AllNFT.forEach((NFT) => {
        if (NFT.price > max) {
          max = NFT.price;
        } else if (NFT.price < min) {
          min = NFT.price;
        }
        a.push(NFT);
      });

      max = window.web3.utils.fromWei(max.toString());
      min = window.web3.utils.fromWei(min.toString());
      a.reverse();
      this.setState({
        NFTToDisplay: a.slice(),
      });
      max = parseInt(max, 10);
      min = parseInt(min, 10);

      this.setState({ allNFT: a.slice() });
      this.setState({ minPrice: min });
      this.setState({ maxPrice: max });
    }
  }

  newestFirst = () => {
    this.setState({ NFTToDisplay: [] });
    this.setState({ NFTToDisplay: this.state.allNFT.reverse() });
  };

  setPriceRange = () => {
    const a = [];
    let min = document.querySelector("#min").value;
    let max = document.querySelector("#max").value;

    // console.log(min,max);
    if (min == null && max != null) {
      this.setState({ maxPrice: max });
    } else if (min != null && max == null) {
      this.setState({ minPrice: min });
    } else {
      this.setState({ minPrice: min });
      this.setState({ maxPrice: max });
    }

    this.props.AllNFT.forEach((NFT) => {
      const p = window.web3.utils.fromWei(NFT.price.toString());
      if (p <= this.state.maxPrice && p >= this.state.minPrice) {
        a.push(NFT);
      }
    });
    this.setState({
      NFTToDisplay: a.slice(),
    });
    console.log("all", a);
  };

  expand = () => {
    const slider = document.querySelector(".slider1");
    const filter = document.querySelector(".filter");
    const filter_op = document.querySelector(".filter-op");
    slider.classList.toggle("expanded");
    filter.classList.toggle("filter1");
    filter_op.classList.toggle("filter-op1");
  };

  DropDown = () => {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
      const select = dropdown.querySelector(".select");
      const caret = dropdown.querySelector(".caret");
      const menu = dropdown.querySelector(".explore-menu");
      const options = dropdown.querySelectorAll(".explore-menu li");
      const selected = dropdown.querySelector(".selected");

      select.addEventListener("click", () => {
        select.classList.toggle("select-clicked");
        //Add the rotate styles to the caret element
        caret.classList.toggle("caret-rotate");
        //Add the open styles to the menu element
        menu.classList.toggle("menu-open");
      });

      options.forEach((option) => {
        //Add a click event to the option element
        option.addEventListener("click", () => {
          //Change selected inner text to clicked option inner text
          selected.innerText = option.innerText;
          //Add the clicked select styles to the select element

          //Add the open styles to the menu element
          select.classList.remove("select-clicked"); //Add the rotate styles to the caret element
          caret.classList.remove("caret-rotate");
          menu.classList.remove("menu-open"); //Remove active class from all option elements
          options.forEach((option) => {
            option.classList.remove("active");
          });
          option.classList.add("active");
        });
      });
    });
  };

  getUserName = (address) => {
    const Profile = this.props.allProfile[address];
    return Profile.name;
  };

  render() {
    //   console.log(this.state.NFTToDisplay[0].tokenName)
    console.log(this.state.minPrice);
    console.log(this.state.maxPrice);

    return (
      <>
        <div class="outer-container">
          <div class="slider1">
            <div className="top-bar">
              <div className="filter">
                <img src={filter} alt="" class="filter-img" />
                <p> Filter</p>
              </div>
              <div class="open-close-pointer" onClick={this.expand}>
                <img src={open} alt="" class="toggle-image" />
              </div>
            </div>
            <div className="filter-op">
              <div className="status-div">
                <p>Status</p>
                <div className="status-options">
                  <div className="flex-div">
                    <div className="part1">
                      <div className="stat">Buy Now</div>
                      <div className="stat">New</div>
                    </div>
                    <div className="part1">
                      <div className="stat">Has Offer</div>
                      <div className="stat">On Auction</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="status-div">
                <p>Price</p>
                <div className="status-options">
                  <div className="flex-div">
                    <div className="part1">
                      <input
                        className="stat"
                        id="min"
                        typeof="number"
                        placeholder="Min"
                      ></input>
                      <p>to</p>
                      <input
                        id="max"
                        className="stat"
                        typeof="number"
                        placeholder="Max"
                      ></input>
                    </div>
                    <div className="part2">
                      <button className="stat" onClick={this.setPriceRange}>
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-explore-container">
            <div class="row upper-filters">
              <div class="col-lg-6 col-md-4 col-sm-1 total">
                {this.props.totalTokensMinted} items
              </div>
              <div class="col-lg-3 col-md-3 col-sm-1 "></div>
              <div class="col-lg-3 col-md-3 col-sm-1 ">
                <div class="dropdown">
                  <div class="select" onClick={this.DropDown}>
                    <span class="selected">Sort by</span>
                    <div class="caret"></div>
                  </div>
                  <ul class="explore-menu">
                    <li class="active">Most Popular</li>
                    <li>Recently listed</li>
                    <li onClick={this.newestFirst}>Recently created</li>
                    <li>Recently sold</li>
                    <li>Price: Low to High</li>
                    <li>Price: High to Low</li>
                    <li>Oldest</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row nft-card-row">
              <div className="container">
                <div class="row nft-container">
                  {this.state.NFTToDisplay.length !== 0 ? (
                    <>
                      {this.state.NFTToDisplay.map((NFT) => {
                        return (
                          <div
                            key={NFT.tokenId.toNumber()}
                            class="col-4 col-lg-4 col-md-6 col-sm-1 align-items-center nft_card"
                          >
                            <Link
                              to={"/assets/details/" + NFT.tokenId.toNumber()}
                            >
                              <div className="details-div">
                                <div class="inner-div">
                                  {!this.state.loading ? (
                                    <img
                                      class="buy-nft-image"
                                      src={NFT.tokenImage}
                                      alt=""
                                    />
                                  ) : (
                                    <Loading />
                                  )}
                                </div>
                                <div class="row nft-details">
                                  <div class="col nft-name-explore">
                                    <p class="n">
                                      <Link to={"/profile/" + NFT.currentOwner}>
                                        {this.getUserName(NFT.currentOwner)}
                                      </Link>
                                    </p>
                                    <p class="nft-owner-name-explore">
                                      {NFT.tokenName}
                                    </p>
                                  </div>
                                  <div class="col nft-price-explore">
                                    <p class="n">Price</p>
                                    <p>
                                      <img src={eth} alt="" class="ether-img" />{" "}
                                      {window.web3.utils.fromWei(
                                        NFT.price.toString()
                                      )}{" "}
                                    </p>
                                  </div>
                                </div>
                                <div class="row buy-details"></div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Marketplace;
