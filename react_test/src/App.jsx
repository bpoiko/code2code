function App() {
  const confirmChoice = (language) => {
    const confirmed = window.confirm(`Are you sure you want to use ${language}?`);
    if (confirmed) {
      const pages = {
        "Java": "/java.html",
        "C/C++": "/c_cpp.html",
        "Python": "/python.html"
      };
      if (pages[language]) {
        window.location.href = pages[language];
      } else {
        alert("Page not found.");
      }
    }
  };

  return (
    <div className="App">
      <h1>Code2Code</h1>
      <div className="button-container">
        <button onClick={() => confirmChoice('Java')}>Choose Java</button>
        <button onClick={() => confirmChoice('C/C++')}>Choose C/C++</button>
        <button onClick={() => confirmChoice('Python')}>Choose Python</button>
      </div>
    </div>
  );
}


export default App;
