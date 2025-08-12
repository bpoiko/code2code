import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
function JavaPage() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState('easy'); // super cool stuff here
const saveChallenge = async (questionText) => {
  try {
    await addDoc(collection(db, 'challenges'), {
      question: questionText,
      language: 'Java',
      difficulty: difficulty,
      createdAt: serverTimestamp()
    });
    console.log('🔥 Challenge saved to Firestore');
  } catch (err) {
    console.error('❌ Failed to save to Firestore:', err);
  }
};

  const fetchChallenge = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://code2code.onrender.com/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: 'Java', difficulty })
      });

      const data = await res.json();
      if(data.question){
        setQuestion(data.question);
        await saveChallenge(data.question);
      }else{
        console.log("Error no question from backend");
      }
    } catch (err) {
      console.error('❌ Fetch failed:', err);
      setQuestion('Something went wrong...');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenge();
  }, [difficulty]); //  get new question if difficulty changes

  return (
    <div className="challenge-page">
      <h2>Java Challenge</h2>

      <div className="difficulty-controls">
        <label>Select Difficulty:</label>
          <p>Small Disclaimer, these will not work until OpenAI frees up my keys</p>
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
      <br></br>
      <div className="JBasics">
        <h2>Java Basics</h2>
        <button>Primatives, Loops, Light OOP</button>
      </div>
    </div>
  );
}

export default JavaPage;
