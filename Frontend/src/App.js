import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes/Routes";
import SignUp from "./Components/SignUp";

function App() {
  localStorage.setItem("auth", false);
  return (
    <div className="App">
      <div className="App">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
