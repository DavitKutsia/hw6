import React, { useState } from 'react';
import './App.css';

function App() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  // The core component of the code
  // Ask the API for advices
  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      setAdvice(data.slip.advice);// Updates the "advice" state with the new advice text from the API(chatgpt დამჭირდა ამისთვის, თორემ სხვანაირად არ გამომდიოდა)
    } catch (error) {
      console.error("Error fetching advice:", error);
      setAdvice("Failed to fetch advice. Please try again.");
    }

    // Add a delay for longer loading time
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Advice Generator</h1>
        <p className="advice-text">{loading ? <img src="/assets/loading.png" alt="Loading Icon" /> : advice}</p>
        <button onClick={fetchAdvice} disabled={loading}>
          {loading ? 'Fetching...' : <img src="/assets/application.png" alt="Advice Icon" />}
        </button>
      </div>
    </div>
  );
}

export default App;
