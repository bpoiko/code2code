import { useState, useEffect } from 'react';
import { auth } from './firebase';
import Login from './Login';
import Signup from './Signup';
import { Routes, Route, useNavigate } from 'react-router-dom';
import JavaPage from './Javapage';
import CPage from './CPage';
import PyPage from './PyPage';

function App() {
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const logout = () => {
    auth.signOut();
    setUser(null);
  };

  return (
    <>
      {user ? (
        <div className="App">
          <h2 className="welcome-text">Welcome, {user.email} 👋</h2>

          <div className="dashboard">
            <div className="button-container">
              <button onClick={() => navigate('/java')}>Choose Java</button>
              <button onClick={() => navigate('/cpp')}>Choose C/C++</button>
              <button onClick={() => navigate('/python')}>Choose Python</button>
            </div>

            <Routes>
              <Route path="/java" element={<JavaPage />} />
              <Route path="/cpp" element={<CPage />} />
              <Route path="/python" element={<PyPage />} />
            </Routes>
          </div>

          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="auth-wrapper">
          <div className="auth-container">
            {isSignup ? (
              <>
                <Signup onSignup={setUser} />
                <p>
                  Already have an account?{' '}
                  <button onClick={() => setIsSignup(false)}>Login</button>
                </p>
              </>
            ) : (
              <>
                <Login onLogin={setUser} />
                <p>
                  New here?{' '}
                  <button onClick={() => setIsSignup(true)}>Sign Up</button>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
