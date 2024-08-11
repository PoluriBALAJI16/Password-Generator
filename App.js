import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [digitsAllowed, setDigitsAllowed] = useState(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassord = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZqwertyuiopasdfghjklzxcvbnm ";
    let digit = "1234567890";
    let specialChar = "!@#$%^&*?<>+-_()";
    if (digitsAllowed) str += digit;
    if (symbolsAllowed) str += specialChar;
    for (let i = 0; i < length; ++i) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [digitsAllowed, length, symbolsAllowed]);

  useEffect(() => {
    generatePassord();
  }, [digitsAllowed, length, symbolsAllowed]);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  return (
    <div className="container">
      <div className="password-container">
        <input
          type="text"
          value={password}
          placeholder="Password"
          className="password-input"
          ref={passwordRef}
          readOnly
        />
        <button onClick={copyToClipboard} className="copy-button">
          Copy
        </button>
      </div>

      <div>
        <div>
          <input
            type="range"
            min={8}
            max={16}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            title={`Length of Password: ${length}`}
            className="range-input"
          />
          <label className="label">Length of Password: {length}</label>
        </div>

        <div className="checkbox-container">
          <div>
            <label className="label">Numbers:</label>
            <input
              type="checkbox"
              defaultChecked={digitsAllowed}
              onChange={() => setDigitsAllowed((prev) => !prev)}
            />
          </div>

          <div>
            <label className="label">Special Characters:</label>
            <input
              type="checkbox"
              defaultChecked={symbolsAllowed}
              onChange={() => setSymbolsAllowed((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
