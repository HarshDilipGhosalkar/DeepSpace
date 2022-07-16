import React, { Component } from "react";
import "./style.css";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

class FormAndPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NFTName: "",
      NFTPrice: "",
      fileUrl: "",
      description: "",
      imageIsUpload: false,
    };
  }

  componentDidMount = async () => {
    await this.props.setMintBtnTimer();
  };

  onUpload = async (e) => {
    const image = document.querySelector(".img-uploaded");
    const fileInput = document.querySelector(".img-fileInput");

    const file = e.target.files[0];
    try {
      const added = await ipfs.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      image.style.height = "100%";
      image.style.width = "100%";
      fileInput.style.opacity = "0";

      this.setState({ fileUrl: url });
      this.setState({ imageIsUpload: true });
      console.log(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  callMintMyNFTFromApp = (e) => {
    e.preventDefault();

    this.props.mintMyNFT(
      this.state.fileUrl,
      this.state.NFTName,
      this.state.NFTPrice,
      this.state.description
    );
  };

  render() {
    return (
      <div>
        <div class="main-u">
          <div class="inner-u">
            <div class="form-c">
              <form onSubmit={this.callMintMyNFTFromApp}>
                <h1>Create New Item</h1>
                <p class="sub-head">
                  <span class="highlight">* </span>Required fields{" "}
                </p>
                <div class="banner-image">
                  <label for="b2" class="head">
                    {" "}
                    Image, Video, Audio, or 3D Model{" "}
                    <span class="highlight">*</span>
                  </label>
                  <p class="sub-head">
                    File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3,
                    WAV, OGG, GLB, GLTF. Max size: 100 MB
                  </p>
                  <div id="b2" class="nft-image">
                    <img class="img-uploaded" src={this.state.fileUrl} alt=""/>
                    <input
                      class="img-fileInput"
                      type="file"
                      onChange={this.onUpload}
                    />
                  </div>
                </div>
                <label for="text-1542372332072" class="head">
                  Name <span class="highlight">*</span>
                </label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    name="text-1542372332012"
                    id="text-1542372332012"
                    required="required"
                    value={this.state.NFTName}
                    placeholder="Item name"
                    onChange={(e) => this.setState({ NFTName: e.target.value })}
                  ></input>
                  {/* <label for="text-1542372332072"> Name</label> */}
                </div>
                <br />
                <label for="text-1542372332072" class="head">
                  Price <span class="highlight">*</span>
                </label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="number"
                    name="text-1542372332032"
                    id="text-1542372332032"
                    required="required"
                    value={this.state.NFTPrice}
                    placeholder="Price"
                    onChange={(e) =>
                      this.setState({ NFTPrice: e.target.value })
                    }
                  ></input>
                  {/* <label for="text-1542372332072"> Name</label> */}
                </div>

                <div class="des-group">
                  <label for="des" class="head">
                    Description
                  </label>
                  <p class="sub-head">
                    The description will be included on the item's detail page
                    underneath its image.
                  </p>
                  <textarea
                    id="des"
                    name="des"
                    rows="8"
                    cols="60"
                    placeholder="Share about your NFT."
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                  ></textarea>
                </div>
                <hr></hr>
                <br />
                {!this.state.imageIsUpload ? (
                  <button
                    type="submit"
                    class="create-btn create-btn-disabled"
                    disabled
                  >
                    Create NFT
                  </button>
                ) : (
                  <button type="submit" class="create-btn">
                    Create NFT
                  </button>
                )}

                <div className="mt-4">
                  {this.props.nameIsUsed ? (
                    <div className="alert alert-danger alert-dissmissible">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                      >
                        <span>&times;</span>
                      </button>
                      <strong>This name is taken!</strong>
                    </div>
                  ) : this.props.imageIsUsed ? (
                    <div className="alert alert-danger alert-dissmissible">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                      >
                        <span>&times;</span>
                      </button>
                      <strong>This Image is taken!</strong>
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FormAndPreview;
