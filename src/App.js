import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
// import "./api/axiosDefaults";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import MyComponent from "./components/WebSocket";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <MyComponent/>
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>home</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
