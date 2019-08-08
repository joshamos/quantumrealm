import React, { Component, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function LambdaDemo() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleClick = (api: string) => (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const url = "/.netlify/functions/" + api;
    console.log(url);

    setLoading(true);
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => {
        setLoading(false);
        setMessage(json.msg);
      });
  };

  return (
    <p>
      <button onClick={handleClick("hello")}>
        {loading ? "Loading..." : "Call Lambda"}
      </button>
      <button onClick={handleClick("async-dadjoke")}>
        {loading ? "Loading..." : "Call Async Lambda"}
      </button>
      <br />
      <span>{message}</span>
    </p>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <LambdaDemo />
        </header>
      </div>
    );
  }
}

export default App;
