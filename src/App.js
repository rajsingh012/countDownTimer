import './App.css';
import Timer from './Timer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3 className='countdown-heading'>Count Down Timer</h3>
        <Timer duration={2 * 24 * 60 * 60 * 1000}/>
      </header>
    </div>
  );
}

export default App;
