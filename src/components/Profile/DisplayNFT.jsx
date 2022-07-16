import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./assets/DisplayNFT.css";
import eth from "./assets/eth.svg";

class DisplayNFT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NFTToDisplay: [],
      loading: false,
    };
  }

  componentDidMount() {
    document.querySelector(".link_button1").disabled = true;
    const a = [];
    this.props.AllNFT.forEach((NFT) => {
      if (NFT.mintedBy === this.props.profileAddress) {
        a.push(NFT);
      }
    });
    a.reverse();
    this.setState({ NFTToDisplay: a.slice() });
  }

  MintedTab = () => {
    this.toggleActiveState();
    document.querySelector(".link_button1").disabled = true;
    document.querySelector(".link_button2").disabled = false;
    // this.setState({NFTToDisplay : []})
    const a = [];
    this.props.AllNFT.forEach((NFT) => {
      if (NFT.mintedBy === this.props.profileAddress) {
        a.push(NFT);
      }
    });
    a.reverse();
    this.setState({ NFTToDisplay: a.slice() });
  };

  CollectionTab = () => {
    document.querySelector(".link_button2").disabled = true;
    document.querySelector(".link_button1").disabled = false;
    this.toggleActiveState();
    const a = [];
    this.props.AllNFT.forEach((NFT) => {
      if (NFT.currentOwner === this.props.profileAddress) {
        a.push(NFT);
      }
    });
    a.reverse();
    this.setState({ NFTToDisplay: a.slice() });

    console.log(a);
  };

  toggleActiveState = () => {
    document.querySelector(".link_button1").classList.toggle("active_");

    document.querySelector(".underline_1").classList.toggle("underline");
    document.querySelector(".underline_1").classList.toggle("option_underline");

    document.querySelector(".link_button2").classList.toggle("active_");
    document.querySelector(".underline_2").classList.toggle("option_underline");
    document.querySelector(".underline_2").classList.toggle("underline");
  };

  render() {
    return (
      <>
        <div class="option">
          <ul class="menu">
            <li>
              <button
                onClick={this.MintedTab}
                class="option_link link_button1 active_"
                href="#"
              >
                Minted Tokens
              </button>
              <div class="underline_1 underline"></div>
            </li>
            <li>
              <button
                onClick={this.CollectionTab}
                class="option_link link_button2"
                href="#"
              >
                Owned Collection
              </button>
              <div class="underline_2 option_underline"></div>
            </li>
          </ul>
        </div>
        <div className="row nft-card-row">
          <div className="container">
            <div class="row nft-container">
              {this.state.NFTToDisplay.map((NFT) => {
                return (
                  <div
                    key={NFT.tokenId.toNumber()}
                    class="col-4 col-lg-4 col-md-6 col-sm-1 align-items-center nft_card"
                  >
                    <Link to={"/assets/details/" + NFT.tokenId.toNumber()}>
                      <div className="details-div">
                        <div class="inner-div">
                          <img
                            class="buy-nft-image"
                            src={NFT.tokenImage}
                            alt=""
                          />
                        </div>
                        <div class="row nft-details">
                          <div class="col nft-name-explore">
                            <p class="n">
                              {NFT.currentOwner.substr(0, 5) +
                                "..." +
                                NFT.currentOwner.slice(
                                  NFT.currentOwner.length - 5
                                )}
                            </p>
                            <p class="nft-owner-name-explore">
                              {NFT.tokenName}
                            </p>
                          </div>
                          <div class="col nft-price-explore">
                            <p class="n">Price</p>
                            <p>
                              <img src={eth} alt="" class="ether-img" />{" "}
                              {window.web3.utils.fromWei(NFT.price.toString())}{" "}
                            </p>
                          </div>
                        </div>
                        <div class="row buy-details"></div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DisplayNFT;
