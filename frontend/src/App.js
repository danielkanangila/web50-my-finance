import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SecureRoute from "./components/common/SecureRoute";
import Dashboard from "./pages/Dashboard";
import Statics from "./pages/Dashboard/Statics";
import Transactions from "./pages/Dashboard/Transactions";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import { default as DashboardHome } from "./pages/Dashboard/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <SecureRoute path="/:userId">
            <Dashboard>
              <Route exact path="/:userId/" component={DashboardHome} />
              <Route path="/:userId/transactions" component={Transactions} />
              <Route path="/:userId/statics" component={Statics} />
            </Dashboard>
          </SecureRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
