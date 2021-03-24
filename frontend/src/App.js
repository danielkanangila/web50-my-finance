import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SecureRoute from "./components/common/SecureRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import { default as DashboardHome } from "./pages/Dashboard/Home";
import MainHeader from "./components/MainHeader";
import ApplicationContextProvider from "./context/ApplicationContext";
import Footer from "./components/Footer";
import Account from "./pages/Account";
import MyAccount from "./pages/MyAccount";

function App() {
  return (
    <Router>
      <ApplicationContextProvider>
        <div className="App">
          <MainHeader />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <SecureRoute path="/:userId">
              <Dashboard>
                <Route exact path="/users/:userId/" component={DashboardHome} />
                <Route
                  path="/users/:userId/accounts/:accountId"
                  component={Account}
                />
                <Route
                  path="/users/:userId/my-account"
                  component={MyAccount}
                />
              </Dashboard>
            </SecureRoute>
          </Switch>
          <Footer />
        </div>
      </ApplicationContextProvider>
    </Router>
  );
}

export default App;
