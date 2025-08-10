import { useState, useEffect } from 'react';
import { auth } from './firebase';
import Login from './Login';
import Signup from './Signup';
import { Routes, Route, useNavigate } from 'react-router-dom';
import JavaPage from './JavaPage';
import CPage from './CPage';
import PyPage from './PyPage';
import History from './history'; //needs to be History before prod
import GettingStarted from './GettingStarted';
import ProtectedRoute from './ProtectedRoutes';
import LoadingScreen from './LoadingScreen';
function App() {
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
   const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((u) => {
    setUser(u);
    setLoading(false); // we great
  });

  return () => unsubscribe();
}, []);

  const logout = () => {
    auth.signOut();
    setUser(null);
  };

  return (
    <>
      {user ? (
        <div className="dashboard-wrapper">
          {/* Sidebar */}
          <aside className="sidebar">
            <h2>Code2Code</h2>
            <button onClick={() => navigate('/java')}>Java</button>
            <button onClick={() => navigate('/cpp')}>C/C++</button>
            <button onClick={() => navigate('/python')}>Python</button>
            <button onClick={() => navigate('/history')}>History</button>
            <button onClick={() => navigate('/getting-started')}>📘 Getting Started</button>
            <button onClick={logout} className="logout-btn">Logout</button>
          </aside>

          {/* main content */}
          <main className="main-content">
            <header className="dashboard-header">
              <span className="welcome-text">Welcome, {user.email} 👋</span>
            </header>

            <div className="challenge-section">
              <Routes>
                <Route 
                path="/java" 
                element={
                <ProtectedRoute>
                <JavaPage />
                </ProtectedRoute>

                }
                />
                <Route 
                path="/cpp" 
                element={
                  <ProtectedRoute>
                  <CPage />
                  </ProtectedRoute>
                }
                />
                <Route 
                path="/python" 
                element={
                  <ProtectedRoute>
                  <PyPage /> 
                  </ProtectedRoute>
                }
                />
                <Route 
                path="/history" 
                  element={
                  <ProtectedRoute>
                  <History />
                  </ProtectedRoute>
                  }
                  />
                <Route path="/getting-started" element={<GettingStarted />} />
              </Routes>
            </div>
          </main>
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
