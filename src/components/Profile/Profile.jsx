import React from "react";
import { Link } from "react-router-dom";

import "./assets/Profile.css";
import setting from "./assets/setting.png";
import share from "./assets/share.png";
import DisplayNFT from "./DisplayNFT";

const Profile = ({ currentProfile, AllNFT }) => {
  return (
    <div class="main">
      <div class="upper">
        <img src={currentProfile.bannerHash} alt="" />
        <input type="file" />
      </div>
      <div class="details">
        <div class="details-inner">
          <div class="prof-img">
            <img src={currentProfile.imageHash} alt="" />
            {/* <input type="file" /> */}
          </div>
          <div class="user-details">
            <h1>{currentProfile.name}</h1>

            <div class="address">
              {currentProfile.user.substr(0, 5) +
                "..." +
                currentProfile.user.slice(currentProfile.user.length - 5)}
            </div>
            <p>{currentProfile.timeOfRegistry}</p>

            <p>{currentProfile.description}</p>
          </div>
        </div>
        <div class="share__Icon">
          <img class="icons" src={share} alt="" />
        </div>
        <div class="settings__Icon">
          <Link to="/profile/settings">
            <img class="icons" src={setting} alt="" />
          </Link>
        </div>
      </div>
      <DisplayNFT AllNFT={AllNFT} profileAddress={currentProfile.user} />
    </div>
  );
};

export default Profile;
