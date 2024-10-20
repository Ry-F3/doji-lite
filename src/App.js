import React from "react";
import styles from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import DashboardLayout from "./components/DashBoardLayout";
import Layout from "./pages/dashboard/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div className={styles.App}>
      <DashboardLayout>
        <Switch>
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <ProtectedRoute exact path="/dashboard" component={Layout} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </DashboardLayout>
    </div>
  );
}

export default App;
