import React from "react";
import NFTDetails from "./NFT-Details";
import { useParams } from "react-router-dom";

const NFTDetail = ({
  AllNFT,
  accountAddress,
  changeTokenPrice,
  toggleForSale,
  buyNFT,
  allProfile,
}) => {
  const { id } = useParams();
  let tokenId = parseInt(id, 10) - 1;
  let NFT = AllNFT[tokenId];
  let currentOwnerName = allProfile[NFT.currentOwner].name;
  let mintedByName = allProfile[NFT.mintedBy].name;
  let mintTime = allProfile[NFT.mintedBy].mintTime;
  return (
    <>
      <NFTDetails
        NFT={NFT}
        accountAddress={accountAddress}
        changeTokenPrice={changeTokenPrice}
        toggleForSale={toggleForSale}
        buyNFT={buyNFT}
        currentOwnerName={currentOwnerName}
        mintedByName={mintedByName}
        mintTime={mintTime}
      />
    </>
  );
};

export default NFTDetail;
