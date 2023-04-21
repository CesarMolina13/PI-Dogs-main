import './App.css';
import {Detail, Form, Home, Landing}  from "./views/index";
import {Route,useLocation} from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}

      <Route exact path="/" render={()=><Landing/>}/>
      <Route exact path="/home" render={()=><Home/>}/>
      <Route exact path="/dogs/:id" render={()=><Detail/>}/>
      <Route exact path="/create" render={()=><Form/>}/>

    
    </div>
  );
}

export default App;
