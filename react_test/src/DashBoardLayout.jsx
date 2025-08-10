import { Outlet } from 'react-router-dom';

function DashboardLayout({ user, logout }) {
  return (
    <div className="App">
      <h2 className="welcome-text">Welcome, {user.email} 👋</h2>

      <div className="dashboard">
        {/* everyone shares the UI */}
        <div className="challenge-area">
          <Outlet /> {/* <-- renders current route's page here */}
        </div>
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default DashboardLayout;
