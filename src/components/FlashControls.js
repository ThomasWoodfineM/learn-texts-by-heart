import React, { useRef, useEffect } from 'react';

export default function FlashControls({ userInput, onInputChange, onSubmit, onShowLine, isCorrect, isWrong }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [userInput]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };
  

  return (
    <div className={`flash-controls ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}>
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={onInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type the line you just saw..."
        className="flash-input"
      />
      <button onClick={onSubmit} className="flash-submit">Submit</button>
      <button onClick={onShowLine} className="show-line-button">Show Line Again</button>
    </div>
  );
}
