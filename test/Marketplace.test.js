const { assert } = require("chai");

const Marketplace = artifacts.require("./Marketplace.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("NFT Marketplace", async (accounts) => {
  let NFT, result, NFTCount;

  before(async () => {
    NFT = await Marketplace.deployed();
  });

  describe("Deployment", async () => {
    it("contract has an address", async () => {
      const address = await NFT.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await NFT.collectionName();
      assert.equal(name, "NFT Collection");
    });

    it("has a symbol", async () => {
      const symbol = await NFT.collectionNameSymbol();
      assert.equal(symbol, "NFT");
    });
  });

  describe("application features", async () => {
    it("allows users to mint ERC721 token", async () => {
    NFTCount = await NFT.NFTCounter();
    assert.equal(NFTCount.toNumber(), 0);

      let tokenExists;
      tokenExists = await NFT.getTokenExists(1, { from: accounts[0] });
      assert.equal(tokenExists, false);

      let tokenURIExists;
      tokenURIExists = await NFT.tokenURIExists(
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPHRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2",
        { from: accounts[0] }
      );
      assert.equal(tokenURIExists, false);

      let tokenNameExists;
      tokenNameExists = await NFT.tokenNameExists("myCBNFT", {
        from: accounts[0],
      });
      assert.equal(tokenNameExists, false);

      result = await NFT.mintNFT(
        "myNFT",
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPHRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2",
        web3.utils.toWei("1", "Ether"),
        "https://ipfs.infura.io/ipfs/QmQAqW6a5wLZQt5ZMXwNuf8AYDQFRc26hGCmEVzmM46RVd",
        { from: accounts[0] }
      );

      NFTCount = await NFT.NFTCounter();
      assert.equal(NFTCount.toNumber(), 1);

      tokenExists = await NFT.getTokenExists(1, { from: accounts[0] });
      assert.equal(tokenExists, true);

      tokenURIExists = await NFT.tokenURIExists(
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPHRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2",
        { from: accounts[0] }
      );
      assert.equal(tokenURIExists, true);

      tokenNameExists = await NFT.tokenNameExists("myNFT", {
        from: accounts[0],
      });
      assert.equal(tokenNameExists, true);

      let nft;
      nft = await NFT.allNFTs(1, {
        from: accounts[0],
      });
      assert.equal(nft.tokenId.toNumber(), 1);
      assert.equal(nft.tokenName, "myNFT");
      assert.equal(
        nft.tokenURI,
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPHRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2"
      );
      assert.equal(nft.mintedBy, accounts[0]);
      assert.equal(nft.currentOwner, accounts[0]);
      assert.equal(
        nft.previousOwner,
        0x0000000000000000000000000000000000000000
      );
      assert.equal(web3.utils.fromWei(nft.price, "ether"), 1);
      assert.equal(nft.numberOfTransfers.toNumber(), 0);
      assert.equal(nft.forSale, false);

      await NFT.mintNFT(
        "myNFT2",
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPQRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2",
        web3.utils.toWei("1", "Ether"),
        "https://ipfs.infura.io/ipfs/QmdRa9J1jRcBUEBubDjyd4QG7326n7NiJ6sUnG5W9DKxza",
        { from: accounts[1] }
      );

      // same token uri -reject
      await NFT.mintNFT(
        "myNFT3",
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPQRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2",
        web3.utils.toWei("1", "Ether"),
        "https://ipfs.infura.io/ipfs/QmdRa9J1jRcBUEBubDjyd4QG7326n7NiJ6sUnG5W9DKxza",
        { from: accounts[3] }
      ).should.be.rejected;

     
      // 0x0 adress sending txn - reject
      await NFT.mintNFT(
        "myNFT4",
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPQRYN14Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2",
        web3.utils.toWei("1", "Ether"),
        "https://ipfs.infura.io/ipfs/QmX77qRXWvFnVqWdyZoEGDnPEbwcrbquD3Q1o1uex3ZKgK",
        { from: 0x0000000000000000000000000000000000000000 }
      ).should.be.rejected;

      // same token name - reject
      await NFT.mintNFT(
        "myNFT",
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPSRYN15Xdv4aLd3o4Aq63y1e4GgN6kj5aK/2",
        web3.utils.toWei("1", "Ether"),
        "https://ipfs.infura.io/ipfs/QmPkygTPfetvGihnH8VLfp1muQUGikExgFnSZJSU6fZ2kA",
        { from: accounts[0] }
      ).should.be.rejected;

  
   });

    it("returns address of the token's owner", async () => {
      const tokenOwner = await NFT.getTokenOwner(2);
      assert.equal(tokenOwner, accounts[1]);
    });

    // returns tokenURI of the token
    it("returns metadata of a token", async () => {
      const tokenMetaData = await NFT.getTokenMetaData(2);
      assert.equal(
        tokenMetaData,
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPQRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2"
      );
    });

    it("returns total number of tokens minted so far", async () => {
      const totalNumberOfTokensMinted = await NFT.getNumberOfTokensMinted();
      assert.equal(totalNumberOfTokensMinted.toNumber(), 2);
    });

    it("returns total number of tokens owned by an address", async () => {
      const totalNumberOfTokensOwnedByAnAddress = await NFT.getTotalNumberOfTokensOwnedByAnAddress(
        accounts[0]
      );
      assert.equal(totalNumberOfTokensOwnedByAnAddress.toNumber(), 1);
    });

    // it("allows users to buy token for specified ethers", async () => {
    //   const oldTokenOwner = await NFT.getTokenOwner(1);
    //   assert.equal(oldTokenOwner, accounts[0]);

    //   let oldTokenOwnerBalance;
    //   oldTokenOwnerBalance = await web3.eth.getBalance(accounts[0]);
    //   oldTokenOwnerBalance = new web3.utils.BN(oldTokenOwnerBalance);

    //   let oldTotalNumberOfTokensOwnedBySeller;
    //   oldTotalNumberOfTokensOwnedBySeller = await NFT.getTotalNumberOfTokensOwnedByAnAddress(
    //     accounts[0]
    //   );
    //   assert.equal(oldTotalNumberOfTokensOwnedBySeller.toNumber(), 1);

    //   let nft;
    //   nft = await NFT.allNFTs(1, {
    //     from: accounts[0],
    //   });
    //   assert.equal(nft.numberOfTransfers.toNumber(), 0);

    //   result = await NFT.buyToken(1, {
    //     from: accounts[2],
    //     value: web3.utils.toWei("1", "Ether"),
    //   });

    //   const newTokenOwner = await NFT.getTokenOwner(1);
    //   assert.equal(newTokenOwner, accounts[2]);

    //   let newTokenOwnerBalance;
    //   newTokenOwnerBalance = await web3.eth.getBalance(accounts[0]);
    //   newTokenOwnerBalance = new web3.utils.BN(newTokenOwnerBalance);

    //   let newTotalNumberOfTokensOwnedBySeller;
    //   newTotalNumberOfTokensOwnedBySeller = await NFT.getTotalNumberOfTokensOwnedByAnAddress(
    //     accounts[0]
    //   );
    //   assert.equal(newTotalNumberOfTokensOwnedBySeller.toNumber(), 0);

    //   nft = await NFT.allNFTs(1, {
    //     from: accounts[0],
    //   });
    //   assert.equal(nft.numberOfTransfers.toNumber(), 1);

    //   let price;
    //   price = web3.utils.toWei("1", "Ether");
    //   price = new web3.utils.BN(price);

    //   const exepectedBalance = oldTokenOwnerBalance.add(price);
    //   assert.equal(
    //     newTokenOwnerBalance.toString(),
    //     exepectedBalance.toString()
    //   );

    //   nft = await NFT.allNFTs(1, {
    //     from: accounts[0],
    //   });
    //   assert.equal(nft.currentOwner, accounts[2]);

    //   await NFT.buyToken(2, {
    //     from: 0x0000000000000000000000000000000000000000,
    //     value: web3.utils.toWei("1", "Ether"),
    //   }).should.be.rejected;

    //   await NFT.buyToken(56, {
    //     from: accounts[4],
    //     value: web3.utils.toWei("1", "Ether"),
    //   }).should.be.rejected;

    //   await NFT.buyToken(3, {
    //     from: accounts[0],
    //     value: web3.utils.toWei("1", "Ether"),
    //   }).should.be.rejected;
    // });
    
    // it("allows users to toggle between setting the token for sale or not for sale", async () => {
    //   let nft;
    //   nft = await NFT.allNFTs(1, {
    //     from: accounts[0],
    //   });
    //   assert.equal(nft.forSale, false);

    //   result = await NFT.toggleForSale(1, { from: accounts[2] });

    //   nft = await NFT.allNFTs(1, {
    //     from: accounts[0],
    //   });
    //   assert.equal(nft.forSale, true);

    //   result = await NFT.toggleForSale(1, { from: accounts[2] });

    //   nft = await NFT.allNFTs(1, {
    //     from: accounts[0],
    //   });
    //   assert.equal(nft.forSale, true);

    //   await NFT.toggleForSale(1, {
    //     from: 0x0000000000000000000000000000000000000000,
    //   }).should.be.rejected;

    //   await NFT.toggleForSale(94, { from: accounts[2] }).should.be
    //     .rejected;

    //   await NFT.toggleForSale(1, { from: accounts[8] }).should.be
    //     .rejected;
    // });
   });
});
