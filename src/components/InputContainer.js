import React from 'react';
import './InputContainer.css';

function InputContainer({ onProcess, onFlow, onFlash, inputText, setInputText, poemInfo, frequency }) {
  return (
    <div id="input-container">
      <textarea
        id="input-text"
        placeholder="Enter your text here or use a random poem..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className="button-container">
        <button onClick={() => onProcess(inputText, frequency)}>Cloze Mode</button>
        <button onClick={() => onFlow(inputText)}>Flow Mode</button>
        <button onClick={() => onFlash(inputText)}>Flash Mode</button>
      </div>
    </div>
  );
}

export default InputContainer;
