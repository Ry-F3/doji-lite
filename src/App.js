import './App.css';
import { Route, Switch } from "react-router-dom";
// import "./api/axiosDefaults";

function App() {
  return (
    <div className="App">
       <Switch>
        <Route exact path ="/home" render={() => <h1>home</h1>}/>
       </Switch>
    </div>
  );
}

export default App;
