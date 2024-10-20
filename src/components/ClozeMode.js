import React, { useState, useEffect, useRef } from 'react';
import './ClozeMode.css';

function ClozeMode({ processedText }) {
  const [inputs, setInputs] = useState({});
  const [words, setWords] = useState([]);
  const inputRefs = useRef({});

  useEffect(() => {
    setWords(processedText.split(' '));
    setInputs({});  // Reset inputs when processedText changes
  }, [processedText]);

  const focusNextInput = (currentIndex) => {
    const nextIndex = words.findIndex((word, index) => 
      index > currentIndex && word.startsWith('[') && word.endsWith(']') && !inputs[index]?.correct
    );
    if (nextIndex !== -1 && inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex].focus();
    }
  };

  const checkWord = (input, index) => {
    const correctWord = words[index].replace(/^\[|\]$/g, '');
    const inputWord = input.value.trim();
    const attempts = inputs[index]?.attempts || 0;

    if (inputWord.toLowerCase() === correctWord.toLowerCase()) {
      setInputs(prev => ({
        ...prev,
        [index]: { ...prev[index], correct: true, value: inputWord, showHint: false },
      }));
      focusNextInput(index);
    } else {
      setInputs(prev => ({
        ...prev,
        [index]: { attempts: attempts + 1, value: '', correct: false, showHint: true },
      }));
    }
  };

  const handleInput = (event, index) => {
    const input = event.target;
    const lastChar = input.value[input.value.length - 1];

    setInputs(prev => ({
      ...prev,
      [index]: { ...prev[index], value: input.value, showHint: false },
    }));

    if (lastChar === ' ' || /[.,!?;:]/.test(lastChar)) {
      checkWord(input, index);
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      checkWord(event.target, index);
    }
  };

  const getHintText = (word, attempts) => {
    if (attempts === 1) {
      const hintLength = Math.ceil(word.length / 3);
      return word.slice(0, hintLength) + '_'.repeat(word.length - hintLength);
    }
    return word;
  };

  const renderWord = (word, index) => {
    if (word.startsWith('[') && word.endsWith(']')) {
      const actualWord = word.replace(/^\[|\]$/g, '');
      const { attempts = 0, value = '', correct = false, showHint = false } = inputs[index] || {};
      return (
        <div className="word-input-container" key={index}>
          <input
            type="text"
            className="word-input"
            value={value}
            onChange={(e) => handleInput(e, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            placeholder={'_'.repeat(actualWord.length)}
            style={{ 
              width: `${actualWord.length * 10}px`,
              backgroundColor: correct ? '#90EE90' : (attempts > 0 ? '#FFB6C1' : ''),
              color: correct || attempts > 0 ? '#000' : ''
            }}
            disabled={correct}
            ref={el => inputRefs.current[index] = el}
          />
          {showHint && (
            <span className="hint-text">{getHintText(actualWord, attempts)}</span>
          )}
        </div>
      );
    }
    return <span className="word-span" key={index}>{word}</span>;
  };

  return <>{words.map(renderWord)}</>;
}

export default ClozeMode;
