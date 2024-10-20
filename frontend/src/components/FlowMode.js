import React, { useState, useEffect, useCallback } from 'react';
import './FlowMode.css';

function FlowMode({ originalText, onFeedbackUpdate, onProgressUpdate }) {
  const [inputText, setInputText] = useState('');
  const [isCorrect, setIsCorrect] = useState(true);

  const findNextExpectedWord = useCallback((input) => {
    const inputWords = input.split(/\s+/);
    const originalWords = originalText.split(/\s+/);
    let index = 0;

    while (index < inputWords.length && index < originalWords.length) {
      if (inputWords[index].toLowerCase() !== originalWords[index].toLowerCase()) {
        return originalWords[index];
      }
      index++;
    }

    return originalWords[index] || '';
  }, [originalText]);

  useEffect(() => {
    const progressPercentage = (inputText.length / originalText.length) * 100;
    onProgressUpdate(progressPercentage);

    if (inputText === originalText.slice(0, inputText.length)) {
      setIsCorrect(true);
      onFeedbackUpdate('', true);

      if (inputText.length === originalText.length) {
        onFeedbackUpdate('Congratulations! You have completed the text.', true);
      }
    } else {
      setIsCorrect(false);
      const expectedWord = findNextExpectedWord(inputText);
      onFeedbackUpdate(`Incorrect. Expected: "${expectedWord}"`, false);
    }
  }, [inputText, originalText, onFeedbackUpdate, onProgressUpdate, findNextExpectedWord]);

  const handleFlowInput = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div className="flow-mode">
      <div id="flow-progress">
        <div id="flow-progress-fill" style={{ width: `${(inputText.length / originalText.length) * 100}%` }}></div>
      </div>
      <textarea
        id="flow-input"
        placeholder="Begin your quest by reciting the text from memory..."
        value={inputText}
        onChange={handleFlowInput}
        className={isCorrect ? '' : 'highlight-wrong'}
      />
    </div>
  );
}

export default FlowMode;
