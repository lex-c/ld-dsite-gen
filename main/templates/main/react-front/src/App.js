import { Route, Link, NavLink } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Pics from './components/pics/pics';
import Socials from './components/socials/socials'
import Intro from './components/intro/intro';
import About from './components/about/about';
import AdminPics from './pages/AdminPics/AdminPics';
import Predictions from './pages/Predictions/Predictions';



function App() {
  return (
    <>
      <NavLink className="nav-items" exact to="/main">Home</NavLink>
      <NavLink className="nav-items" exact to="/editpics">Edit Pics</NavLink>
      <NavLink className="nav-items" exact to="/predictions">Predictions</NavLink>
      <a class="nav-items" href="http://localhost:8000/main/admin-add-pics">Admin Add Pics</a>
      <Route exact path='/main'
        render={() =>
          <div id="appDiv">
            <h3>Hi</h3>
            <Intro />
            <Pics />
            <Socials />
            <About />
          </div>
         } />
      <Route exact path='/editpics'
        render={() => 
          <AdminPics />
        } 
      />
      <Route exact path='/predictions'
        render={() => 
          <Predictions />
        } 
      />
    </>
  );
}

export default App;
