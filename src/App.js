import React, { useState } from 'react';
import InputContainer from './components/InputContainer';
import OutputContainer from './components/OutputContainer';
import RandomPoem from './components/RandomPoem';
import { processText } from './utils/textProcessor';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [processedText, setProcessedText] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [mode, setMode] = useState('');
  const [poemInfo, setPoemInfo] = useState(null);
  const [frequency, setFrequency] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleProcess = (text, freq) => {
    const processed = processText(text, freq);
    setProcessedText(processed);
    setShowOutput(true);
    setMode('cloze');
  };

  const handleFlow = (text) => {
    setInputText(text);
    setShowOutput(true);
    setMode('flow');
  };

  const handleFlash = (text) => {
    setInputText(text);
    setShowOutput(true);
    setMode('flash');
  };

  const handleReset = () => {
    setInputText('');
    setProcessedText('');
    setShowOutput(false);
    setMode('');
    setPoemInfo(null);
  };

  const handlePoemSelect = (poemText, title, author) => {
    setInputText(poemText);
    setPoemInfo({ title, author });
  };

  const handleFrequencyChange = (newFrequency) => {
    setFrequency(newFrequency);
    if (mode === 'cloze') {
      handleProcess(inputText, newFrequency);
    }
  };

  return (
    <div className="container">
      <h1>Learn Passages</h1>
      {!showOutput ? (
        <>
          <RandomPoem onPoemSelect={handlePoemSelect} />
          <InputContainer 
            onProcess={handleProcess} 
            onFlow={handleFlow}
            onFlash={handleFlash}
            inputText={inputText}
            setInputText={setInputText}
            poemInfo={poemInfo}
            frequency={frequency}
            setFrequency={setFrequency}
          />
        </>
      ) : (
        <OutputContainer
          processedText={processedText}
          originalText={inputText}
          mode={mode}
          onReset={handleReset}
          frequency={frequency}
          onFrequencyChange={handleFrequencyChange}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
