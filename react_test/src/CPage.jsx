import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
function CPage(){
     const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [difficulty, setDifficulty] = useState('easy');
    const saveChallenge = async (questionText) => {
      try {
        await addDoc(collection(db, 'challenges'), {
          question: questionText,
          language: 'C/C++',
          difficulty: difficulty,
          createdAt: serverTimestamp()
        });
        console.log(' Challenge saved to Firestore');
      } catch (err) {
        console.error(' Failed to save to Firestore:', err);
      }
    };
    const fetchChallenge = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://code2code.onrender.com/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: 'C', difficulty })
      });
      if(!res.ok){
        throw new Error("Backend broken");
      }
      const data = await res.json();
      
      if(data.question){
        setQuestion(data.question);
        await saveChallenge(data.question);
      }else{
        console.log("Error no question from backend");
      }
    } catch (err) {
      console.error(err);
      setQuestion('❌ Something went wrong...');
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
      fetchChallenge();
    }, [difficulty]);
    return (
    <div className="challenge-page">
      <h2>C/C++ Challenge</h2>
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

export default CPage;