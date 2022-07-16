import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./assets/style.css";
import eth from "./assets/eth.svg";
import wallet from "./assets/wallet.png";
import share from "./assets/share.png";
import content from "./assets/content.png";

class NFTDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNFTPrice: "",
    };
  }

  callChangeTokenPriceFromApp = (tokenId, newPrice) => {
    this.props.changeTokenPrice(tokenId, newPrice);
  };
  render() {
    return (
      <>
        <div class="details-main">
          <div className="row">
            <div class="col col-sm-12 detail-page__nft-image_section">
              <div className="row detail-page__nft-image">
                <div className="row nft-image-header">
                  <img class="eth-small" src={eth} alt="" />
                </div>
                <div className="row nft-image-div">
                  <img src={this.props.NFT.tokenImage} alt=""></img>
                </div>
              </div>
              <div className="row price_row detail_section">
                <div className="row created_on div_title">
                  <img class="description_image" src={content} alt="" />
                  Description
                </div>
                <div className="row price_div">
                  <div className="row div_content_text description_content">
                    {this.props.NFT.metaData !== undefined ? (
                      <>
                        {this.props.NFT.metaData.description.length !== 0 ? (
                          this.props.NFT.metaData.description
                        ) : (
                          <em>No Description</em>
                        )}
                      </>
                    ) : (
                      <em>No Description</em>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div class="col col-sm-12 nft-item-details">
              <div className="row">
                <div className="col-10 creator_details">
                  <Link to={"/profile/" + this.props.NFT.mintedBy}>
                    <p class="creator-name" href="">
                      {this.props.mintedByName}
                    </p>
                  </Link>
                </div>
                <div className="col">
                  <div className="row nft-details-share">
                    <img src={share} height="25px" alt="" />
                  </div>
                </div>
                <h1 className="nft_name">
                  {this.props.NFT.tokenName} #
                  {this.props.NFT.tokenId.toNumber()}
                </h1>
                <div className="row owner_name">
                  <span>
                    Owned by{" "}
                    <Link to={"/profile/" + this.props.NFT.currentOwner}>
                      {this.props.currentOwnerName}
                    </Link>
                  </span>
                </div>
                <div className="row price_row">
                  <div className="row created_on">
                    {/* Sale ends June 14, 2022 at 9:16pm GMT+5:30 */}
                    Created on {this.props.NFT.mintTime}
                  </div>
                  <div className="row price_div">
                    <div className="row price-header">Current price</div>
                    <div className="row assets-price-detail">
                      <img src={eth} class="eth_icon" alt=""></img>
                      <span class="eth_price">
                        {window.web3.utils.fromWei(
                          this.props.NFT.price.toString(),
                          "Ether"
                        )}{" "}
                      </span>
                      <span class="dollar_price">($162.52)</span>
                    </div>
                    <div className="row">
                      {this.props.accountAddress !==
                      this.props.NFT.currentOwner ? (
                        this.props.NFT.forSale ? (
                          <button
                            class="buy_now-btn"
                            value={this.props.NFT.price}
                            onClick={(e) =>
                              this.props.buyNFT(
                                this.props.NFT.tokenId.toNumber(),
                                e.target.value
                              )
                            }
                          >
                            <img class="wallet_icon" src={wallet} alt=""></img>
                            Buy now
                          </button>
                        ) : (
                          <>
                            <button disabled class="buy_now-btn">
                              <img
                                class="wallet_icon"
                                src={wallet}
                                alt=""
                              ></img>
                              Buy now
                            </button>
                            <p class="notForSale">Currently not for sale!</p>
                          </>
                        )
                      ) : null}

                      {this.props.accountAddress ===
                      this.props.NFT.currentOwner ? (
                        this.props.NFT.forSale ? (
                          <button
                            class="remove-btn"
                            onClick={() =>
                              this.props.toggleForSale(
                                this.props.NFT.tokenId.toNumber()
                              )
                            }
                          >
                            Remove from sale
                          </button>
                        ) : (
                          <button
                            class="keep-btn"
                            onClick={() =>
                              this.props.toggleForSale(
                                this.props.NFT.tokenId.toNumber()
                              )
                            }
                          >
                            Keep for sale
                          </button>
                        )
                      ) : null}
                    </div>
                  </div>
                </div>
                {this.props.accountAddress === this.props.NFT.currentOwner ? (
                  <div className="row price_row">
                    <div className="row created_on div_title">
                      Change Token Price :
                    </div>
                    <div className="row price_div change-price-row">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          this.callChangeTokenPriceFromApp(
                            this.props.NFT.tokenId.toNumber(),
                            this.state.newNFTPrice
                          );
                        }}
                      >
                        <div className="form-group mt-4 ">
                          <div class="input-group price-input_detail">
                            <input
                              required
                              type="number"
                              name="newNFTPrice"
                              id="newNFTPrice"
                              value={this.state.newNFTPrice}
                              className="form-control w-50"
                              placeholder="Enter new price"
                              onChange={(e) =>
                                this.setState({
                                  newNFTPrice: e.target.value,
                                })
                              }
                            />
                          </div>
                          <button type="submit" class="change_price-btn">
                            Change Price
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : null}

                <div className="row price_row">
                  <div className="row created_on">Token Details</div>
                  <div className="row price_div">
                    <div className="row div_content_text">
                      <div className="col-6">Number Of Transfers</div>
                      <div className="col-3">
                        {this.props.NFT.numberOfTransfers.toNumber()}
                      </div>
                    </div>
                    <div className="row div_content_text">
                      <div className="col-6">Previous Owner</div>
                      <div className="col-3">
                        <Link to={"/profile/" + this.props.NFT.previousOwner}>
                          {this.props.NFT.previousOwner.substr(0, 5) +
                            "..." +
                            this.props.NFT.previousOwner.slice(
                              this.props.NFT.previousOwner.length - 5
                            )}
                        </Link>
                      </div>
                    </div>
                    <div className="row div_content_text">
                      <div className="col-6">Owned By</div>
                      <div className="col-3">
                        <Link to={"/profile/" + this.props.NFT.currentOwner}>
                          {this.props.NFT.currentOwner.substr(0, 5) +
                            "..." +
                            this.props.NFT.currentOwner.slice(
                              this.props.NFT.currentOwner.length - 5
                            )}
                        </Link>
                      </div>
                    </div>

                    <div className="row div_content_text">
                      <div className="col-6">Minted By</div>
                      <div className="col-3">
                        <Link to={"/profile/" + this.props.NFT.mintedBy}>
                          {this.props.NFT.mintedBy.substr(0, 5) +
                            "..." +
                            this.props.NFT.mintedBy.slice(
                              this.props.NFT.mintedBy.length - 5
                            )}
                        </Link>
                      </div>
                    </div>

                    <div className="row div_content_text">
                      <div className="col-6">Token URI</div>
                      <div className="col-3">
                        <a href={this.props.NFT.tokenURI}>
                          {this.props.NFT.tokenURI.substr(0, 25) +
                            "..." +
                            this.props.NFT.tokenURI.slice(
                              this.props.NFT.tokenURI.length - 5
                            )}
                        </a>
                      </div>
                    </div>
                    <div className="row div_content_text">
                      <div className="col-6">MintTime</div>
                      <div className="col-4">
                        {this.props.NFT.mintTime}
                      </div>
                    </div>

                    <div className="row "></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default NFTDetails;
