import React, { useState } from "react";
import "./Queries.css";

const Queries = (props) => {
  const [tokenIdForOwner, setTokenIdForOwner] = useState("");
  const [tokenOwner, setTokenOwner] = useState("");
  const [tokenIdForOwnerNotFound, setTokenIdForOwnerNotFound] = useState(false);

  const [tokenIdForMetadata, setTokenIdForMetadata] = useState("");
  const [tokenMetadata, setTokenMetadata] = useState("");
  const [tokenMetadataLink, setTokenMetadataLink] = useState("");
  const [tokenIdForMetadataNotFound, setTokenIdForMetadataNotFound] = useState(
    false
  );

  const getTokenOwner = async (e) => {
    e.preventDefault();
    try {
      const owner = await props.NFTsContract.methods
        .getTokenOwner(tokenIdForOwner)
        .call();
      setTokenOwner(owner);
      setTimeout(() => {
        setTokenOwner("");
        setTokenIdForOwner("");
      }, 5000);
    } catch (e) {
      setTokenIdForOwnerNotFound(true);
      setTokenIdForOwner("");
    }
  };

  const getTokenMetadata = async (e) => {
    e.preventDefault();
    try {
      const metadata = await props.NFTsContract.methods
        .getTokenMetaData(tokenIdForMetadata)
        .call();
      setTokenMetadata(
        metadata.substr(0, 40) + "..." + metadata.slice(metadata.length - 5)
      );
      setTokenMetadataLink(metadata);
      setTimeout(() => {
        setTokenMetadata("");
        setTokenIdForMetadata("");
      }, 5000);
    } catch (e) {
      setTokenIdForMetadataNotFound(true);
      setTokenIdForMetadata("");
    }
  };

  return (
    <div>
      <div className="card mt-1 query">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h1 class="query-title">Query</h1>
        </div>
      </div>
      <div className=" mt-1 get-data">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-4">
            <form onSubmit={getTokenOwner}>
              <div className="form-group">
                <label for="text-1542372332072" class="head">
                  Owner
                </label>
                <div class="input-group get-input">
                  <input
                    class="form-control"
                    type="text"
                    name="text-1542372332012"
                    id="text-1542372332012"
                    value={tokenIdForOwner}
                    placeholder="Enter Token Id"
                    onChange={(e) => setTokenIdForOwner(e.target.value)}
                  ></input>
                </div>
              </div>
              <button type="submit" class="create-btn query-btn">
                Get Owner
              </button>
              {tokenIdForOwnerNotFound ? (
                <div className="alert alert-danger alert-dissmissible mt-4">
                  <button type="button" className="close" data-dismiss="alert">
                    <span>&times;</span>
                  </button>
                  <strong>Non-Existent Token Id</strong>
                </div>
              ) : null}
            </form>
            <p className="mt-4 retieved-data">{tokenOwner}</p>
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-4">
            <form onSubmit={getTokenMetadata}>
              <div className="form-group">
                <label for="text-1542372332072" class="head">
                  Get Token Metadata
                </label>
                <div class="input-group get-input">
                  <input
                    class="form-control"
                    type="text"
                    name="text-1542372332012"
                    id="text-1542372332012"
                    value={tokenIdForMetadata}
                    placeholder="Enter Token Id"
                    onChange={(e) => setTokenIdForMetadata(e.target.value)}
                  ></input>
                </div>
              </div>
              <button type="submit" class="create-btn query-btn">
                Get Token Metadata
              </button>
              {tokenIdForMetadataNotFound ? (
                <div className="alert alert-danger alert-dissmissible mt-4">
                  <button type="button" className="close" data-dismiss="alert">
                    <span>&times;</span>
                  </button>
                  <strong>Non-Existent Token Id</strong>
                </div>
              ) : null}
            </form>
            <p className="mt-4">
              <a
                class="retieved-data"
                href={`${tokenMetadataLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tokenMetadata}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queries;
