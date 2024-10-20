import React from 'react';
import './FlashMode.css';

function FlashMode({ currentLine, showLine, completedLines, lineIndex, totalLines }) {
  if (lineIndex >= totalLines) {
    return (
      <div className="flash-mode-complete">
        <h2>Congratulations! You've completed all lines.</h2>
        <div className="completed-poem">
          {completedLines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flash-mode">
      <div className="completed-poem">
        {completedLines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <div className="flash-display">
        <p className={`flash-line ${showLine ? 'visible' : ''}`}>{currentLine}</p>
      </div>
      <div className="flash-progress">
        Line {lineIndex + 1} of {totalLines}
      </div>
    </div>
  );
}

export default FlashMode;
