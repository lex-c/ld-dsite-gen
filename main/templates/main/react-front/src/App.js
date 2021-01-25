import { Route, Link, NavLink, Redirect } from 'react-router-dom';
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
      <NavLink className="nav-items" exact to="/main/edit-pics">Edit Pics</NavLink>
      <NavLink className="nav-items" exact to="/main/predictions">Predictions</NavLink>
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
      <Route exact path='/main/edit-pics'
        render={() => 
          <AdminPics />
        } 
      />
      <Route exact path='/main/predictions'
        render={() => 
          <Predictions />
        } 
      />
    </>
  );
}

export default App;
