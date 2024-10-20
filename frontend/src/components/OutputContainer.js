import React, { useState, useEffect, useRef, useCallback } from 'react';
import ClozeMode from './ClozeMode';
import FlowMode from './FlowMode';
import FlashMode from './FlashMode';
import FlashControls from './FlashControls';
import './OutputContainer.css';

function OutputContainer({ processedText, originalText, mode, onReset, frequency, onFrequencyChange, isLoading }) {
  const [currentLine, setCurrentLine] = useState('');
  const [userInput, setUserInput] = useState('');
  const [showLine, setShowLine] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [completedLines, setCompletedLines] = useState([]);
  const lines = useRef(originalText.split('\n').filter(line => line.trim() !== ''));
  const [flowFeedback, setFlowFeedback] = useState({ message: '', isCorrect: true });
  const [flowProgress, setFlowProgress] = useState(0);

  useEffect(() => {
    if (mode === 'flash' && lineIndex < lines.current.length) {
      setCurrentLine(lines.current[lineIndex]);
      setShowLine(true);
      setUserInput('');
      setIsCorrect(false);
      setIsWrong(false);
      const timer = setTimeout(() => {
        setShowLine(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lineIndex, mode]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    if (userInput.trim().toLowerCase() === currentLine.trim().toLowerCase()) {
      setIsCorrect(true);
      setIsWrong(false);
      setCompletedLines([...completedLines, currentLine]);
      setShowLine(false);
      setUserInput('');
      setTimeout(() => {
        setIsCorrect(false);
        setLineIndex(prevIndex => prevIndex + 1);
      }, 1000);
    } else {
      setIsWrong(true);
      setUserInput('');
      setTimeout(() => {
        setIsWrong(false);
      }, 1000);
    }
  };

  const handleShowLine = () => {
    setShowLine(true);
    setTimeout(() => {
      setShowLine(false);
    }, 3000);
  };

  const handleFlowFeedbackUpdate = useCallback((message, isCorrect) => {
    setFlowFeedback({ message, isCorrect });
  }, []);

  const handleFlowProgressUpdate = useCallback((progress) => {
    setFlowProgress(progress);
  }, []);

  return (
    <div id="output-container">
      <div className="text-container">
        {isLoading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Processing text...</p>
          </div>
        ) : mode === 'cloze' ? (
          <ClozeMode processedText={processedText} />
        ) : mode === 'flow' ? (
          <FlowMode 
            originalText={originalText} 
            onFeedbackUpdate={handleFlowFeedbackUpdate}
            onProgressUpdate={handleFlowProgressUpdate}
          />
        ) : (
          <FlashMode 
            currentLine={currentLine}
            showLine={showLine}
            completedLines={completedLines}
            lineIndex={lineIndex}
            totalLines={lines.current.length}
          />
        )}
      </div>
      <div className="controls-container">
        {mode === 'cloze' && (
          <div className="slider-container">
            <label htmlFor="word-frequency">Word replacement frequency:</label>
            <input
              type="range"
              id="word-frequency"
              min="2"
              max="10"
              value={frequency}
              onChange={(e) => onFrequencyChange(parseInt(e.target.value))}
            />
            <span id="frequency-value">Every <span>{frequency}</span> words</span>
          </div>
        )}
        {mode === 'flow' && (
          <div id="flow-feedback" className={flowFeedback.isCorrect ? 'correct' : 'incorrect'}>
            {flowFeedback.message}
          </div>
        )}
        {mode === 'flash' && (
          <FlashControls 
            userInput={userInput}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onShowLine={handleShowLine}
            isCorrect={isCorrect}
            isWrong={isWrong}
          />
        )}
        <button onClick={onReset} className="reset-button">Reset</button>
      </div>
    </div>
  );
}

export default OutputContainer;
