import React from "react";
import { useParams } from "react-router-dom";

import "./assets/Profile.css";
import share from "./assets/share.png";
import DisplayNFT from "./DisplayNFT";

const ProfilePage = ({ AllNFT, allProfiles }) => {
  const { address } = useParams();
  const currentProfile = allProfiles[address];

  return (
    <>
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
              <p>Joined May 2022</p>

              <p>{currentProfile.description}</p>
            </div>
          </div>
          <div class="share__Icon other_profile_page">
            <img class="icons" src={share} alt="" />
          </div>
        </div>
        <DisplayNFT AllNFT={AllNFT} profileAddress={currentProfile.user} />
      </div>
    </>
  );
};

export default ProfilePage;
