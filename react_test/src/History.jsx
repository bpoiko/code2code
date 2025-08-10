import { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

function History() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(
          collection(db, 'challenges'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setChallenges(data);
      } catch (err) {
        console.error('❌ Failed to load history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-page">
      <h2>Your Saved Challenges</h2>
      {loading ? (
        <p>Loading...</p>
      ) : challenges.length === 0 ? (
        <p>No challenges saved yet.</p>
      ) : (
        <ul className="challenge-list">
          {challenges.map((challenge) => (
            <li key={challenge.id} className="challenge-card">
              <div className="challenge-meta">
                <strong>{challenge.language}</strong> · {challenge.difficulty}
              </div>
              <pre>{challenge.question}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
