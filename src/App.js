import React from "react";
import styles from "./App.module.css";
// import NavBar from "./components/NavBar";
// import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
// import Home from "./pages/dashboard/Home";
// import TradeForm from "./pages/dashboard/TradeForm";
import DashboardLayout from "./components/DashBoardLayout";
import Layout from "./pages/dashboard/Layout";

function App() {
  return (
    <div className={styles.App}>
      {/* <NavBar /> */}
      <DashboardLayout>
        <Switch>
          <Route exact path="/" render={() => <Layout />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </DashboardLayout>
    </div>
  );
}

export default App;
