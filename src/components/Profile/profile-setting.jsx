import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./assets/profile-setting.css";
import eye from "./assets/eye.svg";
import { Buffer } from 'buffer';
// const ipfsClient = require("ipfs-http-client");
// const ipfs = ipfsClient({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
// });

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerHash: this.props.currentProfile.bannerHash,
      imageHash: this.props.currentProfile.imageHash,
      name: this.props.currentProfile.name,
      description: this.props.currentProfile.description,
      email: this.props.currentProfile.email,
      imageIsUpload: false,
    };
  }
  uploadFileToIPFS = async (fileBlob) => {
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE5NzkzNUM4NUQxODZmNEJCN2NlN2U1RjhGYjY4NWQ4NUJlY0ZkREEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NjE5OTY3NzU0MywibmFtZSI6ImhhcnNoQDIzMDQifQ.gEWeVVohValCGdXRyGorzcYkc0umfpjcJOsPJxDMkQU";

    var config = {
      method: "post",
      url: "https://api.nft.storage/upload",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "image/jpeg",
      },
      data: fileBlob,
    };

    const fileUploadResponse = await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });

    return fileUploadResponse;
  };
  onUpload = async (e) => {
    const file = e.target.files[0];
    try {
      // const added = await ipfs.add(file);
      // const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async () => {
        window.Buffer = Buffer;
        const res = Buffer(reader.result);
        var b = Buffer.from(res);
        let ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
        console.log(res);
        console.log(b);
        console.log(ab);
  
        const imageblob = new Blob([ab], { type: "image/jpg" });
        // Upload image to IPFS
        const imageUploadResponse = await this.uploadFileToIPFS(imageblob);
        const imageIPFS = imageUploadResponse.value.cid;
        const imageLink = `https://alchemy.mypinata.cloud/ipfs/${imageIPFS}/`;
        this.setState({ imageHash: imageLink });
        this.setState({ imageIsUpload: true });
      }

     
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };
  onUpload1 = async (e) => {
    const file = e.target.files[0];
    try {
      // const added = await ipfs.add(file);
      // const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async () => {
        window.Buffer = Buffer;
        const res = Buffer(reader.result);
        var b = Buffer.from(res);
        let ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
        console.log(res);
        console.log(b);
        console.log(ab);
  
        const imageblob = new Blob([ab], { type: "image/jpg" });
        // Upload image to IPFS
        const imageUploadResponse = await this.uploadFileToIPFS(imageblob);
        const imageIPFS = imageUploadResponse.value.cid;
        const imageLink = `https://alchemy.mypinata.cloud/ipfs/${imageIPFS}/`;
        this.setState({ bannerHash: imageLink });
        this.setState({ imageIsUpload: true });
      }
      
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };
  callUploadProfileFromApp = (e) => {
    e.preventDefault();
    this.props.uploadProfile(
      this.state.bannerHash,
      this.state.imageHash,
      this.state.name,
      this.state.description,
      this.state.email,
      "0"
    );
  };
  render() {
    return (
      <div class="setting-main main-u">
        <div class="inner-u">
          <div class="form-u">
            <form
              onSubmit={this.callUploadProfileFromApp}
              class="form-profile-setting"
            >
              <h1>Profile Settings</h1>

              <Link to="/profile">
                <button type="button" class="preview-btn">
                  {" "}
                  <img src={eye} alt="" class="prev-btn-img" /> Preview
                </button>
              </Link>
              <div className="row">
                <div class="setting-div col-7   ">
                  <label for="text-1542372332072">Username</label>

                  <div class="input-group nft-input">
                    <input
                      class="form-control "
                      type="text"
                      name="text-1542372332072"
                      id="text-1542372332072"
                      required="required"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                    ></input>
                  </div>
                  <label for="bio">Bio</label>
                  <div class="ta">
                    <textarea
                      id="bio"
                      name="bio"
                      rows="4"
                      cols="60"
                      value={this.state.description}
                      onChange={(e) =>
                        this.setState({ description: e.target.value })
                      }
                    >
                      Share about you.
                    </textarea>
                  </div>
                  <label for="email">Email Address</label>
                  <div class="input-group nft-input">
                    <input
                      class="form-control"
                      type="text"
                      name="email"
                      id="email"
                      required="required"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    ></input>
                  </div>
                </div>

                <div class="setting-div col">
                  <div class="profile-image nft-input">
                    <label class="image_label" for="image">
                      {" "}
                      ProfileImage
                    </label>
                    <div class="prof-img setting_image">
                      <img src={this.state.imageHash} alt="" />
                      <input type="file" onChange={this.onUpload} />
                    </div>
                  </div>
                  <div class="banner-image nft-input">
                    <label class="image_label" for="banner">
                      {" "}
                      BannerImage
                    </label>
                    <div class="prof-img setting_image banner_setting_img">
                      <img src={this.state.bannerHash} alt="" />
                      <input type="file" onChange={this.onUpload1} />
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" class="save-btn">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
