import { useEffect, useState } from 'react';

function PyPage(){
    const [question, setQuestion] = useState('');
      const [loading, setLoading] = useState(false);
      const [difficulty, setDifficulty] = useState('easy');
      const fetchChallenge = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://code2code.onrender.com/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: 'python', difficulty })
      });

      const data = await res.json();
      setQuestion(data.question);
    } catch (err) {
      setQuestion('❌ Failed to fetch challenge');
      console.error(err);
      setQuestion('❌ Something went wrong!');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchChallenge();
  }, [difficulty]);
      return (
    <div className="challenge-page">
      <h2>Python Challenge</h2>
      <div className="difficulty-controls">
        <label>Select Difficulty:</label>
        <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
        
        >
                <option value="easy">🟢 Easy</option>
                <option value="medium">🟡 Medium</option>
                <option value="hard">🔴 Hard</option>
        </select>
      </div>
      {loading ? (
        <p>Generating your challenge...</p>
      ) : (
        <pre className="question-box">{question}</pre>
      )}
      <button onClick={fetchChallenge}>🔄 New Challenge</button>
    </div>
  );
}

export default PyPage;