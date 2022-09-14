import "./App.css";
import inputEvents from "./input.json";
import TimeSchedule from "./Components/TimeSchedule";

function App() {
  return (
    <div className="App">
      <TimeSchedule inputEvents={inputEvents} />
    </div>
  );
}

export default App;
