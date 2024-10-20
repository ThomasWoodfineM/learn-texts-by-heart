import React, { useState, useEffect } from 'react';
import './RandomPoem.css';

function RandomPoem({ onPoemSelect }) {
  const [isLoading, setIsLoading] = useState(true);
  const [poemInfo, setPoemInfo] = useState(null);

  const fetchRandomPoem = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://poetrydb.org/random');
      const data = await response.json();
      if (data && data.length > 0) {
        const poem = data[0];
        const poemText = poem.lines.join('\n');
        const newPoemInfo = { title: poem.title, author: poem.author, text: poemText };
        setPoemInfo(newPoemInfo);
        onPoemSelect(poemText, poem.title, poem.author);
        // Save to localStorage
        localStorage.setItem('currentPoem', JSON.stringify(newPoemInfo));
      }
    } catch (error) {
      console.error('Error fetching poem:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedPoem = localStorage.getItem('currentPoem');
    if (savedPoem) {
      const parsedPoem = JSON.parse(savedPoem);
      setPoemInfo(parsedPoem);
      onPoemSelect(parsedPoem.text, parsedPoem.title, parsedPoem.author);
      setIsLoading(false);
    } else {
      fetchRandomPoem();
    }
  }, []); // Empty dependency array means this effect runs once on mount

  const handleGetAnotherPoem = () => {
    fetchRandomPoem();
  };

  return (
    <div className="random-poem">
      <div className="random-poem-content">
        <button onClick={handleGetAnotherPoem} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Get Another Poem'}
        </button>
        <div className="poem-info">
          {isLoading ? (
            <p className="poem-placeholder">Loading poem...</p>
          ) : (
            <>
              <p className="poem-title">{poemInfo.title}</p>
              <p className="poem-author">by {poemInfo.author}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RandomPoem;
