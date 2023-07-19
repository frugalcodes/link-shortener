import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "axios";

import "./App.css";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [shortenedLink, setShortenedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.shrtco.de/v2/shorten?url=${userInput}`
      );
      setShortenedLink(response.data.result.full_short_link);
      setCopied(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCopy = () => {
    setCopied(true);
  };

  return (
    <div className="App">
      <div className="center-container">
        <h1 className="title">Link Shortener</h1>
        <p className="description">Enter a long URL below to get a shortened link:</p>
        <div className="input-container">
          <input
            type="text"
            className="input-field"
            placeholder="Enter URL"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button className="button" onClick={fetchData}>
            Shorten
          </button>
          {shortenedLink && (
            <div className="shortened-link-container">
              <input
                type="text"
                className="shortened-link-input"
                value={shortenedLink}
                readOnly
              />
              <CopyToClipboard text={shortenedLink} onCopy={handleCopy}>
                <button className="copy-button">
                  {copied ? "Copied" : "Copy URL"}
                </button>
              </CopyToClipboard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
