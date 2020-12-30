import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SecureRoute from "./components/common/SecureRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <SecureRoute exact path="/:username" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
